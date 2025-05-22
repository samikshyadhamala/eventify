from flask import Blueprint, request
from api.controllers.contact import *

contact_bp = Blueprint("contact", __name__)

@contact_bp.post("/")
def contact(): 
    data = request.get_json()
    return Contact(data)