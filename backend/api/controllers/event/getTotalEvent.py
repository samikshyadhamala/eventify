from api import db 
from api.models import Event

def GetTotalEvent():  
    eventCount = Event.query.count()
    
    return {"total": eventCount}
    