from models.recommendation import EventRecommendationModel
from api import db
from api.models.event import Event

# preloadding model 
# model = EventRecommendationModel(session=db.session)

def Recommendation(): 
    # recommendations = model.recommend_events(pastEvents=[], k=10)
    recommendations = Event.query.order_by(Event.created_at.desc()).limit(10).all()
    return [event.event_id for event in recommendations], 200