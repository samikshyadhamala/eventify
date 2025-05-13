from api import db 
from datetime import datetime


class Event(db.Model):
    __tablename__ = 'events'

    event_id = db.Column(db.Integer, primary_key=True)
    branch_id = db.Column(db.Integer, db.ForeignKey('branches.branch_id', ondelete='CASCADE'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text)
    event_date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255))
    is_paid = db.Column(db.Boolean, default=False, nullable=False)
    price = db.Column(db.Numeric(10, 2))
    max_capacity = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    branch = db.relationship('Branch', back_populates='events')
    registrations = db.relationship('Registration', back_populates='event', cascade='all, delete-orphan')
    views = db.relationship('EventView', back_populates='event', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Event {self.title} on {self.event_date}>"