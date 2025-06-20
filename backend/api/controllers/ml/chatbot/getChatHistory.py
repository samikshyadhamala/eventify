from typing import Optional
from flask import Response
from api.models.chat import Chat, Message

def GetChatHistory(user_id: Optional[str], user_uuid: Optional[str]):
    if not user_id and not user_uuid: 
        return {"error": "User ID or UUID is required."}, 400
    
    if user_id: 
        chat = Chat.query.filter_by(user_id=user_id).order_by(Chat.chat_id.desc()).first()
    else: 
        chat = Chat.query.filter_by(
        user_uuid=user_uuid
        ).order_by(Chat.chat_id.desc()).first()

    if not chat:
        return {"error": "No chat history found for the user."}, 404

    messages = Message.query.filter_by(chat_id=chat.chat_id).order_by(Message.timestamp).all()

    return {
            "messages": [msg.to_dict() for msg in messages]
    }