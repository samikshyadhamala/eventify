from api.models.branch_admin import BranchAdmin
from api.models.user import User
from api.models.branch import Branch
from firebase_admin import auth
from api import db

def GetBranchAdmin():
    # Query branch admins with joined data
    all_branch_admins = db.session.query(BranchAdmin, User, Branch).join(
        User, User.fid == BranchAdmin.user_id
    ).join(
        Branch, Branch.branch_id == BranchAdmin.branch_id
    ).all()
    
    formated_data = []
    for admin_record in all_branch_admins:
        # Get Firebase user email
        try:
            firebase_user = auth.get_user(admin_record.User.fid)
            email = firebase_user.email
        except:
            email = None
            
        formated_data.append({
            "email": email,
            "branch_name": admin_record.Branch.branch_name,
            "location": admin_record.Branch.location,
            "user_id": admin_record.User.fid,
            "branch_id": admin_record.Branch.branch_id,
            "imageUrl": firebase_user.photo_url
        })
    
    return formated_data