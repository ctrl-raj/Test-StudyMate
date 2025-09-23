from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from main import chatScheduler

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
async def packResponse(prompt: str):
    response, other = chatScheduler(prompt)
    return {
        "response": response,
        "other": other
    }