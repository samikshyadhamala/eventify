from api.models.user import User
from api.models.branch_admin import BranchAdmin
from api import db
from flask import jsonify
from api.utils.logger import Logger

def DeleteBranchAdmin(user_id):
    try:
        # Check if user exists
        selected_user = User.query.filter_by(fid=user_id).first()
        if not selected_user:
            return jsonify({"error": "User not found"}), 404
            
        # Check if branch admin exists
        selected_branch_admin = BranchAdmin.query.filter_by(user_id=user_id).first()
        if not selected_branch_admin:
            return jsonify({"error": "Branch admin not found"}), 404
            
        # Delete branch admin entry and update user role
        db.session.delete(selected_branch_admin)
        selected_user.role = 'normal'
        db.session.commit()
        
        return jsonify({"message": "Branch admin deleted successfully"}), 200
        
    except Exception as e:
        Logger.error(f"Error deleting branch admin: {str(e)}")
        db.session.rollback()
        return jsonify({"error": str(e)}), 500