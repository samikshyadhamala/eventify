from flask import Flask, send_from_directory, abort, send_file
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from api.config import Config
from flask_migrate import Migrate
from flask_cors import CORS
import os

db = SQLAlchemy()
ma = Marshmallow()
migrate = Migrate()
api = Api()
cors = CORS()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    migrate.init_app(app, db)
    api.init_app(app)
    cors.init_app(app, 
        resources={r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization"],
            "supports_credentials": True
        }}
    )
    # Configure upload folder for media files
    MEDIA_FOLDER = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'media'))
    app.config['MEDIA_FOLDER'] = MEDIA_FOLDER

    # Ensure the media folder exists
    if not os.path.exists(MEDIA_FOLDER):
        os.makedirs(MEDIA_FOLDER)

    @app.route('/api/image/<filename>', methods=['GET'])
    def get_image(filename):
        # Construct the file path using absolute path
        file_path = os.path.join(app.config['MEDIA_FOLDER'], filename)
        
        # Check if the file exists
        if not os.path.isfile(file_path):
            abort(404, description="Image not found")
        
        # Get file extension to determine mimetype
        file_ext = os.path.splitext(filename)[1].lower()
        if file_ext in ['.jpg', '.jpeg']:
            mimetype = 'image/jpeg'
        elif file_ext == '.png':
            mimetype = 'image/png'
        else:
            mimetype = 'image/jpeg'  # Default to jpeg
            
        # Serve the image
        return send_file(file_path, mimetype=mimetype)

    # Optional: Serve images from the media folder directly
    @app.route('/media/<filename>')
    def serve_media(filename):
        return send_from_directory(app.config['MEDIA_FOLDER'], filename)

    
    # Register blueprints
    # from api.routes.events import events_bp
    # from api.routes.users import users_bp
    # from api.routes.branches import branches_bp
    # app.register_blueprint(events_bp, url_prefix="/api/events")
    # app.register_blueprint(users_bp, url_prefix="/api/users")
    # app.register_blueprint(branches_bp, url_prefix="/api/branches")
    from api.routes.test import test_bp
    from api.routes.auth import auth_bp
    from api.routes.user import user_bp
    from api.routes.event import event_bp
    from api.routes.branch import branch_bp
    from api.routes.registration import registration_bp
    
    app.register_blueprint(branch_bp, url_prefix="/api/branch/")
    app.register_blueprint(event_bp, url_prefix='/api/event')
    app.register_blueprint(test_bp, url_prefix='/api/test')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    app.register_blueprint(registration_bp, url_prefix='/api/registration')
    
    with app.app_context():
        db.create_all()  # Create database tables

    return app