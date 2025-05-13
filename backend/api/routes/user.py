from flask import Blueprint
from api.controllers.user import * 

user_bp = Blueprint("user", __name__)

@user_bp.get("/get-all-user")
def get_all_user(): 
    return get_all_user_controller()

@user_bp.delete("/delete-user/<id>")
def delete_user(id): 
    return delete_user_controller(id)