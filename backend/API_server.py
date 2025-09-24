from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

#scripts
from backend.scripts.chatscheduler import chatScheduler
from backend.scripts.flashcardsGen import GenFlashcards

class Product(BaseModel):
    prompt: str

app = FastAPI(title="StudyMate Chat Server")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # 127.0.0.1:5500/frontend/public/index.html
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/chat_response/{prompt}")
async def chatResponse(prompt: str):
    response, other = chatScheduler(prompt)
    return {
        "response": response,
        "other": other
    }

@app.get("/flashcards/{subject}")
def genFlashcards(subject: str):
    response = GenFlashcards(subject=subject)
    flashcards = response["flashcards"]
    
    return flashcards