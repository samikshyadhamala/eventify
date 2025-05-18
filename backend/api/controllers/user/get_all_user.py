from flask import jsonify
from api.models.user import User
from api.utils.logger import Logger
from firebase_admin import auth

def get_all_user_controller():
    try:
        users = User.query.order_by(User.role.desc()).all()
        
        # Format user data
        user_list = []
        for user in users:
            # Get Firebase user info
            try:
                firebase_user = auth.get_user(user.fid)
                user_data = {
                    "fid": user.fid, 
                    "email": firebase_user.email,
                    "imageUrl": firebase_user.photo_url,
                    "createdAt": firebase_user.user_metadata.creation_timestamp,
                    "role": user.role
                }
                user_list.append(user_data)
            except Exception as firebase_error:
                Logger.error(f"Error getting Firebase user info: {str(firebase_error)}")
                continue
            
        return jsonify(user_list)

    except Exception as error:
        Logger.error(f"Error getting all users: {str(error)}")
        return jsonify({
            "error": "Error retrieving users"
        }), 500
