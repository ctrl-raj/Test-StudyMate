# -- API Server -- #

# Global Dependencies
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess, os, time, signal

class Product(BaseModel):
    prompt: str

app = FastAPI(title="StudyMate Chat Server")
ollamaProcess = None

# - CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500",
        "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# - manage ollama
@app.on_event("startup")
async def startOllama():
    global ollamaProcess
    ollamaProcess = subprocess.Popen(["ollama", "serve"])
    print("-Ollama Started-")

@app.on_event("shutdown")
async def stopOllama():
    if ollamaProcess:
        os.kill(ollamaProcess.pid, signal.SIGTERM)
        print("-Ollama Stopped")

# - Chat and Schedule
@app.get("/chat_response/{prompt}")
async def chatResponse(prompt: str):
    # - dependencies
    from chatscheduler import chatScheduler

    if prompt:
        data = list(chatScheduler(prompt))
        response = data[0]
        other = data[1]
        return {
            "response": response,
            "other": other
        }

# - Get Content
@app.post("/summeriser/")
async def summariser(file: UploadFile = File(...)):
    # - dependencies
    from contentSummariser import summariseOllama
    from PIL import Image
    import io

    content = await file.read()
    image = Image.open(io.BytesIO(content))

    response = summariseOllama(image)
    return response

# - Voice Chat
@app.post("/generateAudioResponse/")
async def generateAudioResponse(file: UploadFile = File(...)):
    # - dependencies
    import speechRecognition

    webm_content = await file.read()
    aiff_data_io = speechRecognition.blobToAIFF(webm_content)
