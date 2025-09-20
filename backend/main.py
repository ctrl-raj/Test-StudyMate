from eventManager import *
import ollama
import edge_tts
import asyncio
import tempfile
from playsound import playsound
import os

import subprocess
import time

def start_ollama_server():
    try:
        print("Starting Ollama server...")
        process = subprocess.Popen(
            ["ollama", "serve"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL
        )
        print("Ollama server started. Waiting for it to become ready...")
        # Give the server a moment to boot up
        time.sleep(2) 
        return process
    except FileNotFoundError:
        print("Error: 'ollama' command not found. Please ensure Ollama is installed and in your system's PATH.")
        return None

if __name__ == "__main__":
    ollama_process = start_ollama_server()

    if ollama_process:
        print("Ollama server is running.")
        time.sleep(20)

        # To stop the server gracefully when your script finishes
        print("Stopping Ollama server...")
        ollama_process.terminate()
        ollama_process.wait() # Wait for the process to fully terminate
        print("Ollama server stopped.")

# Initialize the Ollama client
client = ollama.Client()

# Define the model and the input prompt
model = "rookie"  # Replace with your model name
print(f"{model} loaded...")

while True:
    prompt = input(">>> ") # is to be directed from frontend

    if prompt == "//bye":
        break
    else:
        response = client.generate(model=model, prompt=prompt)
        print(f"--{model} Responded--")
        responsetxt = response.response

        async def main():
            tts = edge_tts.Communicate(responsetxt, voice="en-GB-SoniaNeural")
    
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_audio:
                await tts.save(temp_audio.name)
                print("Cruie's Answer: 🔈")
                print(f"Response : {responsetxt}")
                playsound(temp_audio.name)
                os.remove(temp_audio.name)

        asyncio.run(main())

print("Stopping Ollama server...")
ollama_process.terminate()
ollama_process.wait() # Wait for the process to fully terminate
print("Ollama server stopped.")