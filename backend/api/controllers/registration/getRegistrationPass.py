from api.models.registration import Registration
from api.utils.logger import Logger

def GetRegistrationPass(user_id, event_id): 
    try:
        # Fetch the registration for the user and event
        registration = Registration.query.filter_by(user_id=user_id, event_id=event_id).first()
        
        if not registration:
            return {"error": "Registration not found"}, 404
        
        registration_data = {
            "registration_id": registration.registration_id,
            "registered_at": registration.registered_at,
        }
        
        return {"registration_pass": registration_data['registration_id']}
    
    except Exception as e:
        Logger.error(f"Error getting registration pass: {str(e)}")
        return {"error": "Error retrieving registration pass"}, 500 
    