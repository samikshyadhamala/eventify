from api.models.branch import Branch
from api.models.event import Event

def GetDetailedBranch(): 
    allBranches = Branch.query.all()
    
    # filling extra info 
    detailed_info = []
    for branch in allBranches: 
        branch = branch.to_dict()
        event_count = Event.query.filter(Event.branch_id == branch["branch_id"]).count()
        detailed_info.append({**branch, 'event_count': event_count})
        
    return detailed_info