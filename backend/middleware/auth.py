from functools import wraps
from flask import request, jsonify
from firebase_admin import auth
from firebase_admin.exceptions import FirebaseError
from api.models.user import User
from api.utils.logger import Logger

def verify_firebase_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')
        
        if not id_token:
            Logger.warning("No login token provided in cookies")
            return jsonify({'error': 'Authentication required'}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except FirebaseError as err:
            Logger.error(f"Firebase token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
                elif err.code == 'auth/argument-error':
                    error_message = 'Invalid token format'
            return jsonify({'error': error_message}), 401
        except Exception as err:
            Logger.error(f"Unexpected error during token verification: {str(err)}")
            return jsonify({'error': 'Authentication failed'}), 500
        
        # Token verification successful, proceed to route
        return f(*args, **kwargs)

    return decorated_function

def verify_admin_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')
        
        if not id_token:
            Logger.warning("No login token provided in cookies")
            return jsonify({'error': 'Authentication required'}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except FirebaseError as err:
            Logger.error(f"Firebase token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
                elif err.code == 'auth/argument-error':
                    error_message = 'Invalid token format'
            return jsonify({'error': error_message}), 401
        except Exception as err:
            Logger.error(f"Unexpected error during token verification: {str(err)}")
            return jsonify({'error': 'Authentication failed'}), 500
            
        # Check user role
        try:
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user:
                Logger.warning(f"User not found in database: {request.user['uid']}")
                return jsonify({'error': 'User not found'}), 404
                
            if auth_user.role != 'admin':
                Logger.warning(f"Access denied for non-admin user: {request.user['uid']}")
                return jsonify({'error': 'Access denied. Admin only.'}), 403
        except Exception as err:
            Logger.error(f"Database error during role verification: {str(err)}")
            return jsonify({'error': 'Authorization check failed'}), 500
                
        # Authorization successful, proceed to route
        return f(*args, **kwargs)

    return decorated_function

def verify_club_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')
        
        if not id_token:
            Logger.warning("No login token provided in cookies")
            return jsonify({'error': 'Authentication required'}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except FirebaseError as err:
            Logger.error(f"Firebase token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
                elif err.code == 'auth/argument-error':
                    error_message = 'Invalid token format'
            return jsonify({'error': error_message}), 401
        except Exception as err:
            Logger.error(f"Unexpected error during token verification: {str(err)}")
            return jsonify({'error': 'Authentication failed'}), 500
            
        # Check user role
        try:
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user:
                Logger.warning(f"User not found in database: {request.user['uid']}")
                return jsonify({'error': 'User not found'}), 404
                
            if auth_user.role != 'club':
                Logger.warning(f"Access denied for non-club user: {request.user['uid']}")
                return jsonify({'error': 'Access denied. Club only.'}), 403
        except Exception as err:
            Logger.error(f"Database error during role verification: {str(err)}")
            return jsonify({'error': 'Authorization check failed'}), 500
                
        # Authorization successful, proceed to route
        return f(*args, **kwargs)

    return decorated_function

def verify_club_admin_token(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        id_token = request.cookies.get('loginToken')
        
        if not id_token:
            Logger.warning("No login token provided in cookies")
            return jsonify({'error': 'Authentication required'}), 401

        try:
            decoded_token = auth.verify_id_token(id_token)
            request.user = decoded_token
        except FirebaseError as err:
            Logger.error(f"Firebase token verification failed: {str(err)}")
            error_message = 'Unauthorized'
            if hasattr(err, 'code'):
                if err.code == 'auth/id-token-expired':
                    error_message = 'Token expired'
                elif err.code == 'auth/invalid-id-token':
                    error_message = 'Invalid token'
                elif err.code == 'auth/argument-error':
                    error_message = 'Invalid token format'
            return jsonify({'error': error_message}), 401
        except Exception as err:
            Logger.error(f"Unexpected error during token verification: {str(err)}")
            return jsonify({'error': 'Authentication failed'}), 500
            
        # Check user role
        try:
            auth_user = User.query.filter_by(fid=request.user['uid']).first()
            
            if not auth_user:
                Logger.warning(f"User not found in database: {request.user['uid']}")
                return jsonify({'error': 'User not found'}), 404
                
            if auth_user.role not in ['club', 'admin']:
                Logger.warning(f"Access denied for user with role {auth_user.role}: {request.user['uid']}")
                return jsonify({'error': 'Access denied. Club or admin access required.'}), 403
        except Exception as err:
            Logger.error(f"Database error during role verification: {str(err)}")
            return jsonify({'error': 'Authorization check failed'}), 500
                
        # Authorization successful, proceed to route
        return f(*args, **kwargs)

    return decorated_function