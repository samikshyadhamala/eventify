from flask_mail import Message
import os 
from api import mail
import dotenv
from flask import jsonify

dotenv.load_dotenv()
def Contact(formData):
    msg = Message(
        subject=formData.get('subject'),
        sender=os.getenv("MAIL_USERNAME"),
        recipients=[os.getenv("SUPPORT_EMAIL")],
        body=formData.get('message')
    )
    
    mail.send(msg)
    
    return jsonify({"message": "Message sent successfully"}), 200 