import os
import json
import re
from pathlib import Path
from typing import List, Literal, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
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
    description="Backend API for LegalEase — AI-powered legal document simplification and contract risk analysis",
    version="0.2.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permits requests from any local frontend port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- Models -----------------

class SimplifyRequest(BaseModel):
    text: str = Field(..., description="Raw legal text to be simplified")

class SimplifyResponse(BaseModel):
    simplified_text: str

class AnalyzeRequest(BaseModel):
    contract_text: str = Field(..., description="Full text of the contract or document to analyze")

class ClauseItem(BaseModel):
    severity: Literal["CRITICAL", "HIGH", "MEDIUM", "LOW"]
    clause_title: str
    original_text: str
    plain_english: str
    recommendation: str

class AnalyzeResponse(BaseModel):
    risk_score: int = Field(..., ge=0, le=100, description="Risk score from 0 to 100")
    risk_level: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    category: str
    title: str
    executive_summary: str
    clauses: List[ClauseItem]

# ----------------- Prompts & Helpers -----------------

SIMPLIFY_SYSTEM_PROMPT = (
    "Simplify this legal text into plain, easy-to-understand English. "
    "Preserve every fact, date, number, and obligation exactly as written. "
    "Do not add any information that isn't in the original text. "
    "Do not give legal advice or opinions — only rewrite for clarity."
)

ANALYSIS_PROMPT_TEMPLATE = """You are an expert legal contract analyst. Analyze the following contract text and return ONLY valid JSON (no markdown, no backticks, no preamble) in exactly this structure:
{{
  "risk_score": 0-100,
  "risk_level": "LOW" | "MEDIUM" | "HIGH",
  "category": "string, e.g. Independent Work / Rental Agreement / Employment",
  "title": "short document title",
  "executive_summary": "2-3 sentence plain-English summary highlighting the single biggest risk or concern",
  "clauses": [
    {{
      "severity": "CRITICAL" | "HIGH" | "MEDIUM" | "LOW",
      "clause_title": "short label, e.g. IP Transfer Before Payment",
      "original_text": "exact quoted text from the contract",
      "plain_english": "what this clause actually means in simple terms",
      "recommendation": "one actionable negotiating tip or next step"
    }}
  ]
}}

STRICT INSTRUCTIONS:
1. Only flag clauses that genuinely matter (don't invent risk in fair/standard clauses).
2. Never add facts, numbers, or obligations not present in the original text.
3. Quote original_text exactly as it appears in the source, don't paraphrase it.
4. This is NOT legal advice — say so is fine, but keep every clause explanation grounded strictly in the actual contract text.

CONTRACT TEXT TO ANALYZE:
{contract_text}
"""

def get_gemini_api_key() -> str:
    """Retrieve and validate Gemini API Key from environment or .env."""
    api_key = os.getenv("GEMINI_API_KEY", "")
    if not api_key or not api_key.strip() or api_key.strip() == "your_gemini_api_key_here":
        reload_env()
        api_key = os.getenv("GEMINI_API_KEY", "")

    api_key = api_key.strip().strip("'\"<>")

    if not api_key or api_key == "your_gemini_api_key_here":
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "GEMINI_API_KEY is not configured. "
                "Please open backend/.env, set GEMINI_API_KEY=..., save the file, and try again."
            )
        )
    return api_key

def extract_json_text(text: str) -> str:
    """Strip markdown code fences (e.g. ```json ... ``` or ``` ... ```) if present."""
    trimmed = text.strip()
    match = re.search(r"```(?:json)?\s*([\s\S]*?)\s*```", trimmed, re.IGNORECASE)
    if match:
        return match.group(1).strip()
    return trimmed

_RESOLVED_MODEL: Optional[str] = None

def call_gemini_generate(prompt: str, api_key: str) -> str:
    """Call Gemini API with model fallback handling (gemini-1.5-flash -> modern fallbacks)."""
    global _RESOLVED_MODEL
    genai.configure(api_key=api_key)

    preferred_model = os.getenv("GEMINI_MODEL", "gemini-3.6-flash")
    if _RESOLVED_MODEL:
        models_to_try = [_RESOLVED_MODEL]
    else:
        models_to_try = [preferred_model]
        for fb in ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"]:
            if fb not in models_to_try:
                models_to_try.append(fb)

    last_error = None
    for model_name in models_to_try:
        try:
            model = genai.GenerativeModel(
                model_name=model_name,
                generation_config={"response_mime_type": "application/json"}
            )
            response = model.generate_content(prompt)
            if response and response.text:
                _RESOLVED_MODEL = model_name
                return response.text
        except Exception as e:
            err_str = str(e)
            # If model is not found / deprecated (404/NotFound) or per-model quota exhausted, try next model
            if "404" in err_str or "NotFound" in err_str or "not found" in err_str or "no longer available" in err_str or ("429" in err_str and "PerModel" in err_str):
                last_error = e
                continue
            # For other errors (like project-wide rate limit or 401 auth), re-raise immediately
            raise e

    if last_error:
        raise last_error
    raise RuntimeError("Failed to generate response from Gemini API.")

# ----------------- Endpoints -----------------

@app.get("/")
def read_root():
    return {
        "project": "LegalEase",
        "status": "online",
        "endpoints": ["POST /analyze", "POST /simplify"]
    }

@app.post("/simplify", response_model=SimplifyResponse)
async def simplify(payload: SimplifyRequest):
    raw_text = payload.text.strip()
    if not raw_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Input text cannot be empty. Please provide legal text to simplify."
        )

    api_key = get_gemini_api_key()

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            model_name=os.getenv("GEMINI_MODEL", "gemini-flash-latest"),
            system_instruction=SIMPLIFY_SYSTEM_PROMPT
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
        if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Gemini API rate limit reached (free tier). Please wait a moment and retry."
            )
        if "API_KEY_INVALID" in error_message or "API key not valid" in error_message:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Gemini API key. Please check your key in backend/.env"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process text with Gemini API: {error_message}"
        )

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_contract(payload: AnalyzeRequest):
    raw_text = payload.contract_text.strip()
    if not raw_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contract text cannot be empty. Please paste your contract or agreement to analyze."
        )
    if len(raw_text) < 20:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Contract text is too short to analyze. Please provide a more complete agreement or clauses."
        )

    api_key = get_gemini_api_key()
    prompt = ANALYSIS_PROMPT_TEMPLATE.format(contract_text=raw_text)

    try:
        # 1. Call Gemini
        raw_output = call_gemini_generate(prompt, api_key)
        cleaned_json = extract_json_text(raw_output)

        # 2. Parse JSON with single retry on decode error
        try:
            parsed_data = json.loads(cleaned_json)
        except json.JSONDecodeError:
            retry_prompt = prompt + "\n\nCRITICAL: Your previous response was invalid JSON. Return ONLY raw valid JSON strictly conforming to the requested schema."
            raw_output = call_gemini_generate(retry_prompt, api_key)
            cleaned_json = extract_json_text(raw_output)
            parsed_data = json.loads(cleaned_json)

        # 3. Normalize & validate fields
        score_val = parsed_data.get("risk_score", 50)
        try:
            score = int(score_val)
        except (ValueError, TypeError):
            score = 50
        parsed_data["risk_score"] = max(0, min(100, score))

        level = str(parsed_data.get("risk_level", "MEDIUM")).upper()
        if level not in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]:
            level = "HIGH" if score >= 70 else ("MEDIUM" if score >= 35 else "LOW")
        parsed_data["risk_level"] = level

        parsed_data["category"] = str(parsed_data.get("category", "General Agreement"))
        parsed_data["title"] = str(parsed_data.get("title", "Analyzed Document"))
        parsed_data["executive_summary"] = str(parsed_data.get("executive_summary", "Document analyzed."))

        raw_clauses = parsed_data.get("clauses", [])
        validated_clauses = []
        if isinstance(raw_clauses, list):
            for c in raw_clauses:
                if not isinstance(c, dict):
                    continue
                sev = str(c.get("severity", "MEDIUM")).upper()
                if sev not in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]:
                    sev = "MEDIUM"
                validated_clauses.append({
                    "severity": sev,
                    "clause_title": str(c.get("clause_title", "Flagged Clause")),
                    "original_text": str(c.get("original_text", "")),
                    "plain_english": str(c.get("plain_english", "")),
                    "recommendation": str(c.get("recommendation", ""))
                })
        parsed_data["clauses"] = validated_clauses

        return AnalyzeResponse(**parsed_data)

    except HTTPException:
        raise
    except json.JSONDecodeError as jde:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gemini API returned malformed JSON that could not be parsed: {str(jde)}"
        )
    except Exception as e:
        error_message = str(e)
        print(f"[ERROR /analyze] Gemini call failed: {error_message}")
        if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Gemini API rate limit reached (5 requests/min on free tier). Please wait ~30 seconds and try again."
            )
        if "API_KEY_INVALID" in error_message or "API key not valid" in error_message:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Gemini API key. Please check your key in backend/.env"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to analyze contract: {error_message}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

