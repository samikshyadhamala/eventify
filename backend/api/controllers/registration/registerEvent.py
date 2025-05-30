from flask import request, jsonify, render_template, redirect
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
import requests

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
        if Registration.query.filter_by(user_id=user["uid"], event_id=event_id).first():
            return jsonify({"error": "User already registered for this event"}), 400

        # Create registration entry
        registration = Registration(user_id=user["uid"], event_id=event_id)
        db.session.add(registration)
        db.session.commit()
        
        # handle paid registration
        if event.is_paid:
            # prepare event details for khalti
            payload = {
                "return_url": f"{os.getenv('BACKEND_URL')}/api/payment/callbackKhalti",
                "website_url": f"{os.getenv('BACKEND_URL')}",
                "amount": int(event.price) * 100, # converting in rs
                "purchase_order_id": registration.registration_id,
                "purchase_order_name": event.title,
                "customer_info": {
                    "name": user.get("name"),
                    "email": user.get("email"),
                    # "phone": "9800000123",
                },
                "amount_breakdown": [
                    {"label": event.title, "amount": int(event.price) * 100},
                    # {"label": "VAT", "amount": 300},
                ],
                "product_details": [
                    {
                        "identity": event_id,
                        "name": event.title,
                        "total_price": int(event.price) * 100,
                        "quantity": 1,
                        "unit_price": int(event.price) * 100,
                    }
                ],
                # "merchant_username": "merchant_name",
                # "merchant_extra": "merchant_extra",
            }
            headers = {'Authorization': f'key {os.getenv("KHALTI_API_KEY")}'}
            
            # request payment url
            try: 
                response = requests.post(
                    "https://dev.khalti.com/api/v2/epayment/initiate/", 
                    headers=headers,
                    json=payload
                )
                data = response.json()
                if not data.get("payment_url"): 
                    raise ValueError("No payment_url in response")
                
            except Exception as e: 
                Logger.error(f"Error initiating kahlti payment {e}")
                raise # raise for parent excpet block 
                
            # redirect to khalti url
            return {'redirect_url': data.get("payment_url")}

        # set payment status to complete for unpaid event
        registration.payment_status = 'completed'
        db.session.add(registration)
        db.session.commit()

        # Generate QR code as base64
        qr_data = str(registration.registration_id)
        qr_img = qrcode.make(qr_data)
        buf = io.BytesIO()
        qr_img.save(buf, format="PNG")
        qr_base64 = base64.b64encode(buf.getvalue()).decode("utf-8")
        cid = make_msgid(domain="example.com")[1:-1]
        image_bytes = buf.getvalue()

        # Prepare data for email
        registration_info = {
            "userName": user.get("name", None),
            "eventName": event.title,
            "RegistrationNumber": qr_data,
            "Date": event.event_date.strftime("%Y-%m-%d"),
            "Time": event.event_date.strftime("%H:%M"),
            "userEmail": user["email"],
            "location": event.location,
            "description": event.description,
            "qrCode": f"cid:{cid}",
        }

        # Compose email
        msg = Message(
            subject=f"You have registered for {event.title}",
            sender=os.getenv("MAIL_USERNAME"),
            recipients=[user["email"]],
        )
        msg.html = render_template("RegistrationTicket.html", **registration_info)
        msg.attach(
            filename="qrCode.png",
            content_type="image/png",
            data=image_bytes,
            headers={"Content-ID": f"<{cid}>"},
        )
        try:
            mail.send(msg)
        except Exception as e:
            Logger.error(f"Error sending email: {e}")
            raise

        return jsonify({"message": "Registered successfully"}), 200

    except Exception as e:
        # roll back all changes
        db.session.delete(registration)
        db.session.commit()
        
        Logger.error(f"Unhandled error in RegisterEvent: {e}")
        return jsonify({"error": "Internal server error"}), 500
