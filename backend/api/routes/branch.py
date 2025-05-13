from flask import Blueprint
from api.controllers.branch import *

branch_bp = Blueprint("branch", __name__)

# Create a new branch
@branch_bp.post('/createBranch')
def create():
    return create_branch()

# Get all branches
@branch_bp.get('/')
def get_all():
    return get_branches()

@branch_bp.get("/getUniqueBranches")
def getUniqueBranches(): 
    return GetUniqueBranches()
