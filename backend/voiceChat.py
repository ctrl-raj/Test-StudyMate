# - Speech Recognition Scripts

# Auto-detect and convert audio to WAV
async def blobToWAV(audioData: bytes):
    from pydub import AudioSegment
    import os
    import time
    import tempfile

    temp_dir = tempfile.gettempdir()
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

    # Save temporarily in system temp directory (avoid project/static to prevent watchers triggering reload)
    temp_file = os.path.join(temp_dir, f"temp_{int(time.time())}.{extension}")
    with open(temp_file, "wb") as f:
        f.write(audioData)

    print(f"DEBUG: File saved as {temp_file}, size: {os.path.getsize(temp_file)} bytes")

    # Convert to WAV
    audio = AudioSegment.from_file(temp_file, format=format_type)

    output_wav = os.path.join(temp_dir, f"temp_{int(time.time())}.wav")
    audio.export(output_wav, format="wav")

    # Clean up original temp file
    try:
        os.remove(temp_file)
    except Exception:
        pass

    print(f"Converted to WAV: {output_wav}")
    # Return basename so caller can use the temp dir to retrieve it
    return os.path.basename(output_wav)

# speech to text script
async def speechToText(filePath: str):
    import speech_recognition as sr
    import os
    import tempfile
    
    r = sr.Recognizer()
    temp_dir = tempfile.gettempdir()
    wav_path = os.path.join(temp_dir, filePath)

    with sr.AudioFile(wav_path) as source:
        r.adjust_for_ambient_noise(source, duration=0.5)
        audio = r.record(source)
        text = r.recognize_google(audio)

    # Clean up the audio file
    try:
        if os.path.exists(wav_path):
            os.remove(wav_path)
    except Exception:
        pass

    print(f"Transcription: {text}")
    return text

# generate model output
def getModelResponse(prompt: str):
    import ollama
    import json

    client = ollama.Client()
    model = "rookie"

    response = client.generate(model=model, prompt=prompt, keep_alive="1m")
    
    # Parse the model's JSON string response into a dict
    return json.loads(response.response)

# convert text to speech
async def textToSpeech(text: str, fileName):
    import edge_tts
    import tempfile
    import os
    tts = edge_tts.Communicate(text, voice="en-AU-WilliamNeural")
    temp_dir = tempfile.gettempdir()
    out_path = os.path.join(temp_dir, f"{fileName}.wav")
    await tts.save(out_path)
    # return basename so caller can construct URL to audio endpoint
    return os.path.basename(out_path)