from api import db 
from api.models import Event
from api.utils.fetchRole import FetchRole
from api.utils.getRelatedBranch import GetRelatedBranch

def GetTotalEvent(user_id):  
    role = FetchRole(user_id)
    
    if role == "admin": 
        eventCount = Event.query.count()
        return {"total": eventCount}
    
    branch_id = GetRelatedBranch(user_id)
    if not branch_id: 
        return {"total": 0}
    
    eventCount = Event.query.filter(Event.branch_id == branch_id).count()
    return {"total": eventCount}