from functools import wraps
from flask import request, jsonify
from firebase.firebaseAdmin import admin
from api.models.user import User

def verify_firebase_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')

        try:
            decoded_token = admin.auth().verify_id_token(id_token)
            request.user = decoded_token
            return f(*args, **kwargs)
        except Exception as err:
            print("Token verification failed:", str(err))
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
            return jsonify({'error': error_message}), 403

    return decorated_function

def verify_admin_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')

        try:
            decoded_token = admin.auth().verify_id_token(id_token)
            request.user = decoded_token
            auth_user = User.query.filter_by(firebase_uid=request.user['uid']).first()
            
            if not auth_user or auth_user.role != 'admin':
                return jsonify({'error': 'Access denied. Admin only.'}), 403
                
            return f(*args, **kwargs)
        except Exception as err:
            print("Token verification failed:", str(err))
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
            return jsonify({'error': error_message}), 403

    return decorated_function
