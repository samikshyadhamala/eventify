from flask import Blueprint
from ..controllers.event import InsertEventController, GetEvents, GetEvent, DeleteEventController

event_bp = Blueprint("event", __name__)

@event_bp.post('/insertEvent')
def insertEvent(): 
    return InsertEventController()

@event_bp.get("/getEvents")
def getEvents(): 
    return GetEvents()

@event_bp.get("/getEvent/<int:event_id>")
def getEvent(event_id):
    return GetEvent(event_id)

@event_bp.delete("/deleteEvent/<int:event_id>")
def delete_event(event_id): 
    return DeleteEventController(event_id)