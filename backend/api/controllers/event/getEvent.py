from api.models.event import Event
from api.models.registration import Registration
from sqlalchemy import func

def GetEvent(event_id):
    requested_event = Event.query.filter_by(event_id=event_id).first()
    if requested_event is None:
        return {"error": "Event not found"}, 404
    requested_event_dict = requested_event.to_dict()
    count = Registration.query.filter_by(event_id=event_id).count()
    requested_event_dict['availableSpots'] = requested_event_dict['maxCapacity'] - count
    return requested_event_dict