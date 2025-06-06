from api.models.event import Event

def GetEventsName(): 
    try: 
        events = Event.query.with_entities(
            Event.event_id,
            Event.title
        ).all()
    except Exception as e:
        return {"message": "Error fetching events"}, 500

    return {
        "events": [
            {
                "event_id": event.event_id,
                "title": event.title
            } for event in events
        ]
    }, 200