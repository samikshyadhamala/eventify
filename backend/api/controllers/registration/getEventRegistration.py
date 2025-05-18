from api.models.registration import Registration
from api.utils.logger import Logger
from firebase_admin import auth

def GetEventRegistration(event_id):
    try:
        selected_registrations = Registration.query.filter_by(event_id=event_id)
        
        formated_response = []
        for registration in selected_registrations:
            try:
                # Get Firebase user info
                firebase_user = auth.get_user(registration.user_id)
                registration_data = {
                    "registration_id": registration.registration_id,
                    "registered_at": registration.registered_at,
                    "user": {
                        "fid": registration.user_id,
                        "email": firebase_user.email,
                        "imageUrl": firebase_user.photo_url,
                    }
                }
                formated_response.append(registration_data)
            except Exception as firebase_error:
                Logger.error(f"Error getting Firebase user info: {str(firebase_error)}")
                continue

        return {"registrations": formated_response}
    except Exception as e:
        Logger.error(f"Error getting event registrations: {str(e)}")
        return {"error": "Error retrieving registrations"}, 500