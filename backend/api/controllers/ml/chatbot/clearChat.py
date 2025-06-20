from api.models.chat import Chat, Message
from api import db
from typing import Optional

def ClearChat(user_id: Optional[str], user_uuid: Optional[str]):
    if not user_id and not user_uuid: 
        return {"error": "User ID or UUID is required."}, 400
    
    if user_id: 
        chat = Chat.query.filter_by(
            user_id=user_id
        ).order_by(Chat.chat_id.desc()).first()
    else: 
        chat = Chat.query.filter_by(
            user_uuid=user_uuid
        ).order_by(Chat.chat_id.desc()).first()
        
    if not chat:
        return {"error": "No chat history found for the user."}, 404

    messages = Message.query.filter_by(chat_id=chat.chat_id).all()

    for message in messages:
        db.session.delete(message)

    db.session.commit()
    return {"message": "Chat cleared successfully."}, 200
