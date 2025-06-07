from api.models.registration import Registration
from api.utils.logger import Logger
from flask import jsonify

def IsAlreadyRegistered(user_id, event_id):  
    try:
        # Query for registration matching both user_id and event_id
        selectedRegistration = Registration.query.filter(
            Registration.user_id == user_id,
            Registration.event_id == event_id
        ).first()
        if selectedRegistration and selectedRegistration.payment_status == 'completed':
            return jsonify({"isRegistered": True})
        return jsonify({"isRegistered": False})
    except Exception as e:
        Logger.error(f"Error checking registration status: {str(e)}")
        return jsonify({"isRegistered": False}), 500