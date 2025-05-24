from flask import jsonify
from api.models.user import User
from api.utils.logger import Logger
from firebase_admin import auth

def get_all_user_controller():
    try:
        users = User.query.all()
        users_lookup = {user.fid: user for user in users}
        
        # Format user data
        user_list = []
        page = auth.list_users()
        while page: 
            for firebase_user in page.users: 
                try:
                    # retriving index of user in users list
                    user = users_lookup.get(firebase_user.uid, None)
                    if user is None: 
                         continue
                    
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
            page = page.get_next_page()
            
        return jsonify(user_list)

    except Exception as error:
        Logger.error(f"Error getting all users: {str(error)}")
        return jsonify({
            "error": "Error retrieving users"
        }), 500
