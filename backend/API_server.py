# -- API Server -- #

# Dependencies
from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess, os, time, signal
import io
from PIL import Image

# Scripts
from chatscheduler import chatScheduler
from contentSummariser import summariseOllama

class Product(BaseModel):
    prompt: str

app = FastAPI(title="StudyMate Chat Server")
ollamaProcess = None

# - CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
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
    content = await file.read()
    image = Image.open(io.BytesIO(content))

    response = summariseOllama(image)
    return response