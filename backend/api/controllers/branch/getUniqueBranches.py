from api.models.branch import Branch
from flask import jsonify

def GetUniqueBranches(): 
    all_banches = Branch.query.all()
    
    return jsonify({'branches': [{'branch_id': branch.branch_id, 'branch_name': branch.branch_name} for branch in all_banches]})