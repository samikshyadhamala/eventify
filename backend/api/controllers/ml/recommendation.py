from models.recommendation import EventRecommendationModel
from api import db

# preloadding model 
model = EventRecommendationModel(session=db.session)

def Recommendation(): 
    recommendations = model.recommend_events(pastEvents=[], k=10)
    return recommendations, 200