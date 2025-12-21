import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai  # <<< NEW IMPORT
from google.genai import types # <<< NEW: For strict typing/config
from pydantic import BaseModel

# --- 1. SETUP ENV & AI ---
load_dotenv()

DATA_FILE_PATH = Path(__file__).parent / "data" / "portfolio_data.json"
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Initialize the new Client
if GOOGLE_API_KEY:
    client = genai.Client(api_key=GOOGLE_API_KEY)
else:
    print("WARNING: GOOGLE_API_KEY not found. AI features will fail.")
    client = None

# --- 2. LOAD DATA ---
try:
    with open(DATA_FILE_PATH, 'r') as f:
        PORTFOLIO_DATA = json.load(f)
except (FileNotFoundError, json.JSONDecodeError):
    PORTFOLIO_DATA = {}

# --- 3. APP SETUP ---
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

SYSTEM_PROMPT = """
You are a UI/UX design expert API that generates Tailwind CSS themes.
You will receive a user prompt describing a "vibe".

YOUR GOAL:
Return a valid JSON object strictly matching one of the two formats below.

OPTION 1: SUCCESS (Valid Style Request)
{
  "type": "theme",
  "data": {
    "colors": {
      "primary": "#HEXCODE",
      "primaryHover": "#HEXCODE",
      "secondary": "#HEXCODE",
      "secondaryHover": "#HEXCODE",
      "background": "#HEXCODE",
      "text": "#HEXCODE"
    },
    "borderRadius": "VALUE" 
  }
}

OPTION 2: FAILURE (Invalid Request)
{
  "type": "message",
  "content": "A short, polite error message."
}
"""

# --- 4. ENDPOINTS ---

@app.get("/api/health")
def read_health():
    return {"status": "ok"}

@app.get("/api/portfolio")
def get_portfolio_data():
    return PORTFOLIO_DATA

@app.post("/api/generate-theme")
async def generate_theme(request: ThemeRequest):
    if not client:
        raise HTTPException(status_code=500, detail="Server missing API Key")

    try:
        full_prompt = f"{SYSTEM_PROMPT}\n\nUSER REQUEST: \"{request.prompt}\""

        # NEW SDK CALL SYNTAX
        response = client.models.generate_content(
            model="gemini-2.0-flash", # or gemini-1.5-flash
            contents=full_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json"
            )
        )

        # In the new SDK, response.text is a property containing the string
        return json.loads(response.text)

    except Exception as e:
        print(f"Error generating theme: {e}")
        return {
            "type": "message",
            "content": "I'm having trouble connecting to the design brain right now. Please try again."
        }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)