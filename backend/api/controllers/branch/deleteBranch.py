from api.models.branch import Branch
from flask import jsonify
from api import db

def DeleteBranch(id):
    try:
        selected_branch = Branch.query.filter_by(branch_id=id).first()
        
        if not selected_branch:
            return jsonify({"error": "Branch not found"}), 404
            
        db.session.delete(selected_branch)
        db.session.commit()
        
        return jsonify({"message": "Branch deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500