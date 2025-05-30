from api.models.event import Event
from api.models.branch_admin import BranchAdmin
from api.models.user import User
from api.utils.getUserInfo import GetUserInfo
from api.models.branch import Branch

def GetOrganizerContact(event_id): 
    if not event_id: 
        return {"message": "Event id is required"}, 400
    
    # get event 
    selectedEvent = Event.query.get(event_id)
    
    if not selectedEvent:
        return {"message": "Event not found"}, 404
    
    # get branch id from event 
    branch_id = selectedEvent.branch_id
    
    # get related users associated with branch from branch_admin
    branch_admins = BranchAdmin.query.filter_by(branch_id=branch_id).all()
    
    if not branch_admins:
        return {"message": "No organizers found for this event"}, 404
    
    # Get user details for each branch admin
    organizer_contacts = []
    for admin in branch_admins:
        user = User.query.get(admin.user_id)
        if user:
            fid = user.fid
            userInfo = GetUserInfo(fid)
            organizer_contacts.append({
                "email": userInfo.get("email"),
                "imageUrl": userInfo.get("imageUrl"),
                "name": userInfo.get("name")
            })
    
    # fetch branch name
    branch = Branch.query.get(branch_id)
    if not branch: 
        return {"message": "No branch found associated with event"}, 500
    
    return {
        "organizers": organizer_contacts,
    }, 200