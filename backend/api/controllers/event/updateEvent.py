from api.models.event import Event
from api import db

def UpdateEvent(id, data): 
    try: 
        event = Event.query.filter_by(event_id=id).first()
        if not event: 
            return {"message": "Event not found"}, 404
        
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        event.event_date = data.get('event_date', event.event_date)
        event.location = data.get('location', event.location)
        event.is_paid = data.get('is_paid', event.is_paid)
        event.price = data.get('price', event.price)
        event.max_capacity = data.get('max_capacity', event.max_capacity)
        event.imageUrl = data.get('imageUrl', event.imageUrl)
        
        db.session.commit()
        return {"message": "Event updated successfully"}, 200
    except Exception as e: 
        db.session.rollback()
        return {"message": "Error updating event"}, 500