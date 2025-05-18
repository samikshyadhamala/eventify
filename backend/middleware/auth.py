from functools import wraps
from flask import request, jsonify
from firebase_admin import auth
from api.models.user import User
from api.utils.logger import Logger

def verify_firebase_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
            return f(*args, **kwargs)
        except Exception as err:
            Logger.error(f"Token verification failed: {str(err)}")
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
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user or auth_user.role != 'admin':
                return jsonify({'error': 'Access denied. Admin only.'}), 403
                
            return f(*args, **kwargs)
        except Exception as err:
            Logger.error(f"Token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
            return jsonify({'error': error_message}), 403

    return decorated_function

def verify_club_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user or auth_user.role != 'club':
                return jsonify({'error': 'Access denied. Club only.'}), 403
                
            return f(*args, **kwargs)
        except Exception as err:
            Logger.error(f"Token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
            return jsonify({'error': error_message}), 403

    return decorated_function

def verify_club_admin_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user or (auth_user.role != 'club' and auth_user.role != 'admin'):
                return jsonify({'error': 'Access denied. Club admin only.'}), 403
                
            return f(*args, **kwargs)
        except Exception as err:
            Logger.error(f"Token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
            return jsonify({'error': error_message}), 403

    return decorated_function
