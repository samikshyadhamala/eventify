from api.models.event import Event
from api.utils.getRelatedBranch import GetRelatedBranch
from api.utils.logger import Logger

def GetBranchEvents(user_id):
    try:
        branch_id = GetRelatedBranch(user_id)
        if not branch_id: 
            return {'message': 'No branch associated with user found'}, 500
        
        all_events = Event.query.filter_by(branch_id=branch_id).order_by(Event.updated_at.desc()).all()
        
        # response
        return {
            'events': [{
                'event_id': event.event_id,
                'branch_id': event.branch_id,
                'title': event.title,
                'description': event.description,
                'event_date': event.event_date.isoformat(),
                'location': event.location,
                'is_paid': event.is_paid,
                'price': event.price,
                'max_capacity': event.max_capacity,
                'imageUrl': event.imageUrl,
                'created_at': event.created_at.isoformat()
            } for event in all_events]
        }, 200
    except Exception as e:
        Logger.error("[red]Error getting BranchEvents [/red]", e)
        return {'error': str(e)}, 500