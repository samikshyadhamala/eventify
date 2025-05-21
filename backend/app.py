from api import create_app
from api.utils.logger import Logger
if __name__ == "__main__":
    app = create_app()
    try: 
        app.run(debug=True, host="0.0.0.0", port=5000)
    except Exception as e: 
        Logger.error(e)