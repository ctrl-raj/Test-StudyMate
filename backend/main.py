from eventManager import *
import ollama
import subprocess
import time
import json 

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

# stop ollama server
if terminate:
    print("Stoping Ollama Server...")
    ollama_process.terminate()
    time.sleep(1)