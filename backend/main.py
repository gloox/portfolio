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
THEME_PROMPT_PATH = Path(__file__).parent / "data" / "theme_prompt.txt"
THEME_PROMPT = THEME_PROMPT_PATH.read_text()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if GOOGLE_API_KEY:
    client = genai.Client(api_key=GOOGLE_API_KEY)
else:
    print("WARNING: GOOGLE_API_KEY not found. AI features will fail.")
    client = None

# load data -----------------------------------------------------------------------
try:
    with open(DATA_FILE_PATH, 'r') as f:
        PORTFOLIO_DATA = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    PORTFOLIO_DATA = {}

# api ---------------------------------------------------------------------------------
app = FastAPI(
    title="Portfolio AI Backend (Phase 1)",
    version="1.0.0"
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

@app.post("/api/generate-theme")
async def generate_theme(request: ThemeRequest):
    if not client:
        raise HTTPException(status_code=500, detail="Server missing API Key")

    try:
        full_prompt = f"{THEME_PROMPT}\n\nUSER REQUEST: \"{request.prompt}\""

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=full_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )
        return json.loads(response.text)

    except Exception as e:
        print(f"generate theme error: {e}")
        return {
            "type": "message",
            "content": "I'm having trouble connecting. Please try again."
        }

@app.post("/api/chat")
async def chat_about_me(request: ChatRequest):
    if not client:
        raise HTTPException(status_code=500, detail="Server missing API Key")

    try:
        context_str = json.dumps(PORTFOLIO_DATA, indent=2)

        system_instruction = f"""
        You are an AI assistant representing {PORTFOLIO_DATA.get('personal', {}).get('firstName', 'the candidate')} on their portfolio website.
        Your goal is to get them hired.
        
        HERE IS THE CANDIDATE'S DATA:
        {context_str}
        
        RULES:
        - Answer questions honestly based on the data provided.
        - If the data doesn't contain the answer, say "I don't have that specific detail, but I can tell you about [related topic]."
        - Keep answers concise and professional but conversational.
        - If asked about weaknesses, spin them into areas of growth (but don't lie).
        """

        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"{system_instruction}\n\nUSER QUESTION: {request.message}",
            config=types.GenerateContentConfig(
                response_mime_type="text/plain"
            )
        )

        return {"reply": response.text}

    except Exception as e:
        print(f"Chat Error: {e}")
        return {"reply": "Sorry, an error occurred. Please try again later."}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)