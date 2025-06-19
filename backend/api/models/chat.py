from api import db
from sqlalchemy import Column, Integer, String, event, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from typing import Optional, cast

class Chat(db.Model):
    __tablename__ = 'chats'
    
    chat_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String(36), ForeignKey("users.fid", ondelete='CASCADE'))  # Optional foreign key to User table
    user_uuid = Column(String(36))  # UUID for anonymous user

    # One-to-many relationship: A Chat has many Messages
    messages = relationship('Message', back_populates='chat', cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Chat {self.chat_id} by User {self.user_id or self.user_uuid}>"
    
    def to_dict(self):
        return {
            "chat_id": self.chat_id,
            "user_id": self.user_id,
            "user_uuid": self.user_uuid,
            "messages": [message.to_dict() for message in self.messages]
        }

# ✅ Validator: either user_id or user_uuid must be present
@event.listens_for(Chat, 'before_insert')
@event.listens_for(Chat, 'before_update')
def validate_user_identity(mapper, connection, target: Chat):
    user_id = getattr(target, 'user_id', None)
    user_uuid = getattr(target, 'user_uuid', None)
    
    if not user_id and not user_uuid:
        raise ValueError("Either 'user_id' or 'user_uuid' must be provided in Chat.")

class Message(db.Model):
    __tablename__ = 'messages'
    message_id = Column(Integer, primary_key=True, autoincrement=True)
    chat_id = Column(Integer, ForeignKey('chats.chat_id', ondelete="CASCADE"), nullable=False)  # Foreign key to Chat table
    content = Column(String(5000), nullable=False)
    timestamp = Column(DateTime, default=db.func.current_timestamp())
    message_type = Column(Enum("sent", "received", name="message_type_enum"), nullable=False)

    # Many-to-one relationship: A Message belongs to one Chat
    chat = relationship('Chat', back_populates='messages')

    def __repr__(self):
        return f"<Message {self.message_id} in Chat {self.chat_id}>"

    def to_dict(self):
        timestamp_val = cast(Optional[datetime], self.timestamp)
        return {
            "message_id": self.message_id,
            "chat_id": self.chat_id,
            "content": self.content,
            "message_type": self.message_type,
            "timestamp": timestamp_val.isoformat() if timestamp_val else None
        }
