# - Speech Recognition Scripts

# simple response cleaner
def clear_text(text: str):
    import emoji
    import re 

    text = emoji.replace_emoji(text, replace='')
    text = re.sub(r'[*_~`#]+', '', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text

# Auto-detect and convert audio to WAV
async def blobToWAV(audioData: bytes):
    from pydub import AudioSegment
    import os
    import time
    
    print(f"DEBUG: Received data length: {len(audioData)} bytes")
    print(f"DEBUG: First 20 bytes: {audioData[:20]}")
    
    if len(audioData) == 0:
        raise ValueError("No audio data received!")
    
    # Detect format from magic bytes
    if audioData[:4] == b'\x00\x00\x00\x20' or audioData[4:8] == b'ftyp':
        format_type = "mp4"
        extension = "m4a"
        print("Detected format: MP4/M4A")
    elif audioData[:4] == b'\x1a\x45\xdf\xa3':
        format_type = "webm"
        extension = "webm"
        print("Detected format: WebM")
    else:
        # Default to mp4
        format_type = "mp4"
        extension = "m4a"
        print("Unknown format, trying MP4")
    
    # Save temporarily
    temp_file = f"temp_{int(time.time())}.{extension}"
    with open(f"static/{temp_file}", "wb") as f:
        f.write(audioData)
    
    print(f"DEBUG: File saved as {temp_file}, size: {os.path.getsize(f"static/{temp_file}")} bytes")
    
    # Convert to WAV
    audio = AudioSegment.from_file(f"static/{temp_file}", format=format_type)
    
    output_wav = f"temp_{int(time.time())}.wav"
    audio.export(f"static/{output_wav}", format="wav")
    
    # Clean up
    os.remove(f"static/{temp_file}")
    
    print(f"Converted to WAV: {output_wav}")
    return output_wav

# speech to text script
async def speechToText(filePath: str):
    import speech_recognition as sr
    import os
    
    r = sr.Recognizer()
    with sr.AudioFile(f"static/{filePath}") as source:
        r.adjust_for_ambient_noise(source, duration=0.5)
        audio = r.record(source)
        text = r.recognize_google(audio)
    
    # Clean up the audio file
    if os.path.exists(f"static/{filePath}"):
        os.remove(f"static/{filePath}")
    
    print(f"Transcription: {text}")
    return text

# generate model output
def getModelResponse(prompt: str):
    import ollama

    client = ollama.Client()
    model = "rookie"

    response = client.generate(model=model, prompt=prompt, keep_alive="1m")

    response = response.response
    response = clear_text(response)

    return response

# convert text to speech
async def textToSpeech(text: str, fileName):
    import edge_tts
    tts = edge_tts.Communicate(text, voice="en-AU-WilliamNeural")
    await tts.save(f"static/{fileName}.wav")