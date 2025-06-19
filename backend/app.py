from api import create_app
from api.utils.logger import Logger
import os 
import dotenv 
dotenv.load_dotenv()

if __name__ == "__main__":
    app = create_app()
    port = int(os.getenv("PORT", "4000"))
    try: 
        app.run(debug=True, host="0.0.0.0", port=port)
    except Exception as e: 
        Logger.error(e)