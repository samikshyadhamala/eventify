from flask import Blueprint
from ..controllers.event import *
from middleware.auth import verify_club_token

event_bp = Blueprint("event", __name__)

@event_bp.post('/insertEvent')
@verify_club_token
def insertEvent(): 
    return InsertEventController()

@event_bp.get("/getEvents")
def getEvents(): 
    return GetEvents()

@event_bp.get("/getEvent/<int:event_id>")
def getEvent(event_id):
    return GetEvent(event_id)

@event_bp.delete("/deleteEvent/<int:event_id>")
@verify_club_token
def delete_event(event_id): 
    return DeleteEventController(event_id)

@event_bp.get("/getTotalEvent")
def getTotalEvent(): 
    return GetTotalEvent()

@event_bp.get("/getUpcomingEvent")
def getUpcomingEvent(): 
    return GetUpcomingEvent()