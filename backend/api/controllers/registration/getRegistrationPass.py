from api.models.registration import Registration
from api.utils.logger import Logger
import dotenv; dotenv.load_dotenv()
import os
from cryptography.fernet import Fernet, InvalidToken
import json

def GetRegistrationPass(user_id, event_id):
    # validating input 
    if not user_id or not event_id or event_id == 'undefined':
        Logger.error("User ID and Event ID are required")
        return {"error": "User ID and Event ID are required"}
    try:
        # Fetch the registration for the user and event
        registration = Registration.query.filter_by(
            user_id=user_id,
            event_id=event_id,
            payment_status='completed'  # ensure only paid (or free-but-complete) regs
        ).first()

        if not registration:
            Logger.error(f"No completed registration for user {user_id}, event {event_id}")
            return {"error": "Registration not found"}, 404

        # Build the same payload that you embed in the QR on registration
        qr_data = {
            "registration_id": registration.registration_id,
            "user_id": registration.user_id,
            "event_id": registration.event_id
        }

        # Load your encryption key
        key = os.getenv("REGISTRATION_VERIFICATION_KEY")
        if not key:
            Logger.error("REGISTRATION_VERIFICATION_KEY is not set")
            return {"error": "Internal server error"}, 500

        cipher = Fernet(key.encode() if isinstance(key, str) else key)
        try:
            encrypted = cipher.encrypt(json.dumps(qr_data).encode())
        except Exception as e:
            Logger.error(f"Encryption failed: {e}")
            return {"error": "Internal server error"}, 500

        # Build the full URL that your front‑end or scanner will hit
        backend_url = os.getenv("BACKEND_URL")
        if not backend_url:
            Logger.error("BACKEND_URL is not set")
            return {"error": "Internal server error"}, 500

        # URL‐encode the token if your framework doesn't do it automatically
        # but Fernet tokens are URL‐safe base64, so you can embed directly.
        pass_url = f"{backend_url}/api/registration/verifyRegistration?encryptedData={encrypted.decode()}"

        # Return the URL for embedding in an <img src="..." /> QR generator,
        # or for directly redirecting
        return {"registration_pass": pass_url}, 200

    except Exception as e:
        Logger.error(f"Unhandled error in GetRegistrationPass: {e}")
        return {"error": "Error retrieving registration pass"}, 500
