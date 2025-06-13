from flask import request, jsonify, make_response
import os
import dotenv

dotenv.load_dotenv()


def logout():
    is_production = os.getenv("FLASK_ENV") == "production"
    response = make_response("Cookie cleared!")
    response.delete_cookie(
        "loginToken",
        path="/",
        secure=is_production,
        samesite="None" if is_production else "Lax",
        httponly=True,
    )
    response.delete_cookie(
        "refreshToken",
        path="/",
        secure=is_production,
        samesite="None" if is_production else "Lax",
        httponly=True,
    )
    return response
