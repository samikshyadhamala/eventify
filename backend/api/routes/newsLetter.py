from flask import Blueprint, request
from api.models.newsLetter import NewsLetter
from api import db

news_letter_bp = Blueprint("news_letter", __name__)

@news_letter_bp.post("/subscribe")
def subscribe():
    email = request.json.get("email")
    if not email:
        return {"message": "Email is required"}, 400

    # Check if the email is already subscribed
    existing_subscription = NewsLetter.query.filter_by(email=email).first()
    if existing_subscription:
        return {"message": "Email is already subscribed"}, 409

    # Create a new subscription
    new_subscription = NewsLetter(email=email)
    db.session.add(new_subscription)
    db.session.commit()

    return {"message": "Successfully subscribed"}, 201