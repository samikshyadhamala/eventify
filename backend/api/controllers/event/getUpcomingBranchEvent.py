from api.models.event import Event
from api.utils.getRelatedBranch import GetRelatedBranch
from api.utils.logger import Logger
from datetime import datetime

def GetUpcomingBranchEvent(user_id):
    try:
        branch_id = GetRelatedBranch(user_id)
        if not branch_id:
            return {'message': 'No branch associated with user found'}, 500

        upcomingEvents = Event.query.filter(
            (Event.branch_id == branch_id) & 
            (Event.event_date >= datetime.now())
        ).all()

        return {
            'upcomingEvents': [{
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
            } for event in upcomingEvents]
        }, 200
    except Exception as e:
        Logger.error("[red]Error getting Upcoming Branch Events [/red]", e)
        return {'error': str(e)}, 500