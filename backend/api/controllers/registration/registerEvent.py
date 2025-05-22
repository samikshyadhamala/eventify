from flask import request, jsonify, render_template
from api.utils.logger import Logger
from api.models.registration import Registration
from api import db
from api.models.event import Event
import os
import dotenv
from flask_mail import Message
from api import mail
import qrcode
import io
import base64

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

        # Creating registration
        try:
            create_registration = Registration(user_id=user['uid'], event_id=event_id)
            db.session.add(create_registration)
            db.session.commit()

            # Generate QR code
            qr_data = create_registration.registration_id
            qr = qrcode.make(qr_data)

            # Save QR code to memory buffer
            buf = io.BytesIO()
            qr.save(buf, format='PNG')
            buf.seek(0)

            # Convert QR code to base64 for embedding in HTML
            qr_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')

            # Prepare registration info for email template
            registrationInfo = {
                "userName": user['name'],
                "eventName": event.title,
                "RegistrationNumber": create_registration.registration_id,
                "Date": event.event_date.strftime("%Y-%m-%d"),
                "Time": event.event_date.strftime("%H:%M"),
                "userEmail": user['email'],
                "location": event.location,
                "description": event.description,
                "qrCode": f"data:image/png;base64,{qr_base64}"  # Embed base64 image
            }

            # Create email message
            msg = Message(
                subject=f"You have registered for {event.title}",
                sender=os.getenv("MAIL_USERNAME"),
                recipients=[user['email']],
            )

            # Render HTML template with data
            msg.html = render_template('RegistrationTicket.html', **registrationInfo)

            # Send email
            mail.send(msg)

            return jsonify({"message": "registered successfully"}), 200

        except Exception as e:
            Logger.error(f"Error saving registration or sending email: {str(e)}")
            db.session.rollback()
            return jsonify({"message": "error saving registration or sending email"}), 500

    except Exception as error:
        Logger.error(f"Error in RegisterEvent: {str(error)}")
        return jsonify({"error": "Internal server error"}), 500