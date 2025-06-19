from flask import Blueprint, request, jsonify
from api.controllers.ml import Recommendation 
from api.controllers.ml import ChatBot, GetChatHistory, ClearChat
from api.utils.getUserId import GetUserId

ml_bp = Blueprint('ml', __name__)

@ml_bp.get('/recommend')
def recommend():
    """
    Endpoint to get recommendations based on user input.
    """
    return Recommendation()

@ml_bp.post('/chat')
def chat():
    data = request.get_json()
    loginToken = request.cookies.get('loginToken')
    user_id = GetUserId(loginToken)
    user_uuid = request.cookies.get('user_uuid')
    message = data.get('message')

    return ChatBot(user_id, user_uuid, message)

@ml_bp.get("/chat")
def getChatHistory(): 
    loginToken = request.cookies.get('loginToken')
    user_id = GetUserId(loginToken)
    user_uuid = request.cookies.get('user_uuid')

    return GetChatHistory(user_id, user_uuid)

@ml_bp.delete("/chat")
def clearChat():
    user_id = request.cookies.get('user_id')
    user_uuid = request.cookies.get('user_uuid')
    return ClearChat(user_id, user_uuid)