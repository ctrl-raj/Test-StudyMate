import eventManager
import ollama
import subprocess
import time
import json 
import tabulate
import webbrowser

# FUNCTION EXECUTER
def execute(name: dict, arguments: dict):
    try:
        if name == "getEvent":
            print("Getting Upcomming Events...")

            events = eventManager.getEvent()
            
            table_data = [[date, event] for date, event in events.items()]
            headers = ["Date", "Event"]
            event_table = tabulate.tabulate(table_data, headers=headers, tablefmt="github")
            return event_table

        elif name == "checkEvent":
            date = arguments["date"]
            print(f"Checking Events on {date}...")

            events = eventManager.checkEvent(arguments["date"])

            table_data = [[date, event] for date, event in events.items()]
            headers = ["Date", "Event"]
            event_table = tabulate.tabulate(table_data, headers=headers, tablefmt="github")
            return event_table
    
        elif name == "postEvent":

            title = arguments["event_title"]
            description = arguments["event_summary"]
            date = arguments["date"]
            # default value for time
            time = arguments.get("time", 9)
            # default value of recurrence
            recurrence = arguments.get("recurrence", 1)

            print(f"Posting {title} on {date}...")

            url = eventManager.postEvent(title=title, description=description, date=date, recurrence_count=recurrence, time_hr=time)
            time.sleep(2)
            webbrowser.open(url=url)
            return url
    
        else:
            print("no functions called")
            pass
    except Exception as e:
        print(f"Error: {e}")


# Initialize the Ollama client
client = ollama.Client()

# Define the model and the input prompt
model = "rookie"  # Replace with your model name
print(f"{model} loaded...")

def chatScheduler(prompt: str):
    # generate response
    response = client.generate(model=model, prompt=prompt)
    print(f"--{model} Responded--")
    response_string = response.response

    # response
    response_dict = json.loads(response_string)
    
    # terminal side checks
    print(f"Reponse: {response_dict["message"]}")
    print(response_dict)

    # call tools
    tool_calls = response_dict["tool_calls"]

    if len(tool_calls) == 0:
        print("No Functions Called By Rookie...")
        return f"Reponse: {response_dict["message"]}" , None
    else:
        function = tool_calls[0]
        function_name = function["function"]["name"]
        function_arguments = function["function"]["arguments"]

        # generate output for frontend
        output = execute(function_name, function_arguments)
        return f"Reponse: {response_dict["message"]}" , output