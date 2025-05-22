from flask import Blueprint, request
from api.controllers.user import * 
from middleware.auth import verify_admin_token

user_bp = Blueprint("user", __name__)

@user_bp.get("/getAllUsers")
@verify_admin_token
def get_all_user(): 
    return get_all_user_controller()

@user_bp.delete("/delete-user/<id>")
@verify_admin_token
def delete_user(id): 
    return delete_user_controller(id)

@user_bp.put("/updateRole")
@verify_admin_token 
def updateRole():
    data = request.get_json()
    user_id = data.get('user_id')
    role = data.get('role')
    branch_id = data.get('branch_id', None)
    
    return UpdateRole(user_id, role, branch_id=branch_id)

@user_bp.get("/getBranchAdmin")
@verify_admin_token
def getBranchAdmin(): 
    return GetBranchAdmin()

@user_bp.post("/createBranchAdmin")
@verify_admin_token
def createBranchAdmin(): 
    data = request.get_json()
    branch_id = data.get('branch_id')
    user_id = data.get('user_id')
    return CreateBranchAdmin(branch_id, user_id)

@user_bp.put("/updateBranchAdmin")
@verify_admin_token
def updateBranchAdmin():
    data = request.get_json()
    branch_id = data.get('branch_id')
    user_id = data.get('user_id')
    return UpdateBranchAdmin(branch_id, user_id)

@user_bp.delete("/deleteBranchAdmin/<user_id>")
@verify_admin_token
def deleteBranchAdmin(user_id):
    return DeleteBranchAdmin(user_id)