from flask import Blueprint
from ..controllers.registration import GetTotalRegistration

registration_bp = Blueprint('registration', __name__)

@registration_bp.get("/getTotalRegistration")
def getTotalRegistration(): 
    return GetTotalRegistration()