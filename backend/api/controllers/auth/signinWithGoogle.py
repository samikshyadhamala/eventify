import os
from flask import jsonify, make_response
from firebase_admin import auth
from api.models.user import User
from api import db
from api.utils.logger import Logger

def SigninWithGoogleController(request):
    try:
        data = request.get_json()
        auth_token = data.get('authToken')
        refresh_token = data.get('refreshToken')

        if not auth_token:
            return jsonify({'error': 'Authentication token is required'}), 401

        # Verify token and get user
        try:
            decoded_token = auth.verify_id_token(auth_token)
        except Exception as error:
            Logger.error(f"Token verification error: {str(error)}")
            return jsonify({'error': 'Invalid authentication token'}), 401

        try:
            user = User.query.filter_by(fid=decoded_token['uid']).first()
        except Exception as error:
            Logger.error(f"Error finding user: {str(error)}")
            user = None

        # Create new user if doesn't exist
        if not user:
            try:
                user = User(
                    fid=decoded_token['uid'],
                    imageUrl=decoded_token['picture']
                )
                db.session.add(user)
                db.session.commit()
            except Exception as error:
                Logger.error(f"Error creating user: {str(error)}")
                return jsonify({'error': 'Failed to create user'}), 500

        resp = make_response(
            jsonify({
                'authenticated': True,
                'user': {**user.to_dict(), 'fid': decoded_token['uid']} if hasattr(user, 'to_dict') else str(user)
            })
        )

        is_production = os.getenv('FLASK_ENV') == 'production'

        # Set login token cookie
        resp.set_cookie(
            'loginToken',
            auth_token,
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

    except Exception as error:
        Logger.error(f"Google login error: {str(error)}")
        return jsonify({
            'authenticated': False,
            'error': 'Authentication failed'
        }), 401
