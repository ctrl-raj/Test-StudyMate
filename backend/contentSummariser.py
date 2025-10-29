from PIL import Image
import pytesseract
import io
import ollama

client = ollama.Client()
model = "summariser"

def summariseOllama(image: Image.Image):
    text = pytesseract.image_to_string(image)

    response = client.generate(model=model, prompt=text)
    print("Summerising Content...")

    return response