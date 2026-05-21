import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pydantic import BaseModel

load_dotenv()

DATA_FILE_PATH = Path(__file__).parent / "data" / "portfolio_data.json"

# GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
#
# if GOOGLE_API_KEY:
#     client = genai.Client(api_key=GOOGLE_API_KEY)
# else:
#     print("WARNING: GOOGLE_API_KEY not found. AI features will fail.")
#     client = None

# load data -----------------------------------------------------------------------
try:
    with open(DATA_FILE_PATH, 'r') as f:
        PORTFOLIO_DATA = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    PORTFOLIO_DATA = {}

# api ---------------------------------------------------------------------------------
app = FastAPI(
    title="Portfolio Backend",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ThemeRequest(BaseModel):
    prompt: str

class ChatRequest(BaseModel):
    message: str

@app.get("/api/portfolio")
def get_portfolio_data():
    return PORTFOLIO_DATA

if __name__ == "__main__":
    uvicorn.run("index:app", host="0.0.0.0", port=8000, reload=True)