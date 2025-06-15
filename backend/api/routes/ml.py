from flask import Blueprint, request, jsonify
from api.controllers.ml import Recommendation 

ml_bp = Blueprint('ml', __name__)

@ml_bp.get('/recommend')
def recommend():
    """
    Endpoint to get recommendations based on user input.
    """
    return Recommendation()