from api.models.event import Event
from api.models.registration import Registration
from flask import jsonify

def GetRegisteredEvents(user_id):
    try:
        # Get all event_ids the user is registered for
        user_registrations = Registration.query.filter_by(user_id=user_id).all()
        event_ids = [registration.event_id for registration in user_registrations]

        # Get events whose IDs are in the list
        registered_events = Event.query.filter(Event.event_id.in_(event_ids)).order_by(Event.updated_at.desc()).all()

        # create registration_id map
        registration_id_map = {registration.event_id: registration.registration_id for registration in user_registrations}

        return jsonify({
            'events': [{
                'registration_id': registration_id_map.get(event.event_id),
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
            } for event in registered_events]
        }), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500
