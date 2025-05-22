from flask import request, jsonify, render_template
from api.utils.logger import Logger
from api.models.registration import Registration
from api.models.event import Event
from api import db, mail
from flask_mail import Message
import os
import dotenv
import qrcode
import io
import base64
from email.utils import make_msgid

dotenv.load_dotenv()

def RegisterEvent(user: dict, event_id: int):
    try:
        if not event_id:
            Logger.error("Event ID is required")
            return jsonify({"error": "Event ID is required"}), 400

        # Check if event exists
        event = Event.query.get(event_id)
        if not event:
            Logger.error(f"Event with ID {event_id} not found")
            return jsonify({"error": "Event not found"}), 404

        # Check for duplicate registration
        if Registration.query.filter_by(user_id=user['uid'], event_id=event_id).first():
            return jsonify({"error": "User already registered for this event"}), 400

        # Create registration entry
        registration = Registration(user_id=user['uid'], event_id=event_id)
        db.session.add(registration)
        db.session.commit()

        # Generate QR code as base64
        qr_data = str(registration.registration_id)
        qr_img = qrcode.make(qr_data)
        buf = io.BytesIO()
        qr_img.save(buf, format='PNG')
        qr_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
        cid = make_msgid(domain='example.com')[1:-1]
        image_bytes=buf.getvalue()

        # Prepare data for email
        registration_info = {
            "userName": user.get("name", None),
            "eventName": event.title,
            "RegistrationNumber": qr_data,
            "Date": event.event_date.strftime("%Y-%m-%d"),
            "Time": event.event_date.strftime("%H:%M"),
            "userEmail": user['email'],
            "location": event.location,
            "description": event.description,
            "qrCode": f"cid:{cid}"
        }

        # Compose email
        msg = Message(
            subject=f"You have registered for {event.title}",
            sender=os.getenv("MAIL_USERNAME"),
            recipients=[user['email']],
        )
        msg.html = render_template('RegistrationTicket.html', **registration_info)
        msg.attach(filename='qrCode.png', content_type='image/png', data=image_bytes,  headers={"Content-ID": f"<{cid}>"})
        try:
            mail.send(msg)
        except Exception as e:
            Logger.error(f"Error sending email: {e}")
            return jsonify({"error": "Registration saved, but email could not be sent"}), 500

        return jsonify({"message": "Registered successfully"}), 200

    except Exception as e:
        Logger.error(f"Unhandled error in RegisterEvent: {e}")
        db.session.rollback()
        return jsonify({"error": "Internal server error"}), 500
