from flask import request, jsonify
from api.utils.logger import Logger
from api.models.registration import Registration
from api import db
from api.models.event import Event
import os
import resend
import dotenv
dotenv.load_dotenv()


def RegisterEvent(user, event_id, data):
    try:
        if not data:
            Logger.error("No data provided")
            return jsonify({"error": "No data provided"}), 400
            
        
        if not event_id:
            Logger.error("Event Id is required")
            return jsonify({"error": "Event ID is required"}), 400
                
        # Check if event exists
        event = Event.query.get(event_id)
        if not event:
            Logger.error(f"Event with id {event_id} not found")
            return jsonify({"error": "Event not found"}), 404
            
        # Check if user is already registered
        existing_registration = Registration.query.filter_by(
            user_id=user['uid'],
            event_id=event_id
        ).first()
        
        if existing_registration:
            return jsonify({"error": "User already registered for this event"}), 400
            
        # creating registration
        try: 
            create_registration = Registration(user_id=user['uid'],event_id=event_id)
            db.session.add(create_registration)
            db.session.commit()
            

            resend.api_key = os.environ["RESEND_API_KEY"]
            params = {
                "from": "Eventify@resend.dev",
                "to": f"{user['email']}",
                "subject": f"You have registered for {event.title}",
                "html": "<strong>Hurray!</strong>"
            }

            email = resend.Emails.send(params)
            print(email)
            
            return jsonify({"message": "registered successfully"})
        except Exception as e: 
            Logger.error(f"Error saving registration: {str(e)}")
            db.session.rollback()
            return jsonify({"message": "error saving registration"}), 500
        
        
    except Exception as error:
        Logger.error(f"Error in RegisterEvent: {str(error)}")
        return jsonify({"error": "Internal server error"}), 500