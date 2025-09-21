import eventManager
import ollama
import subprocess
import time
import json 

# FUNCTION EXECUTER
def execute(name: dict, arguments: dict):
    try:
        if name == "getEvent":
            eventManager.getEvent()

        elif name == "checkEvent":
            eventManager.checkEvent(arguments["date"])
    
        elif name == "postEvent":
            title = arguments["event_title"]
            description = arguments["event_summary"]
            date = arguments["date"]
            recurrence = arguments["recurrence"]
            time = arguments["time"]

            eventManager.postEvent(title=title, description=description, date=date, recurrence_count=recurrence, time_hr=time)
    
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