# - THIS IS THE SCRIPT USED FOR MANAGING EVENTS - 

import datetime as dt
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Define Scopes 
SCOPES = ["https://www.googleapis.com/auth/calendar"]

# GET EVENT FUNCTION
def getEvent():
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())

        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

        with open("token.json","w") as token:
            token.write(creds.to_json())
    
    try:
        service = build("calendar", "v3", credentials=creds)

        # get 20 upcoming events
        now = dt.datetime.now().isoformat() + "Z"

        maxResults = 4
        event_result = service.events().list(
            calendarId="primary",
            timeMin=now,
            maxResults=maxResults,
            singleEvents=True,
            orderBy="startTime",
        ).execute()
        events = event_result.get("items", [])

        if not events:
            return "No events found"
        
        removeDuplicates = []
        seen = set()

        for event in events:
            start = event["start"].get("datetime", event["start"].get("date"))
            summary = event["summary"]
            
            # Create a hashable tuple as identifier
            identifier = (start, summary)
            
            if identifier not in seen:
                seen.add(identifier)
                removeDuplicates.append({
                    "start": start,
                    "summary": summary
                })

        eventDict = {
            "events": removeDuplicates  # contains list of unique events
        }

        return eventDict
        
    except HttpError as error:
        print("Error: ",error)


# POST EVENT FUNCTION 
def postEvent(title: str, description: str, date: int, time_hr: int, recurrence_count: int):
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())

        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

        with open("token.json","w") as token:
            token.write(creds.to_json())
    
    try:
        service = build("calendar", "v3", credentials=creds)

        event = {
            "summary": title,
            "location": "Home OR Library",
            "description": description,
            "colorId": 1,
            "start": {"dateTime": f"{date}T{time_hr}:00:00", "timeZone": "Asia/Kolkata"},
            "end": {"dateTime": f"{date}T{time_hr + 2}:00:00", "timeZone": "Asia/Kolkata"},
            "recurrence":[
                f"RRULE:FREQ=DAILY;COUNT={recurrence_count}"
            ]
        }

        event = service.events().insert(calendarId = "primary", body=event).execute()

        return event['htmlLink']

    except HttpError as error:
        print("Error: ",error)


# CHECK EVENT FUNCTION
def checkEvent(date_string: str):
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    # Pre-processing of date_string
    import pytz
    date_string = "2025-09-25"

    # Convert the string to a date object
    date_obj = dt.datetime.strptime(date_string, "%Y-%m-%d").date()
    datetime_obj = dt.datetime.combine(date_obj, dt.time(0, 0, 0), tzinfo=pytz.utc)
    date = datetime_obj.isoformat()[:-6] + 'Z'


    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())

        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=0)

        with open("token.json","w") as token:
            token.write(creds.to_json())
    
    try:
        service = build("calendar", "v3", credentials=creds)

        maxResults = 2
        event_result = service.events().list(
            calendarId="primary",
            timeMin=date,   # using a specific date
            maxResults=maxResults,
            singleEvents=True,
            orderBy="startTime",
        ).execute()
        events = event_result.get("items", [])

        if not events:
            return "No events found"
        
        eventDict = {
            "events": [] # contains list of events
        }
        for event in events:
            start = event["start"].get("datetime", event["start"].get("date"))
            
            # appending event in temporary event dictionary
            for i in range(1, maxResults + 1, 1):
                eventDict["events"].append({
                    "start": start,
                    "summary": event["summary"]
                })
        
        return eventDict
        
    except HttpError as error:
        print("Error: ",error)