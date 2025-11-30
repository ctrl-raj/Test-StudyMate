# -- SCRIPT -- #

# Dependencies
import ollama
import json 
import tabulate
import webbrowser
import time as t

# Script
import eventManager

# FUNCTION EXECUTER
def execute(name, arguments: dict):
    try:
        if name == "getEvent":
            print("Getting Upcomming Events...")

            events = eventManager.getEvent()
            return events

        elif name == "checkEvent":
            date = arguments["date"]
            print(f"Checking Events on {date}...")

            events = eventManager.checkEvent(arguments["date"])
            return events
    
        elif name == "postEvent":

            title = arguments.get("event_title", "untitled")
            description = arguments.get("event_summary", "no summary")
            date = arguments["date"]
            # default value for time
            time = arguments.get("time", 9)
            # default value of recurrence
            recurrence = arguments.get("recurrence", 1)

            print(f"Posting {title} on {date}...")

            url = eventManager.postEvent(title=title, description=description, date=date, recurrence_count=recurrence, time_hr=time)
            t.sleep(1.5)
            webbrowser.open(url=url)
            return url
    
        else:
            print("no functions called")
            pass
    except Exception as e:
        print(f"Error: {e}")


def chatScheduler(prompt: str):

    # Initialize the Ollama client
    client = ollama.Client()
    model = "yuki"

    # generate response
    response = client.generate(model=model, prompt=prompt)
    print(f"--{model} Responded--")
    response_string = response.response
    print(response_string)

    # response
    response_dict = json.loads(response_string)

    # call tools
    tool_calls = response_dict.get("tool_calls")

    if len(tool_calls) == 0:
        print("No Functions Called By Rookie...")
        return response_dict["message"] , None
    else:
        function = tool_calls[0]
        function_name = function["function"]["name"]
        function_arguments = function["function"]["arguments"]

        # generate output for frontend
        output = execute(function_name, function_arguments)
        if output:
            print("good")
        return response_dict["message"] , output