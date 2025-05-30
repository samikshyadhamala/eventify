from firebase_admin import auth
from api.utils.logger import Logger
from api.models.user import User

def GetUserInfo(fid):
    try:
        # Verify the token using Firebase Admin
        decoded_token = auth.get_user(fid)

    except Exception as error:
        Logger.error(f"Error verifying token: {str(error)}")
        return 
        
    try:
        user = User.query.filter_by(fid=fid).first()
    except Exception as error:
        Logger.error(f"Error finding user: {str(error)}")
        user = None
        # Create new user if doesn't exist
        if not user:
            Logger.error("No user found in database")
            return 
    
    # formating data
    return {
        "fid": decoded_token.uid,
        "email": decoded_token.email,
        "imageUrl": user.imageUrl, 
        "role": user.role,
        "name": decoded_token.display_name
    }
