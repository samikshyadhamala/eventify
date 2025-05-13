from api.models.user import User

def get_all_user_controller():
    users = User.query.all()
    return [user.to_dict() for user in users]
