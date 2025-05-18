from api.models.user import User
from api import db
from api.models.branch_admin import BranchAdmin

def UpdateRole(fid, role, branch_id = None):
    selected_user = User.query.filter_by(fid=fid).first()
    
    # validating request
    if not selected_user:
        raise ValueError("User not found")
    if role not in ['normal', 'club', 'admin']:
        raise ValueError("Invalid role")
    if role == 'club': 
        if not branch_id: 
            return {"message": "must provide branch id for club update"}, 400
        new_branch_admin = BranchAdmin(branch_id=branch_id, user_id=selected_user.fid)
        db.session.add(new_branch_admin)
    selected_user.role = role
    db.session.commit()
    return selected_user.to_dict()
