from flask import request, jsonify, make_response
import os 
import dotenv; dotenv.load_dotenv()

def logout():
    is_production = os.getenv('FLASK_ENV') == 'production'
    response = make_response("Cookie cleared!")
    response.delete_cookie('loginToken', secure=is_production)
    response.delete_cookie('refreshToken', secure=is_production)
    return response