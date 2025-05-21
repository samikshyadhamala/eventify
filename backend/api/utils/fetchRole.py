from firebase_admin import auth
from api.models.user import User

def FetchRole(user_id):
    selected_user = User.query.filter_by(fid=user_id).first()
    if not selected_user: 
        raise Exception("An error occurred")
    return selected_user.role
    
  