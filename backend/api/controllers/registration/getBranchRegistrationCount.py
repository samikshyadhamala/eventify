from api.models.registration import Registration
from api.models.event import Event
from sqlalchemy import func

def GetBranchRegistrationCount(branch_id):
    branch_events = Event.query.filter_by(branch_id=branch_id).all()
    event_ids = [event.event_id for event in branch_events]
    counts = Registration.query.filter(Registration.event_id.in_(event_ids))\
        .group_by(Registration.event_id)\
        .with_entities(Registration.event_id, func.count())\
        .all()
    
    total = sum(count for _, count in dict(counts).items())
    return {"counts": dict(counts), "total": total}