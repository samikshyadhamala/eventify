from flask import request, jsonify
from api.models.event import Event
from api import db
from datetime import datetime

def InsertEventController():
    try:
        data = request.get_json()
        
        # Create new event instance
        new_event = Event(
            branch_id=data['branch_id'],
            title=data['title'],
            description=data.get('description'),
            event_date=datetime.fromisoformat(data['event_date']),
            location=data.get('location'),
            is_paid=data.get('is_paid', False),
            price=data.get('price'),
            max_capacity=data.get('max_capacity'),
            imageUrl=data.get('imageUrl')
        )

        # Add and commit to database
        db.session.add(new_event)
        db.session.commit()

        return jsonify({
            'message': 'Event created successfully',
            'event': {
                'event_id': new_event.event_id,
                'branch_id': new_event.branch_id,
                'title': new_event.title,
                'description': new_event.description,
                'event_date': new_event.event_date.isoformat(),
                'location': new_event.location,
                'is_paid': new_event.is_paid,
                'price': str(new_event.price) if new_event.price else None,
                'max_capacity': new_event.max_capacity,
                'imageUrl': new_event.imageUrl,
                'created_at': new_event.created_at.isoformat()
            }
        }), 201

    except KeyError as e:
        return jsonify({'error': f'Missing required field: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500