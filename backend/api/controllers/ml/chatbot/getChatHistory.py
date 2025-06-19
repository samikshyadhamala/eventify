from typing import Optional
from flask import Response
from api.models.chat import Chat, Message

def GetChatHistory(user_id: Optional[str], user_uuid: Optional[str]):
    chat = Chat.query.filter(
        (Chat.user_id == user_id) | (Chat.user_uuid == user_uuid)
    ).order_by(Chat.chat_id.desc()).first()

    if not chat:
        return {"error": "No chat history found for the user."}, 404

    messages = Message.query.filter_by(chat_id=chat.chat_id).order_by(Message.timestamp).all()

    return {
        "chat_id": chat.chat_id,
        "messages": [msg.to_dict() for msg in messages]
    }