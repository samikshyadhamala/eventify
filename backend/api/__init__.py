from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api
from api.config import Config
from flask_migrate import Migrate
from flask_cors import CORS

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
    app.register_blueprint(test_bp, url_prefix='/api/test')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api/user')
    with app.app_context():
        db.create_all()  # Create database tables

    return app