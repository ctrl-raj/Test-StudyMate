# -- SCRIPT -- #

# Dependencies
import ollama
import json

client = ollama.Client()
model = "flashua"

def GenFlashcards(subject: str):
    response = client.generate(model=model, prompt=subject)
    response_str = response.response

    # convert into dictionary
    response_dict = json.loads(response_str)

    return response_dict