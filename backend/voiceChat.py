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
async def blobToAIFF(webmData: bytes):
    from pydub import AudioSegment
    import io
    
    temp_webm_file = io.BytesIO(webmData)
    audio_segment = AudioSegment.from_file(temp_webm_file, format="webm")
    aiff_output = io.BytesIO()
    audio_segment.export(aiff_output, format="aiff")
    aiff_output.seek(0)
    
    output_file_name = "aiff_audio_data.aiff"
    
    aiff_bytes = aiff_output.read()
    with open(output_file_name, "wb") as audioFile:
        audioFile.write(aiff_bytes)
    print(f"Saved as {output_file_name}")
    return output_file_name

# speech to text script
async def speechToText(filePath: str):
    import speech_recognition as sr
    import os
    
    r = sr.Recognizer()
    file = sr.AudioFile(filePath)
    with file as source:
        audio = r.record(source)
        text = r.recognize_google(audio)
    if os.path.exists(filePath): # deletes the byte audio file
        os.remove(filePath)
    return text

# generate model output
def getModelResponse(prompt: str):
    import ollama

    client = ollama.Client()
    model = "maaya"

    response = client.generate(model=model, prompt=prompt)

    response = response.response
    response = clear_text(response)

    return response

# convert text to speech
async def textToSpeech(text: str, fileName):
    import edge_tts
    tts = edge_tts.Communicate(text, voice="en-AU-WilliamNeural")
    await tts.save(f"static/{fileName}.wav")