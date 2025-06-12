import sys; sys.path.append('.')
import dotenv; dotenv.load_dotenv()
import os
from api.utils.logger import Logger
from cryptography.fernet import Fernet, InvalidToken
import json
from api.models.registration import Registration

def VerifyRegistration(encryptedData):
    """
    Verify the registration using the encrypted data.
    
    Args:
        encryptedData (str): The encrypted data containing registration information.
    
    Returns:
        dict: A dictionary containing the verification result and any additional information.
    """
    key = os.getenv("REGISTRATION_VERIFICATION_KEY")
    if not key: 
        Logger.error("Registration verification key is not set in environment variables.")
        return {
            "message": "Registration verification key is not set."
        }, 500

    try:
        cipher = Fernet(key)
        decrypted_data = cipher.decrypt(encryptedData)
    except InvalidToken:
        Logger.error("Invalid token: decryption failed.")
        return {
            "message": "Invalid token: decryption failed."
        }, 400

    # verify data integrity
    json_data = json.loads(decrypted_data.decode())
    registration_id = json_data.get("registration_id")
    user_id = json_data.get("user_id")
    if not registration_id:
        Logger.error("Registration ID is missing in the decrypted data.")
        return {
            "message": "Registration ID is missing."
        }, 400

    # check if matches with database
    registration = Registration.query.get(registration_id)
    if not registration:
        Logger.error(f"Registration with ID {registration_id} not found.")
        return {
            "message": "Registration not found."
        }, 404

    if not user_id == registration.user_id:
        Logger.error(f"User ID {user_id} does not match the registration's user ID {registration.user_id}.")
        return {
            "message": "User ID does not match the registration's user ID."
        }, 403
    
    if registration.payment_status != "completed":
        Logger.error(f"Registration with ID {registration_id} has not been paid.")
        return {
            "message": "Registration has not been paid."
        }, 403
        
    return {
        "message": "Registration verified successfully.",
        "data": json_data, 
        "verification_status": "success"
    }

if __name__ == "__main__":
    # Example usage
    encrypted_data = b"gAAAAABoSll9Aup1lnMK2R6vmbxVB7Tu1VkOzDsijxptmQo985EM0noyN4QvJSIiWJxTx2W45zlLXl8q4dGFKeM1GvcZeSM2M5hB7kw98W9sKOf4x_-G58liQFd3Ed0wwjIl4Gw8zTrU8gL4GxNMeB1iy9I4Wd1SFjgla1h5dNxGNKZNBtWvXUA="
    message = VerifyRegistration(encrypted_data)
    print(message)