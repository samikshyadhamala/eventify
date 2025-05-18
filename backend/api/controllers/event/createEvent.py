from api.utils.logger import Logger
from api.models.event import Event
from api import db
from datetime import datetime, timezone

def CreateEvent(data):
    try:
        # Validate required fields
        if not data.get('branch_id'):
            return {"message": "Branch ID is required"}, 400
        if not data.get('title'):
            return {"message": "Title is required"}, 400
        if not data.get('event_date'):
            return {"message": "Event date is required"}, 400

        # Parse and validate event_date
        try:
            event_date_str = data['event_date'].replace('/', '-')
            event_date = datetime.fromisoformat(event_date_str)
            if event_date.tzinfo is None:
                event_date = event_date.replace(tzinfo=timezone.utc)
        except ValueError:
            return {"message": "Invalid event date format"}, 400

        if event_date <= datetime.now(timezone.utc):
            return {"message": "Event must be in the future"}, 400

        # Create and save event
        created_event = Event(
            branch_id=data['branch_id'],
            title=data['title'],
            description=data.get('description'),
            event_date=event_date,
            location=data.get('location'),
            is_paid=data.get('is_paid', False),
            price=data.get('price'),
            max_capacity=data.get('max_capacity'),
            imageUrl=data.get('imageUrl')
        )

        db.session.add(created_event)
        db.session.commit()

        return {"message": "success", "event": created_event.to_dict()}

    except Exception as e:
        Logger.error(e)
        return {"message": "Error saving event"}, 500
