from api.models.registration import Registration

def GetTotalRegistration(): 
    registrationCount = Registration.query.count()
    return {"total": registrationCount}