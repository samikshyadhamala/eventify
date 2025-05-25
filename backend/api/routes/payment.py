from flask import Blueprint, request
from api.utils.logger import Logger
from api.controllers.payment import CallbackKhalti
payment_bp = Blueprint('callback', __name__)

@payment_bp.get("/callbackKhalti")
def khalti(): 
    data = request.args
    registration_id = data.get("purchase_order_id")
    payment_status = data.get("status")
    pidx = data.get('pidx')
    return CallbackKhalti(registration_id, payment_status, pidx)
