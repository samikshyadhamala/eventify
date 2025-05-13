from api.models.event import Event
from flask import jsonify

def GetEvents():
    try:
        all_events = Event.query.all()
        return jsonify({
            'events': [{
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
            } for event in all_events]
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500