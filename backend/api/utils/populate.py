import requests
import json
import sys; sys.path.append('.')
# List of event data

def insert_events():
    url = "http://localhost:5000/api/event/insertEvent"
    headers = {
        "Content-Type": "application/json"
    }
    
    success_count = 0
    failed_count = 0
    
    for event in events:
        try:
            response = requests.post(url, json=event, headers=headers)
            if response.status_code == 200:
                success_count += 1
                print(f"Successfully inserted event: {event['title']}")
                break #debugging
            else:
                failed_count += 1
                print(f"Failed to insert event: {event['title']}. Status code: {response.status_code}")
        except Exception as e:
            failed_count += 1
            print(f"Error inserting event {event['title']}: {str(e)}")
            
    print(f"\nInsert Summary:")
    print(f"Successfully inserted: {success_count} events")
    print(f"Failed to insert: {failed_count} events")

if __name__ == "__main__":
    insert_events()