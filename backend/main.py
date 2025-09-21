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
            print(tabulate.tabulate(table_data, headers=headers, tablefmt="github"))

        elif name == "checkEvent":
            date = arguments["date"]
            print(f"Checking Events on {date}...")

            events = eventManager.checkEvent(arguments["date"])

            table_data = [[date, event] for date, event in events.items()]
            headers = ["Date", "Event"]
            print(tabulate.tabulate(table_data, headers=headers, tablefmt="github"))
    
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
    
        else:
            print("no functions called")
            pass
    except Exception as e:
        print(f"Error: {e}")


# Start the Ollama server
ollama_process = subprocess.Popen(["ollama", "serve"])
time.sleep(1)

# Initialize the Ollama client
client = ollama.Client()

# Define the model and the input prompt
model = "rookie"  # Replace with your model name
print(f"{model} loaded...")

while True:
    terminate = False
    prompt = input(">>> ") # is to be directed from frontend

    if prompt == "//bye":
        terminate = True
        break
    else:
        response = client.generate(model=model, prompt=prompt)
        print(f"--{model} Responded--")
        response_string = response.response
        response_dict = json.loads(response_string)
        
        print(f"Reponse: {response_dict["message"]}")
        print(response_dict)

        tool_calls = response_dict["tool_calls"]
        function = tool_calls[0]
        function_name = function["function"]["name"]
        function_arguments = function["function"]["arguments"]

        execute(function_name, function_arguments)

# stop ollama server
if terminate:
    print("Stoping Ollama Server...")
    ollama_process.terminate()
    time.sleep(1)