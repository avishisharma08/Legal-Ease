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
from fastapi import UploadFile, File, HTTPException
import pdfplumber
import io
import pytesseract
from PIL import Image

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

import shutil

# Dynamic Tesseract OCR detection
def configure_tesseract():
    """Detect Tesseract executable across standard paths and environment variables."""
    custom_cmd = os.getenv("TESSERACT_CMD")
    if custom_cmd and os.path.isfile(custom_cmd):
        pytesseract.pytesseract.tesseract_cmd = custom_cmd
        return custom_cmd

    which_path = shutil.which("tesseract")
    if which_path:
        pytesseract.pytesseract.tesseract_cmd = which_path
        return which_path

    candidates = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
        os.path.expanduser(r"~\AppData\Local\Programs\Tesseract-OCR\tesseract.exe"),
        r"C:\LegalEase\tesseract.exe",
        str(BACKEND_DIR / "tesseract.exe")
    ]
    for candidate in candidates:
        if os.path.isfile(candidate):
            pytesseract.pytesseract.tesseract_cmd = candidate
            return candidate

    return None

TESSERACT_PATH = configure_tesseract()
if TESSERACT_PATH:
    print(f"[INFO] Tesseract OCR configured: {TESSERACT_PATH}")
else:
    print("[INFO] Tesseract OCR binary not found in standard paths. Text PDF/TXT extraction works normally; OCR requires Tesseract installation.")

app = FastAPI(
    title="LegalEase API",
    description="Backend API for LegalEase — AI-powered legal document simplification and contract risk analysis",
    version="0.3.0"
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

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"] = Field(..., description="Sender of the message")
    content: str = Field(..., description="Content of the message")

class ChatRequest(BaseModel):
    message: str = Field(..., description="User query or legal question")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Previous conversation turns for context")

class ChatResponse(BaseModel):
    response: str = Field(..., description="AI Legal Assistant response in Markdown")

class RTIDraftRequest(BaseModel):
    applicant_name: str = Field(..., description="Name of the RTI applicant")
    address: str = Field(..., description="Mailing address for communication")
    contact_info: Optional[str] = Field(default="", description="Email or phone number")
    public_authority: str = Field(..., description="Department or public authority name")
    authority_type: Literal["Central", "State", "Municipal", "Police", "Educational", "Other"] = "State"
    subject: str = Field(..., description="Subject matter of the information request")
    specific_queries: List[str] = Field(..., description="Numbered queries or documents requested")
    bpl_category: bool = Field(default=False, description="Whether applicant falls Below Poverty Line (fee exemption)")
    language: Literal["English", "Hindi"] = "English"

class RTIDraftResponse(BaseModel):
    formatted_application: str
    pio_designation: str
    filing_fee_note: str
    deadline_days: int
    first_appeal_authority: str

class AskDocRequest(BaseModel):
    document_text: str = Field(..., description="Full contract or document text")
    question: str = Field(..., description="Specific question about the document")
    history: Optional[List[ChatMessage]] = Field(default=[], description="Previous Q&A context")

class AskDocResponse(BaseModel):
    answer: str
    relevant_clause_snippet: Optional[str] = ""
    confidence: Literal["HIGH", "MEDIUM", "LOW"] = "HIGH"

# ----------------- Prompts & Helpers -----------------

SIMPLIFY_SYSTEM_PROMPT = (
    "Simplify this legal text into plain, easy-to-understand English. "
    "Preserve every fact, date, number, and obligation exactly as written. "
    "Do not add any information that isn't in the original text. "
    "Do not give legal advice or opinions — only rewrite for clarity."
)

RTI_SYSTEM_PROMPT = (
    "You are an expert civic transparency lawyer in India specializing in the Right to Information Act, 2005 (RTI Act 2005).\n"
    "Your job is to draft an impeccably worded, legally rigorous, and authoritative RTI application under Section 6(1) of the RTI Act 2005.\n"
    "Follow these strict drafting standards:\n"
    "1. Format with official header addressed to 'The Central Public Information Officer (CPIO)' or 'The State Public Information Officer (SPIO)'.\n"
    "2. Include proper statutory preamble citing Section 6(1) of the Right to Information Act, 2005.\n"
    "3. Structure the requested information into precise, unambiguous, numbered points (1., 2., 3., etc.). Use clear legal phrasing (e.g., 'Certified copy of...', 'Date-wise inspection of files relating to...', 'Attested records showing...').\n"
    "4. Cite Section 7(1) mandatory 30-day statutory response timeframe (or 48-hour timeframe if concerning life or liberty).\n"
    "5. Include declaration of Indian citizenship and statutory fee endorsement (Postal Order / Court Fee Stamp or BPL exemption under Section 7(5)).\n"
    "6. If the requested language is Hindi, generate the complete formal application in proper, official, clear Hindi (सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के तहत आवेदन)."
)

ASK_DOC_SYSTEM_PROMPT = (
    "You are an expert legal contract reader and rights advisor. "
    "The user will provide a contract or legal document along with a specific question.\n"
    "STRICT INSTRUCTIONS:\n"
    "1. Base your answer STRICTLY on the document text provided. Do not hallucinate or assume terms not in the document.\n"
    "2. If the document specifies a rule, date, penalty, or condition relating to the question, state it directly in plain English and quote the exact relevant sentence or clause.\n"
    "3. If the document DOES NOT mention or is silent on the requested matter, explicitly state: 'This document does not contain any specific clause regarding [topic]. In general legal practice...' and offer practical advice.\n"
    "4. Structure your response with: Direct Answer, Exact Excerpt/Clause, and Practical Takeaway."
)

LEGAL_ASSISTANT_SYSTEM_PROMPT = (
    "You are the Legal-Ease AI Assistant, an empowering, approachable, and highly knowledgeable legal educator and contract advisor. "
    "Your mission is to help freelancers, contractors, employees, tenants, and small businesses understand legal jargon, "
    "spot unfair clauses, and protect their rights.\n\n"
    "Guidelines:\n"
    "1. Explain complex legal concepts in crisp, easy-to-understand plain English.\n"
    "2. Highlight practical risks (e.g. uncapped indemnification, non-competes, pre-payment IP transfer, hidden termination penalties).\n"
    "3. Provide actionable negotiation tips and suggested clause rewrites whenever relevant.\n"
    "4. Use clear Markdown formatting with headers, bullet points, and callout quotes where helpful.\n"
    "5. Clearly state when appropriate that this guidance is informational and educational and does not constitute formal attorney-client legal advice."
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
        "endpoints": [
            "POST /analyze",
            "POST /simplify",
            "POST /chat",
            "POST /draft-rti",
            "POST /ask-doc",
            "POST /extract-text"
        ]
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

@app.post("/chat", response_model=ChatResponse)
async def chat_assistant(payload: ChatRequest):
    user_query = payload.message.strip()
    if not user_query:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User query cannot be empty. Please type your legal question."
        )

    api_key = get_gemini_api_key()

    # Format history context if provided
    history_lines = []
    if payload.history:
        for msg in payload.history[-6:]:  # Keep recent context
            speaker = "User" if msg.role == "user" else "Legal-Ease AI"
            history_lines.append(f"{speaker}: {msg.content}")

    context_str = ""
    if history_lines:
        context_str = "PREVIOUS CONVERSATION CONTEXT:\n" + "\n".join(history_lines) + "\n\n"

    prompt = (
        f"{context_str}"
        f"USER QUESTION: {user_query}\n\n"
        f"Provide a clear, practical, structured, and helpful response:"
    )

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel(
            model_name=os.getenv("GEMINI_MODEL", "gemini-flash-latest"),
            system_instruction=LEGAL_ASSISTANT_SYSTEM_PROMPT
        )
        response = model.generate_content(prompt)

        if not response or not response.text:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="Gemini API returned an empty response. Please try again."
            )

        return ChatResponse(response=response.text.strip())
    except HTTPException:
        raise
    except Exception as e:
        error_message = str(e)
        if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="Gemini API rate limit reached. Please wait ~30 seconds and retry."
            )
        if "API_KEY_INVALID" in error_message or "API key not valid" in error_message:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid Gemini API key. Please check your key in backend/.env"
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate answer: {error_message}"
        )

@app.post("/draft-rti", response_model=RTIDraftResponse)
async def draft_rti(payload: RTIDraftRequest):
    api_key = get_gemini_api_key()

    pio_title = "Central Public Information Officer (CPIO)" if payload.authority_type == "Central" else "State Public Information Officer (SPIO)"
    fee_note = "Below Poverty Line (BPL) - Fee Exempt under Section 7(5)" if payload.bpl_category else "Statutory Application Fee of Rs. 10 attached (via Indian Postal Order / Court Fee Stamp / Online Receipt)"
    first_appeal = f"First Appellate Authority (FAA), {payload.public_authority}"

    queries_text = "\n".join([f"{i+1}. {q}" for i, q in enumerate(payload.specific_queries)])

    prompt = (
        f"Draft a formal RTI Application in {payload.language} strictly conforming to Section 6(1) of the Right to Information Act, 2005.\n\n"
        f"APPLICANT DETAILS:\n"
        f"Name: {payload.applicant_name}\n"
        f"Address: {payload.address}\n"
        f"Contact: {payload.contact_info}\n\n"
        f"PUBLIC AUTHORITY & SUBJECT:\n"
        f"Department/Office: {payload.public_authority}\n"
        f"Authority Type: {payload.authority_type} ({pio_title})\n"
        f"Subject Matter: {payload.subject}\n\n"
        f"SPECIFIC QUERIES / INFORMATION SOUGHT:\n"
        f"{queries_text}\n\n"
        f"FEE STATUS:\n"
        f"{fee_note}\n\n"
        f"Generate the full, complete, professionally formatted RTI application letter ready to sign, date, and file."
    )

    try:
        genai.configure(api_key=api_key)
        preferred_model = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
        model = genai.GenerativeModel(
            model_name=preferred_model,
            system_instruction=RTI_SYSTEM_PROMPT
        )
        response = model.generate_content(prompt)

        if not response or not response.text:
            raise HTTPException(status_code=502, detail="Gemini returned empty RTI draft. Please try again.")

        return RTIDraftResponse(
            formatted_application=response.text.strip(),
            pio_designation=pio_title,
            filing_fee_note=fee_note,
            deadline_days=30,
            first_appeal_authority=first_appeal
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            raise HTTPException(status_code=429, detail="AI rate limit reached. Please wait ~30 seconds and retry.")
        raise HTTPException(status_code=500, detail=f"Failed to draft RTI: {error_msg}")

@app.post("/ask-doc", response_model=AskDocResponse)
async def ask_doc(payload: AskDocRequest):
    doc = payload.document_text.strip()
    q = payload.question.strip()
    if not doc:
        raise HTTPException(status_code=400, detail="Document text cannot be empty.")
    if not q:
        raise HTTPException(status_code=400, detail="Question cannot be empty. Please ask a question about the document.")

    api_key = get_gemini_api_key()

    history_str = ""
    if payload.history:
        for h in payload.history[-4:]:
            spk = "User" if h.role == "user" else "Legal Assistant"
            history_str += f"{spk}: {h.content}\n"

    prompt = (
        f"DOCUMENT CONTENT:\n\"\"\"\n{doc}\n\"\"\"\n\n"
        f"{'PREVIOUS Q&A CONTEXT:\n' + history_str + '\n' if history_str else ''}"
        f"USER QUESTION: {q}\n\n"
        f"Answer clearly and directly based strictly on the document content above:"
    )

    try:
        genai.configure(api_key=api_key)
        preferred_model = os.getenv("GEMINI_MODEL", "gemini-flash-latest")
        model = genai.GenerativeModel(
            model_name=preferred_model,
            system_instruction=ASK_DOC_SYSTEM_PROMPT
        )
        response = model.generate_content(prompt)

        if not response or not response.text:
            raise HTTPException(status_code=502, detail="Gemini returned empty answer. Please try again.")

        return AskDocResponse(
            answer=response.text.strip(),
            confidence="HIGH"
        )
    except HTTPException:
        raise
    except Exception as e:
        error_msg = str(e)
        if "429" in error_msg or "RESOURCE_EXHAUSTED" in error_msg:
            raise HTTPException(status_code=429, detail="AI rate limit reached. Please wait ~30 seconds and retry.")
        raise HTTPException(status_code=500, detail=f"Failed to answer question: {error_msg}")

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
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Max size is 10MB.")

    filename = file.filename.lower()

    if filename.endswith(".txt"):
        try:
            extracted_text = contents.decode("utf-8")
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Could not read text file. Please check the file encoding.")

        return {"extracted_text": extracted_text, "source_type": "text"}

    elif filename.endswith(".pdf"):
        try:
            extracted_text = ""
            with pdfplumber.open(io.BytesIO(contents)) as pdf:
                for page in pdf.pages:
                    page_text = page.extract_text()
                    if page_text:
                        extracted_text += page_text + "\n"
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not read PDF file: {str(e)}")

        # Fallback to OCR if no text was extracted (likely a scanned PDF)
        if not extracted_text.strip():
            if not TESSERACT_PATH:
                raise HTTPException(
                    status_code=422,
                    detail="This PDF appears to be a scanned image, and Tesseract OCR is not installed or detected. Please install Tesseract OCR and set TESSERACT_CMD in backend/.env, or paste the text directly."
                )
            try:
                ocr_text = ""
                with pdfplumber.open(io.BytesIO(contents)) as pdf:
                    for page in pdf.pages:
                        page_image = page.to_image(resolution=300).original
                        ocr_text += pytesseract.image_to_string(page_image) + "\n"
                extracted_text = ocr_text
            except pytesseract.TesseractNotFoundError:
                raise HTTPException(
                    status_code=422,
                    detail="Tesseract OCR binary was not found. Please install Tesseract OCR and configure TESSERACT_CMD in backend/.env."
                )
            except Exception as e:
                raise HTTPException(status_code=422, detail=f"Could not extract text via OCR: {str(e)}")

        if not extracted_text.strip():
            raise HTTPException(
                status_code=422,
                detail="Could not extract readable text from this file, please try a clearer scan or paste the text manually."
            )

        return {"extracted_text": extracted_text.strip(), "source_type": "pdf"}

    elif filename.endswith((".jpg", ".jpeg", ".png")):
        if not TESSERACT_PATH:
            raise HTTPException(
                status_code=422,
                detail="Image text extraction requires Tesseract OCR, which is not detected. Please install Tesseract OCR and set TESSERACT_CMD in backend/.env, or paste the contract text directly."
            )
        try:
            image = Image.open(io.BytesIO(contents))
            extracted_text = pytesseract.image_to_string(image)
        except pytesseract.TesseractNotFoundError:
            raise HTTPException(
                status_code=422,
                detail="Tesseract OCR binary was not found. Please install Tesseract OCR and configure TESSERACT_CMD in backend/.env."
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Could not process image: {str(e)}")

        if not extracted_text.strip():
            raise HTTPException(
                status_code=422,
                detail="Could not extract readable text from this image, please try a clearer scan or paste the text manually."
            )

        return {"extracted_text": extracted_text.strip(), "source_type": "ocr"}

    else:
        raise HTTPException(
            status_code=400,
            detail="Unsupported file type. Please upload a .txt, .pdf, .jpg, or .png file."
        )
        
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)

