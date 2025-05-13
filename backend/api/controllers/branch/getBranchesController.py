from flask import jsonify
from api.models.branch import Branch

def get_branches():
    try:
        branches = Branch.query.all()
        return jsonify({
            'branches': [{
                'branch_id': branch.branch_id,
                'branch_name': branch.branch_name,
                'location': branch.location,
                'created_at': branch.created_at.isoformat()
            } for branch in branches]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500