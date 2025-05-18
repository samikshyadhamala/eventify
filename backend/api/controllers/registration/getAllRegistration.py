from api.models.registration import Registration    

def GetAllRegistration(): 
    all_registration = Registration.query.all()
    
    return {"registrations": [registration.to_dict() for registration in all_registration]}