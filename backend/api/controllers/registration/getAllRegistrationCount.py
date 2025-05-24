from api.models.registration import Registration
from sqlalchemy import func

def GetAllRegistrationCount():
    counts = Registration.query.group_by(Registration.event_id)\
        .with_entities(Registration.event_id, func.count())\
        .all()
    return {"counts": dict(counts)}