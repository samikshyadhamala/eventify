from api import db
from datetime import datetime, UTC

class Registration(db.Model):
    __tablename__ = 'registrations'

    registration_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(30), db.ForeignKey('users.fid', ondelete='CASCADE'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.event_id', ondelete='CASCADE'), nullable=False)
    registered_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))
    payment_status = db.Column(db.String(20), default='pending')

    __table_args__ = (
        db.UniqueConstraint('user_id', 'event_id', name='uq_user_event'),
    )

    # Relationships
    # user = db.relationship('User', back_populates='registrations')
    # event = db.relationship('Event', back_populates='registrations')

    def __repr__(self):
        return f"<Registration {self.user_id} for {self.event_id}>"