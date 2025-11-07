# - Speech Recognition Scripts

# simple response cleaner
def clear_text(text: str):
    import emoji
    import re 

    text = emoji.replace_emoji(text, replace='')
    text = re.sub(r'[*_~`#]+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text

# webm(blob) to AIFF audio
def blobToAIFF(webmData: bytes):
    from pydub import AudioSegment
    import io
    
    temp_webm_file = io.BytesIO(webmData)
    audio_segment = AudioSegment.from_file(temp_webm_file, format="webm")
    aiff_output = io.BytesIO()
    audio_segment.export(aiff_output, format="aiff")
    aiff_output.seek(0)
    
    output_file_name = "aiff_audio_data.aiff"
    try:
        aiff_bytes = aiff_output()
        with open(output_file_name, "wb") as audioFile:
            audioFile.write(aiff_bytes)
        print(f"Saved as {output_file_name}")
        return output_file_name
    except Exception as e:
        print(f"Error Saving the AIFF File: {e}")

# speech to text script
async def speech_rec(filePath: str):
    import speech_recognition as sr
    
    r = sr.Recognizer()
    file = sr.AudioFile(filePath)
    with file as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
    
    return text

def getModelResponse(prompt):
    try:
        requests.get("http://localhost:11434/api/tags", timeout=3)
        print("✅ Ollama server is running")
    except requests.ConnectionError:
        print("❌ Ollama server is not running")
        raise ConnectionError("Ollama server is not running. Please start it with 'ollama serve'")
    
    client = ollama.Client()
    model = "maaya"

    response = client.generate(model=model, prompt=prompt)

    response = response.response
    response = clear_text(response)

    return response