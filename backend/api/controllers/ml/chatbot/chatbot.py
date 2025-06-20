# chatbot.py

import os
from flask import jsonify
from langchain_google_genai import ChatGoogleGenerativeAI
from langgraph.graph import START, StateGraph, MessagesState
from langgraph.prebuilt import tools_condition, ToolNode
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.tools import tool
from dotenv import load_dotenv
from .getEventDetails import get_event_details
from sqlalchemy import or_
from api.models.chat import Chat, Message
from api import db 
from typing import Optional

# Load environment variables
load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not set in environment variables")

llm = ChatGoogleGenerativeAI(api_key=GOOGLE_API_KEY, model="gemini-2.5-flash-preview-04-17", temperature=0.2, max_output_tokens=500)

# ---------------------- TOOLS ---------------------- #

@tool
def get_policy() -> str:
    """Fetch the policy document.

    Returns:
        str: The contents of the policy document or an error message.
    """
    policies_path = os.path.join(os.path.dirname(__file__), 'policies.txt')
    try:
        with open(policies_path, 'r') as f:
            return f.read()
    except FileNotFoundError:
        return "Policy file not found."
    except Exception as err:
        return f"Error reading policy file: {str(err)}"
    
@tool
def get_events():
    """Fetch the list of events.

    Returns:
        str: A list of events or an error message.
    """
    try:
        events = get_event_details()
        if events['success']:
            return str(events['events'])
        else:
            return f"Error fetching events: {events['error']}"
    except Exception as e:
        return f"An error occurred while fetching events: {str(e)}"
    
@tool
def get_eventify_desc() -> str:
    """Return platform descriptions from eventify.txt"""
    eventify_path = os.path.join(os.path.dirname(__file__),  'eventify.txt')
    with open(eventify_path, 'r', encoding='utf-8') as f:
        return f.read()

tools = [get_policy, get_events, get_eventify_desc]
llm_with_tools = llm.bind_tools(tools)

# ---------------------- LLM NODE ---------------------- #
sys_msg = SystemMessage(
    content="""You are an assistant for Eventify. If the user asks about:
    - policies, use the `get_policy` tool
    - platform description, use the `get_eventify_desc` tool
    - events, use the `get_event_details` tool"""
)

def assistant_node(state: MessagesState):
    response = llm_with_tools.invoke([sys_msg] + state["messages"])
    return {"messages": [response]}

builder = StateGraph(MessagesState)
builder.add_node("assistant", assistant_node)
builder.add_node("tools", ToolNode(tools))
builder.add_edge(START, "assistant")
builder.add_conditional_edges("assistant", tools_condition)
builder.add_edge("tools", "assistant")
react_graph = builder.compile()

user_states = {}

# ---------------------- LOAD MESSAGE HISTORY ---------------------- #

def load_user_messages_from_db(user_id=None, user_uuid=None):
    if not user_id and not user_uuid:
        return []

    chat = Chat.query.filter(
        or_(Chat.user_id == user_id, Chat.user_uuid == user_uuid)
    ).order_by(Chat.chat_id.desc()).first()

    if not chat:
        return []

    messages = Message.query.filter_by(chat_id=chat.chat_id).order_by(Message.timestamp).all()

    converted = []
    for msg in messages:
        if msg.message_type == "sent":
            converted.append(HumanMessage(content=msg.content))
        elif msg.message_type == "received":
            converted.append(SystemMessage(content=msg.content))
    return converted

# ---------------------- MAIN CHATBOT ENTRY ---------------------- #

def ChatBot(user_id: Optional[str], user_uuid: Optional[str], message: str):
    if not message or (not user_id and not user_uuid):
        return jsonify({'error': 'Missing user ID/UUID or message'}), 400

    user_key = user_id or user_uuid

    if user_key not in user_states:
        # Load history from DB
        user_states[user_key] = {
            "messages": load_user_messages_from_db(user_id=user_id, user_uuid=user_uuid)
        }

    state = user_states[user_key]
    state["messages"].append(HumanMessage(content=message))

    try:
        updated_state = react_graph.invoke(state)
        user_states[user_key] = updated_state

        response_text = updated_state["messages"][-1].content

        # Optional: Save both sent and received message to DB
        if user_id: 
            chat = Chat.query.filter_by(
                user_id=user_id
            ).order_by(Chat.chat_id.desc()).first()
        else:
            chat = Chat.query.filter_by(
                user_uuid=user_uuid
            ).order_by(Chat.chat_id.desc()).first()
            
        if not chat:
            chat = Chat(user_id=user_id, user_uuid=user_uuid)
            db.session.add(chat)
            db.session.commit()

        db.session.add_all([
            Message(chat_id=chat.chat_id, content=message, message_type="sent"),
            Message(chat_id=chat.chat_id, content=response_text, message_type="received")
        ])
        db.session.commit()

        return jsonify({'response': response_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
