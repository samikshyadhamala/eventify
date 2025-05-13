import firebase_admin
from firebase_admin import credentials
from api.utils.logger import Logger
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Get absolute path to service account file
current_dir = Path(__file__).parent
service_account_path = current_dir / 'serviceAccountKey.json'

try:
    cred = credentials.Certificate(str(service_account_path))
    firebase_admin.initialize_app(cred)
    Logger.info('Firebase Admin SDK initialized successfully')
except Exception as error:
    Logger.error(f'Failed to initialize Firebase Admin SDK: {error}')
    raise  # Stop execution if initialization fails

admin = firebase_admin