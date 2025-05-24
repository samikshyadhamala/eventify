from flask import Blueprint, request
from api.utils.logger import Logger
callback_bp = Blueprint('callback', __name__)

@callback_bp.get("/khalti")
def khalti(): 
    data = request.from_json()
    Logger.info(data)
    return 
    

    

    
    