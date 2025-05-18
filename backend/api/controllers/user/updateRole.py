from api.models.user import User
from api import db
from api.models.branch_admin import BranchAdmin
from flask import jsonify

def UpdateRole(fid, role, branch_id = None):
    try:
        selected_user = User.query.filter_by(fid=fid).first()
        
        # validating request
        if not selected_user:
            return jsonify({"error": "User not found"}), 404
            
        if role not in ['normal', 'club', 'admin']:
            return jsonify({"error": "Invalid role"}), 400
            
        if role == 'club': 
            if not branch_id: 
                return jsonify({"error": "Must provide branch id for club update"}), 400
                
            # Check if branch admin entry already exists
            existing_admin = BranchAdmin.query.filter_by(
                user_id=selected_user.fid, 
                branch_id=branch_id
            ).first()
            
            if not existing_admin:
                new_branch_admin = BranchAdmin(branch_id=branch_id, user_id=selected_user.fid)
                db.session.add(new_branch_admin)
        
        else: 
            selected_branch_admin = BranchAdmin.query.filter_by(user_id=selected_user.fid).first()
            
            if selected_branch_admin:
                db.session.delete(selected_branch_admin)
                
        selected_user.role = role
        db.session.commit()
        return jsonify(selected_user.to_dict()), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
