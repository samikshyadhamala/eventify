from api.models.event import Event

def get_event_details():    
    events = []
    try:
        all_events = Event.query.order_by(Event.updated_at.desc()).all()
        for event in all_events:
            event_info = {
                'event_id': event.event_id,
                'branch_id': event.branch_id,
                'title': event.title,
                'description': event.description,
                'event_date': event.event_date.isoformat(),
                'location': event.location,
                'is_paid': event.is_paid,
                'price': event.price,
                'max_capacity': event.max_capacity,
                'imageUrl': event.imageUrl,
                'created_at': event.created_at.isoformat()
            }
            events.append(event_info)

        return {
            'success': True,
            'events': events
        }
    except Exception as e:
        return {
            'success': False,
            'error': str(e)
        }

if __name__ == "__main__":
    print(get_event_details())
