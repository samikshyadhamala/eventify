from api.models.registration import Registration
from sqlalchemy import func
import time
from api.utils.logger import Logger

def GetAllRegistrationCount():
    start = time.time()
    counts = Registration.query.group_by(Registration.event_id)\
        .with_entities(Registration.event_id, func.count())\
        .all()
    end = time.time()
    Logger.info(f"response time: {end - start:.3f}s")
    return {"counts": dict(counts)}