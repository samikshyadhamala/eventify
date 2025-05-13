from flask import Blueprint, request, jsonify
from api.models.test import Test
from api import db
test_bp = Blueprint('test', __name__)

@test_bp.get('/')
def test(): 
    # db.drop_all()
    # db.create_all()
    return jsonify({'message': 'hello world'})