from api.models.branch_admin import BranchAdmin

def GetRelatedBranch(user_id: str) -> int | None: 
    try:
        branch = BranchAdmin.query.filter_by(user_id=user_id).first()
        
        # validating if user is associated with branch
        if not branch: 
            return 
        
        return branch.branch_id
    except Exception as e:
        return 
    