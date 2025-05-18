from api.models.event import Event
from datetime import datetime

def GetUpcomingEvent(): 
    upcomingEvents = Event.query.filter(Event.event_date >= datetime.now()).all()
    return {
        "upcomingEvents": [upcomingEvent.to_dict() for upcomingEvent in upcomingEvents]
    }