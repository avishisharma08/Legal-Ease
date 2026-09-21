# Legal-Ease AI

AI-powered legal document simplification, contract risk detection, and rights assistance platform.

Co-developed by [Avishi Sharma (@avishisharma08)](https://github.com/avishisharma08) and [Ayush Pandey (@ayush-3945)](https://github.com/ayush-3945).

---

## 🌟 Core Features

1. **Contract Risk Analyzer**:
   - Paste contracts or upload documents (`.pdf`, `.txt`, `.png`, `.jpg`).
   - Generates an overall Risk Score (0–100) and Risk Level (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
   - Identifies red-flag clauses, translates legalese into plain English, and provides actionable negotiation recommendations.
   - Pre-loaded sample contracts: Freelance Work-for-Hire, Commercial Lease, NDA, Employment Agreement.
2. **Legal Jargon Simplifier**:
   - Searchable legal dictionary covering 50+ terms, Latin maxims, liability clauses, and dispute resolution definitions with real-world scenarios.
3. **AI Legal Assistant**:
   - Conversational AI legal advisor powered by Google Gemini.
   - Ask clarifying questions about contract language, rights protection, and negotiating leverage in real time.
4. **Balanced Template Generator**:
   - Interactive document generator for NDAs, Freelance Agreements, and Advisory Agreements with customizable liability caps and payment terms.

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18+ (with npm)
- **Google Gemini API Key**: [Get a free API key at Google AI Studio](https://aistudio.google.com/)
- *(Optional)* **Tesseract OCR**: Required only for scanned image/PDF text extraction. Can be installed via `winget install UB-Mannheim.TesseractOCR` or downloaded from GitHub.

---

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
   Open `backend/.env` and insert your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-flash-latest
   # Optional: Path to Tesseract OCR binary if not in PATH
   # TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```

4. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
   * API root: `http://localhost:8000`
   * Interactive OpenAPI docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup (React + Vite)

1. Open a second terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```
# Legal-Ease AI

AI-powered legal document simplification, contract risk detection, and rights assistance platform.

Co-developed by [Avishi Sharma (@avishisharma08)](https://github.com/avishisharma08) and [Ayush Pandey (@ayush-3945)](https://github.com/ayush-3945).

---

## 🌟 Core Features

1. **Contract Risk Analyzer**:
   - Paste contracts or upload documents (`.pdf`, `.txt`, `.png`, `.jpg`).
   - Generates an overall Risk Score (0–100) and Risk Level (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
   - Identifies red-flag clauses, translates legalese into plain English, and provides actionable negotiation recommendations.
   - Pre-loaded sample contracts: Freelance Work-for-Hire, Commercial Lease, NDA, Employment Agreement.
2. **Legal Jargon Simplifier**:
   - Searchable legal dictionary covering 50+ terms, Latin maxims, liability clauses, and dispute resolution definitions with real-world scenarios.
3. **AI Legal Assistant**:
   - Conversational AI legal advisor powered by Google Gemini.
   - Ask clarifying questions about contract language, rights protection, and negotiating leverage in real time.
4. **Balanced Template Generator**:
   - Interactive document generator for NDAs, Freelance Agreements, and Advisory Agreements with customizable liability caps and payment terms.

---

## 🚀 Getting Started

### Prerequisites
- **Python**: 3.10+
- **Node.js**: 18+ (with npm)
- **Google Gemini API Key**: [Get a free API key at Google AI Studio](https://aistudio.google.com/)
- *(Optional)* **Tesseract OCR**: Required only for scanned image/PDF text extraction. Can be installed via `winget install UB-Mannheim.TesseractOCR` or downloaded from GitHub.

---

### 1. Backend Setup (FastAPI)

1. Open a terminal and navigate to `backend`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create your `.env` configuration:
   ```bash
   cp .env.example .env
   ```
   Open `backend/.env` and insert your Gemini API key:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-flash-latest
   # Optional: Path to Tesseract OCR binary if not in PATH
   # TESSERACT_CMD=C:\Program Files\Tesseract-OCR\tesseract.exe
   ```

4. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
   * API root: `http://localhost:8000`
   * Interactive OpenAPI docs: `http://localhost:8000/docs`

---

### 2. Frontend Setup (React + Vite)

1. Open a second terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open the application in your browser (`http://localhost:5173`).

---

## 📡 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Service health status and list of active endpoints |
| `POST` | `/analyze` | Contract analysis: risk score, risk level, summary, clause breakdown |
| `POST` | `/simplify` | Plain-English legal clause simplification |
| `POST` | `/ask-doc` | Grounded, hallucination-free Q&A over active document text |
| `POST` | `/draft-rti` | Generates bilingual (English/Hindi) Section 6(1) RTI applications |
| `POST` | `/chat` | Conversational Legal Assistant powered by Gemini |
| `POST` | `/extract-text` | Multipart file text extraction (`.txt`, `.pdf`, `.jpg`, `.png` with OCR) |

---

## 🧪 Running Backend Tests

Run the automated test suite with backoff handling:
```bash
cd backend
python test_analyze.py
```
