from api.models.branch import Branch
from flask import jsonify
from api.utils.fetchRole import FetchRole
from api.utils.logger import Logger
from api.models.branch_admin import BranchAdmin

def GetUniqueBranches(user):
    user_id = user.get("user_id") 
    all_banches = Branch.query.all()
    
    # retriving user role
    try: 
        role = FetchRole(user_id)
    except Exception: 
        Logger.error('Error fetch user role')
        return jsonify({"error": "Error fetching user role"}), 500
    
    # return all branches if admin
    if role == 'admin': 
        return jsonify({
            'branches': [
                {'branch_id': branch.branch_id, 'branch_name': branch.branch_name} for branch in all_banches
            ]}
        )
    
    # branches logic for club user 
    try: 
        branch_id = BranchAdmin.query.filter_by(user_id=user_id).first().branch_id
        branch = Branch.query.filter_by(branch_id=branch_id).first()
        if not branch: 
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({
            'branches': [
                {'branch_id': branch.branch_id, 'branch_name': branch.branch_name}
            ]
        })
    except Exception as e: 
        Logger.error(f"Error getting branches for user: {str(e)}")
        return jsonify({"error": "Error getting branches"}), 500