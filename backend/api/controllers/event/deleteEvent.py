from api.models import Event
from api import db
from flask import jsonify

def DeleteEventController(event_id):
    selectedEvent = Event.query.get(event_id)
    if not selectedEvent:
        return jsonify({"error": "Event not found"}), 404
    
    try:
        db.session.delete(selectedEvent)
        db.session.commit()
        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500