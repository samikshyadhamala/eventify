from flask import Blueprint, request
from api.controllers.branch import *
from middleware.auth import verify_admin_token, verify_club_admin_token

branch_bp = Blueprint("branch", __name__)

# Create a new branch
@branch_bp.post('/createBranch')
@verify_admin_token
def create():
    return create_branch()

# Get all branches
@branch_bp.get('/')
@verify_admin_token
def get_all():
    return get_branches()

@branch_bp.get("/getUniqueBranches")
@verify_club_admin_token
def getUniqueBranches(): 
    user = request.user
    return GetUniqueBranches(user)

@branch_bp.get("/getDetailedBranch")
@verify_admin_token
def getDetailedBranch(): 
    return GetDetailedBranch()

@branch_bp.delete("/deleteBranch/<id>")
@verify_admin_token
def deleteBranch(id): 
    return DeleteBranch(id)