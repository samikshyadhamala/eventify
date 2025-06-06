from flask import Blueprint, request
from ..controllers.event import *
from middleware.auth import verify_club_token, verify_club_admin_token, verify_firebase_token
from api.utils.getRelatedBranch import GetRelatedBranch
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
@verify_club_admin_token
def delete_event(event_id): 
    return DeleteEventController(event_id)

@event_bp.get("/getTotalEvent")
@verify_club_admin_token
def getTotalEvent(): 
    user_id = request.user['uid']
    return GetTotalEvent(user_id)

@event_bp.get("/getUpcomingEvent")
def getUpcomingEvent(): 
    return GetUpcomingEvent()

@event_bp.post("/createEvent")
def createEvent(): 
    data = request.get_json()
    return CreateEvent(data); 

@event_bp.get("/getBranchEvents")
@verify_club_token
def getBranchEvents(): 
    user_id = request.user['uid']
    return GetBranchEvents(user_id)

@event_bp.get("/getUpcomingBranchEvent")
@verify_club_token 
def getUpcomingBranchEvent(): 
    user_id = request.user['uid']
    return GetUpcomingBranchEvent(user_id)

@event_bp.put("/updateEvent/<id>")
@verify_club_admin_token
def updateEvent(id): 
    data = request.get_json()
    return UpdateEvent(id, data)

@event_bp.get("/getOrganizerContact")
def getOrganizerContact(): 
    event_id = request.args.get("event_id")
    return GetOrganizerContact(event_id)

@event_bp.get("/getRegisteredEvents")
@verify_firebase_token
def getRegisteredEvents(): 
    user_id = request.user.get('uid')
    return GetRegisteredEvents(user_id)

@event_bp.get("/getEventsName")
def getEventsName(): 
    return GetEventsName()