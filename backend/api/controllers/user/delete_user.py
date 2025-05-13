from api.models.user import User
from flask import request, jsonify
from api import db

def delete_user_controller(id):
    try:
        user_id = id
        if not user_id:
            return jsonify({'error': 'User ID is required'}), 400
            
        user = User.query.filter_by(fid=user_id).first()
        if not user:
            return jsonify({'error': 'User not found'}), 404

        db.session.delete(user)
        db.session.commit() 

        return jsonify({'message': 'User deleted successfully'}), 200

    except Exception as error:
        return jsonify({'error': str(error)}), 500