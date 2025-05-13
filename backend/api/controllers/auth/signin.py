from flask import request, jsonify, make_response
import os
import requests
from dotenv import load_dotenv

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

        # Set secure cookie for login token
        resp.set_cookie(
            'loginToken',
            id_token,
            httponly=True,
            secure=os.getenv('FLASK_ENV') == 'production',
            samesite='Strict',
            max_age=24 * 60 * 60  # 24 hours
        )

        # Set secure cookie for refresh token 
        resp.set_cookie(
            'refreshToken',
            refresh_token,
            httponly=True, 
            secure=os.getenv('FLASK_ENV') == 'production',
            samesite='Strict',
            max_age=30 * 24 * 60 * 60  # 30 days
        )

        return resp

    except Exception as e:
        print('Error signing in:', str(e))
        return jsonify({
            'message': 'Incorrect email or password'
        }), 400
