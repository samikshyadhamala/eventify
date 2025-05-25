from flask import request, jsonify, make_response
import os
import requests
from dotenv import load_dotenv
from firebase.firebaseAdmin import admin
from api.models.user import User
from api import db
from api.utils.logger import Logger
from firebase_admin import auth

load_dotenv()

def signin_controller():
    # Get request data
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Get Firebase API key from environment
    FIREBASE_API_KEY = os.getenv('FIREBASE_API_KEY')

    # Check API key exists
    if not FIREBASE_API_KEY:
        return jsonify({'error': 'No api key found'}), 500

    # Validate required fields
    if not email or not password:
        return jsonify({'error': 'email and password is required'}), 400

    try:
        # Make request to Firebase Auth API
        response = requests.post(
            f'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={FIREBASE_API_KEY}',
            json={
                'email': email,
                'password': password,
                'returnSecureToken': True
            }
        )
        
        response_data = response.json()
        
        # Check if user exists
        if 'error' in response_data and response_data['error']['message'] == 'EMAIL_NOT_FOUND':
            # User doesn't exist, try to register
            if not admin:
                Logger.error("Firebase Admin SDK initialization error")
                return jsonify({'error': 'Server configuration error'}), 500
                
            # Create Firebase user
            try:
                firebase_user = auth.create_user(
                    email=email,
                    password=password
                )
                
                # Create database user
                new_user = User(
                    fid=firebase_user.uid,
                    role="normal"
                )
                db.session.add(new_user)
                db.session.commit()
                
                # Try login again after registration
                return _perform_login(email, password)
                
            except Exception as reg_error:
                Logger.error(f"Registration error: {str(reg_error)}")
                return jsonify({'error': str(reg_error)}), 400
        
        # Extract tokens and data
        id_token = response_data['idToken']
        refresh_token = response_data['refreshToken'] 
        expires_in = response_data['expiresIn']
        local_id = response_data['localId']

        # Create response
        resp = make_response(
            jsonify({
                'message': 'User signed in successfully!',
                'idToken': id_token,
                'refreshToken': refresh_token,
                'expiresIn': expires_in,
                'uid': local_id
            })
        )

        # Set auth cookies
        is_production = os.getenv('FLASK_ENV') == 'production'
        
        # Set login token cookie
        resp.set_cookie(
            'loginToken',
            id_token,
            httponly=True,
            secure=is_production,
            samesite='None' if is_production else 'Lax',
            path='/',
            max_age=7 * 24 * 60 * 60  # 1 week in seconds
        )

        # Set refresh token cookie
        resp.set_cookie(
            'refreshToken',
            refresh_token,
            httponly=True,
            secure=is_production,
            samesite='None' if is_production else 'Lax',
            path='/',
            max_age=7 * 24 * 60 * 60  # 1 week in seconds
        )

        return resp

    except Exception as e:
        Logger.error(f'Error signing in: {str(e)}')
        return jsonify({
            'error': 'Authentication failed',
            'message': 'Incorrect email or password'
        }), 400

def _perform_login(email, password):
    firebase_api_key = os.getenv('FIREBASE_API_KEY')
    if not firebase_api_key:
        return jsonify({'error': 'No API key found'}), 500

    try:
        response = requests.post(
            f'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={firebase_api_key}',
            json={
                'email': email,
                'password': password,
                'returnSecureToken': True
            }
        )
        
        response_data = response.json()
        
        id_token = response_data['idToken']
        refresh_token = response_data['refreshToken']
        expires_in = response_data['expiresIn']
        local_id = response_data['localId']

        resp = make_response(
            jsonify({
                'message': 'User signed in successfully!',
                'idToken': id_token,
                'refreshToken': refresh_token,
                'expiresIn': expires_in,
                'uid': local_id
            })
        )

        is_production = os.getenv('FLASK_ENV') == 'production'
        
        # Set login token cookie
        resp.set_cookie(
            'loginToken',
            id_token,
            httponly=True,
            secure=is_production,
            samesite='Strict',
            max_age=24 * 60 * 60  # 24 hours
        )

        # Set refresh token cookie
        resp.set_cookie(
            'refreshToken',
            refresh_token,
            httponly=True,
            secure=is_production,
            samesite='Strict',
            max_age=30 * 24 * 60 * 60  # 30 days
        )
        
        return resp

    except Exception as error:
        Logger.error(f'Error signing in: {str(error)}')
        return jsonify({'error': 'Authentication failed'}), 400
