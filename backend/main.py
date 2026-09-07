from curses import flash
import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from pathlib import Path
from dotenv import load_dotenv
import google.generativeai as genai

# Resolve the backend directory path to reliably find .env regardless of working directory
BACKEND_DIR = Path(__file__).resolve().parent
ENV_FILE = BACKEND_DIR / ".env"
ROOT_ENV_FILE = BACKEND_DIR.parent / ".env"

def reload_env():
    """Load .env from backend directory or project root."""
    if ENV_FILE.exists():
        load_dotenv(dotenv_path=ENV_FILE, override=True)
    if ROOT_ENV_FILE.exists():
        load_dotenv(dotenv_path=ROOT_ENV_FILE, override=True)
    load_dotenv(override=True)

# Initial load
reload_env()

app = FastAPI(
    title="LegalEase API",
    description="Backend API for LegalEase — AI-powered legal document simplification and rights assistance",
    version="0.1.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits requests from any local frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimplifyRequest(BaseModel):
    text: str = Field(..., description="Raw legal text to be simplified")

class SimplifyResponse(BaseModel):
    simplified_text: str

SYSTEM_PROMPT = (
    "Simplify this legal text into plain, easy-to-understand English. "
    "Preserve every fact, date, number, and obligation exactly as written. "
    "Do not add any information that isn't in the original text. "
    "Do not give legal advice or opinions — only rewrite for clarity."
)

@app.get("/")
def read_root():
    return {
        "project": "LegalEase",
        "status": "online",
        "endpoint": "POST /simplify"
    }

@app.post("/simplify", response_model=SimplifyResponse)
async def simplify(payload: SimplifyRequest):
    # 1. Validate empty or whitespace input
    raw_text = payload.text.strip()
    if not raw_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Input text cannot be empty. Please provide legal text to simplify."
        )

    # 2. Check for Gemini API key (reload in case .env was saved while server is running)
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key or not api_key.strip() or api_key.strip() == "your_gemini_api_key_here":
        reload_env()
        api_key = os.getenv("GEMINI_API_KEY", "")

    # Clean up any surrounding quotes or brackets user might have entered
    api_key = api_key.strip().strip("'\"<>")

    if not api_key or api_key == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "GEMINI_API_KEY is not configured or still empty. "
                "Please open C:\\LegalEase\\backend\\.env, add your key (e.g. GEMINI_API_KEY=AIzaSy...), "
                "save the file, and try again."
            )
        )

    # 3. Call Google Gemini API
    try:
        genai.configure(api_key=api_key.strip())
        
        # Configure model with system instructions
        model = genai.GenerativeModel(
            model_name="gemini-3.6-flash",
            system_instruction=SYSTEM_PROMPT
        )
        
        response = model.generate_content(raw_text)

        if not response or not response.text:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Gemini API returned an empty response. Please try again."
            )

        return SimplifyResponse(simplified_text=response.text.strip())

    except HTTPException:
        raise
    except Exception as e:
        error_message = str(e)
        
        # Handle Rate Limits (429)
        if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Gemini API rate limit reached. Please wait a moment and retry."
            )
        
        # Handle Authentication / Invalid Key errors
        if "API_KEY_INVALID" in error_message or "API key not valid" in error_message:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Gemini API key. Please check your key in backend/.env"
            )

        # General failure fallback
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process text with Gemini API: {error_message}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
