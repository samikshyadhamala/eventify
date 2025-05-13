from flask import request, jsonify, make_response

def logout():
    response = make_response("Cookie cleared!")
    response.delete_cookie('loginToken')
    response.delete_cookie('refreshToken')
    return response