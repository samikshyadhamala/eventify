from flask import jsonify, request
from api.models.branch import Branch
from api import db

def create_branch():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data.get('branch_name'):
            return jsonify({'error': 'Branch name is required'}), 400
            
        # Create new branch
        new_branch = Branch(
            branch_name=data['branch_name'],
            location=data.get('location')
        )
        
        db.session.add(new_branch)
        db.session.commit()
        
        return jsonify({
            'message': 'Branch created successfully',
            'branch': {
                'branch_id': new_branch.branch_id,
                'branch_name': new_branch.branch_name,
                'location': new_branch.location,
                'created_at': new_branch.created_at.isoformat()
            }
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500