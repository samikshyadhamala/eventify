from api.models.event import Event

def GetEvent(event_id):
    requested_event = Event.query.filter_by(event_id=event_id).first()
    if requested_event is None:
        return {"error": "Event not found"}, 404
    return requested_event.to_dict(), 200