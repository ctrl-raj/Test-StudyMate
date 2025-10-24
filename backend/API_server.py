# -- API Server -- #

# Dependencies
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import subprocess, os, time, signal

# Scripts
from chatscheduler import chatScheduler

class Product(BaseModel):
    prompt: str

app = FastAPI(title="StudyMate Chat Server")
ollamaProcess = None

# - CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # 127.0.0.1:5500/frontend/public/index.html
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
        os.kill(ollama_proc.pid, signal.SIGTERM)
        print("-Ollama Stopped")

# - Chat and Schedule
@app.get("/chat_response/{prompt}")
async def chatResponse(prompt: str):
    if prompt:
        response, other = await chatScheduler(prompt)
        return {
            "response": response,
            "other": other
        }

# - Get Flashcards
@app.get("/flashcards/{subject}")
def genFlashcards(subject: str):
    if subject:
        response = GenFlashcards(subject=subject)
        flashcards = response["flashcards"]
        
        return flashcards