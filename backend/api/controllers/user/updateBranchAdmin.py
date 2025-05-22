from api.models.branch_admin import BranchAdmin
from api.models.branch import Branch
from api.models.user import User
from api.utils.logger import Logger
from api import db

def UpdateBranchAdmin(branch_id, user_id):
    # Validate branch_id and user_id
    if not branch_id or not user_id:
        return {'message': 'Branch ID and User ID are required'}, 400

    # Check if branch exists
    branch = Branch.query.get(branch_id)
    if not branch:
        return {'message': 'Branch not found'}, 404

    # Check if user exists
    selectd_user = User.query.filter_by(fid=user_id).first()
    if not selectd_user:
        return {'message': 'User not found'}, 404

    # Check if branch admin already exists
    existing_admin = BranchAdmin.query.filter_by(
        user_id=user_id
    ).first()
    
    try:
        existing_admin.branch_id = branch_id
        db.session.commit()
    except Exception as e:
        Logger.error(e)
        db.session.rollback()
        return {'message': 'Error updating branch id'}, 500

    return {'message': 'Branch id updated successfully'}, 201