import os
import requests
from flask import jsonify, make_response
from firebase.firebaseAdmin import admin
from api.models.user import User
from api import db
from api.utils.logger import Logger
from firebase_admin import auth

def register_controller(request):
    try:
        # Check if Firebase Admin SDK is properly initialized
        if not admin:
            Logger.error(f"Firebase Admin SDK initialization error")
            return _error_response('Server configuration error', 'Firebase Admin SDK not properly initialized', 500)

        # Validate request data
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not all([email, password]):
            return _error_response('All fields are required', status=400)

        # Create Firebase user
        firebase_user = _create_firebase_user(email, password)
        if isinstance(firebase_user, tuple):  # Error response
            return firebase_user

        try:
            # Create database user
            db_user = _create_database_user(firebase_user.uid)
            if isinstance(db_user, tuple):  # Error response
                _cleanup_firebase_user(firebase_user.uid)
                return db_user

            # Perform automatic login
            login_response = _perform_login(email, password)
            if isinstance(login_response, tuple):  # Error response
                _cleanup_firebase_user(firebase_user.uid)
                return login_response

            return login_response

        except Exception as error:
            _cleanup_firebase_user(firebase_user.uid)
            Logger.error(f"Error during database operations: {str(error)}")
            return _error_response('Error in registration', str(error), 500)

    except Exception as error:
        Logger.error(f"Unexpected error in registration: {str(error)}")
        return _error_response('Error in registration', str(error), 500)

def _error_response(message, details=None, status=400):
    response = {'error': message}
    if details:
        response['details'] = details
    return jsonify(response), status

def _create_firebase_user(email, password):
    try:
        return auth.create_user(
            email=email,
            password=password
        )
    except Exception as error:
        Logger.error(f"Firebase registration error: {{'email': {email}, 'error': {str(error)}}}")
        return _error_response(str(error), status=400)

def _create_database_user(firebase_uid):
    try:
        new_user = User(
            fid=firebase_uid,  # Changed from firebase_uid to id to match model
            role="normal"   
        )
        db.session.add(new_user)
        db.session.commit()
        return new_user
    except Exception as error:
        Logger.error(f"Database save error: {str(error)}")
        return _error_response('Error saving into database', str(error), 500)

def _cleanup_firebase_user(uid):
    try:
        admin.auth().delete_user(uid)
        Logger.error(f"Deleted Firebase user due to database error: {uid}")
    except Exception as delete_error:
        Logger.error(f"Failed to delete Firebase user: {str(delete_error)}")

def _perform_login(email, password):
    firebase_api_key = os.getenv('FIREBASE_API_KEY')
    if not firebase_api_key:
        return _error_response('No API key found', status=500)

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

        _set_auth_cookies(resp, id_token, refresh_token)
        return resp

    except Exception as error:
        Logger.error(f'Error signing in: {str(error)}')
        return _error_response('Authentication failed', str(error), 400)

def _set_auth_cookies(response, id_token, refresh_token):
    is_production = os.getenv('FLASK_ENV') == 'production'
    
    # Set login token cookie
    response.set_cookie(
        'loginToken',
        id_token,
        httponly=True,
        secure=is_production,
        samesite='None' if is_production else 'Lax',
        path='/',
        max_age=7 * 24 * 60 * 60  # 1 week in seconds
    )

    # Set refresh token cookie
    response.set_cookie(
        'refreshToken',
        refresh_token,
        httponly=True,
        secure=is_production,
        samesite='None' if is_production else 'Lax',
        path='/',
        max_age=7 * 24 * 60 * 60  # 1 week in seconds
    )