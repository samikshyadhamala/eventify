from firebase_admin import auth
from typing import Optional

def GetUserId(loginToken: Optional[str]) -> Optional[str]: 
    if not loginToken: 
        return 
    
    decoded_token = auth.verify_id_token(loginToken)
    if not decoded_token: 
        return None
    user_id = decoded_token.get('uid')
    if not user_id: 
        return None

    return user_id
    