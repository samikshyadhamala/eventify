from flask import Flask, request, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from flask_cors import CORS
from werkzeug.security import check_password_hash
from datetime import datetime
import logging
from rich.logging import RichHandler
import os


app = Flask(__name__)
CORS(app)

# basedir = os.path.abspath(os.path.dirname(__file__))
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'instance', 'event_db.db')


# --- Configuration ---
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///event_db.db'  # Use SQLite for testing
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Blueprint for all routes
bp = Blueprint('api', __name__)


# Logging setup
logging.basicConfig(level=logging.INFO, handlers=[RichHandler()])

# --- Models ---
class OAuthUser(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    provider = db.Column(db.String(50), nullable=False)
    provider_id = db.Column(db.String(120), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image = db.Column(db.String(250))

class Event(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(200), nullable=False)
    date = db.Column(db.DateTime, default=datetime.now, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    image_file = db.Column(db.String(30), nullable=False)
    club_id = db.Column(db.Integer, db.ForeignKey('club.id'), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_email = db.Column(db.String(120), unique=True, nullable=False)
    full_name = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=True)  # Optional for Google
    is_google_account = db.Column(db.Boolean, default=False)


class Club(db.Model):
    is_google_account = db.Column(db.Boolean, default=False)
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(200), nullable=False)
    events = db.relationship('Event', backref='club', lazy=True)


# --- Routes ---
@bp.route("/api/save-user", methods=["POST"])
def save_user():
    data = request.get_json()
    if not data or "email" not in data:
        return jsonify({"error": "Missing email"}), 400

    existing = OAuthUser.query.filter_by(email=data["email"]).first()
    if existing:
        return jsonify({"message": "User already exists"}), 200

    new_user = OAuthUser(
        name=data.get("name"),
        email=data["email"],
        image=data.get("image"),
        provider="google",  # example static value
        provider_id=data.get("provider_id", "")
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

@app.route('/api/user_signup', methods=['POST'])
def user_signup():
    data = request.get_json(force=True)
    full_name = data.get('full_name', '').strip()
    email = data.get('email', '').strip().lower()
    password = data.get('password')
    is_google = data.get('is_google_account', False)
    provider_id = data.get('provider_id', '')
    image = data.get('image', '')

    if not full_name or not email:
        return jsonify({'error': 'Full name and email are required'}), 400

    if User.query.filter_by(user_email=email).first():
        return jsonify({'message': 'User already exists'}), 200

    if is_google:
        if not OAuthUser.query.filter_by(email=email).first():
            oauth_user = OAuthUser(
                name=full_name,
                email=email,
                provider='google',
                provider_id=provider_id,
                image=image
            )
            db.session.add(oauth_user)

        user = User(
            user_email=email,
            full_name=full_name,
            is_google_account=True
        )
    else:
        if not password:
            return jsonify({'error': 'Password is required for manual signup'}), 400

        hashed_password = generate_password_hash(password)
        user = User(
            user_email=email,
            full_name=full_name,
            password=hashed_password,
            is_google_account=False
        )

    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 201


@app.route('/api/club_signup', methods=['GET','POST'])
def club_signup():
    data = request.get_json(force=True)
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    location = data.get('location', '').strip()
    password = data.get('password')
    is_google = data.get('is_google_account', False)
    provider_id = data.get('provider_id', '')
    image = data.get('image', '')

    if not name or not email or not location:
        return jsonify({'error': 'Name, email, and location are required'}), 400

    if Club.query.filter_by(email=email).first():
        return jsonify({'message': 'Club already exists'}), 200

    if is_google:
        if not OAuthUser.query.filter_by(email=email).first():
            oauth_user = OAuthUser(
                name=name,
                email=email,
                provider='google',
                provider_id=provider_id,
                image=image
            )
            db.session.add(oauth_user)

        club = Club(
            name=name,
            email=email,
            location=location,
            is_google_account=True
        )
    else:
        if not password:
            return jsonify({'error': 'Password is required for manual signup'}), 400

        hashed_password = generate_password_hash(password)
        club = Club(
            name=name,
            email=email,
            location=location,
            password=hashed_password,
            is_google_account=False
        )

    db.session.add(club)
    db.session.commit()
    return jsonify({'message': 'Club registered successfully'}), 201


@app.route('/api/user_login', methods=['POST'])
def user_login():
    data = request.get_json(force=True)
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    is_google = data.get('is_google_account', False)

    user = User.query.filter_by(user_email=email).first()
    if not user:
        return jsonify({'error': 'User does not exist'}), 404

    if is_google:
        if not user.is_google_account:
            return jsonify({'error': 'User signed up manually, use password login'}), 400
        return jsonify({'message': 'Google user login successful'}), 200

    # Manual login
    if user.is_google_account:
        return jsonify({'error': 'User signed up with Google, use Google login'}), 400

    if not check_password_hash(user.password, password):
        return jsonify({'error': 'Invalid password'}), 401

    return jsonify({'message': 'Manual user login successful'}), 200


@app.route('/api/club_login', methods=['POST'])
def club_login():
    data = request.get_json(force=True)
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    is_google = data.get('is_google_account', False)

    club = Club.query.filter_by(email=email).first()
    if not club:
        return jsonify({'error': 'Club does not exist'}), 404

    if is_google:
        if not club.is_google_account:
            return jsonify({'error': 'Club signed up manually, use password login'}), 400
        return jsonify({'message': 'Google club login successful'}), 200

    # Manual login
    if club.is_google_account:
        return jsonify({'error': 'Club signed up with Google, use Google login'}), 400

    if not check_password_hash(club.password, password):
        return jsonify({'error': 'Invalid password'}), 401

    return jsonify({'message': 'Manual club login successful'}), 200


# --- Run & Create DB ---
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.register_blueprint(bp)
    app.run(debug=True)

