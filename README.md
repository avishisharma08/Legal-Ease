# Legal-Ease IND ⚖️

> **Institutional Civic & Statutory Legal Intelligence Platform for India**  
> AI-powered legal document simplification, contract forensic risk audits, Bharatiya Nyaya Sanhita (BNS 2023) criminal code conversions, and statutory notice generation.

Co-developed with passion by **[Ayush Pandey (@ayush-3945)](https://github.com/ayush-3945)** and **[Avishi Sharma (@avishisharma08)](https://github.com/avishisharma08)**.

---

## 🌟 Core Features & Modules

### 1. 🛡️ Contract Forensic Risk Analyzer
* **Multi-Format Ingestion**: Upload `.pdf` (text & scanned OCR), `.jpg`, `.png`, or raw `.txt` legal agreements.
* **Algorithmic Risk Scoring**: Computes a 0–100 numerical Risk Score and classifies contract danger (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
* **Clause-by-Clause Forensic Audit**: Automatically detects predatory clauses like uncapped indemnity, pre-payment IP forfeiture, unilateral termination, and non-compete covenants in restraint of trade (Section 27, Indian Contract Act 1872).
* **Plain-English Explanations**: Converts convoluted legal terminology into simple, actionable plain English.
* **Pre-Loaded Sample Contracts**: 1-click test contracts for Freelance Work-for-Hire, Commercial Lease, NDA, and Employment.

### 2. ✍️ Redline Negotiation Studio & Counter-Offer Generator
* **Interactive Redline View**: Clearly delineates predatory terms with `[[DELETED: ...]]` and fair, reciprocal alternatives with `[[ADDED: ...]]`.
* **Clean Negotiated Counter-Offer**: Generates a clean, ready-to-execute fair contract draft.
* **Professional Cover Letter**: Crafts non-confrontational negotiation correspondence citing Indian Contract Act 1872 sections (Sec 27, Sec 73, Sec 74) and landmark Supreme Court precedents.

### 3. 🔍 "Ask Your Document" (Interactive Forensic Q&A)
* Conversational contract exploration strictly grounded in the uploaded document text.
* Zero-hallucination guarantee: quotes exact clause snippets and specifies contractual remedies.

### 4. ⚖️ Bharatiya Nyaya Sanhita (BNS 2023) Criminal Law Converter
* **New Criminal Laws (1 July 2024)**: Instant crosswalk between the repealed 164-year-old IPC 1860 and contemporary BNS 2023 sections.
* **1-Click Trending Quick Lookups**: Cheating (IPC 420 ➔ BNS 318), Murder (IPC 302 ➔ BNS 103), Defamation (IPC 499 ➔ BNS 356), Forgery (IPC 465 ➔ BNS 336), Theft (IPC 379 ➔ BNS 303), and Zero FIR.
* **Comparative Penalty & Classification**: Bailable vs Non-Bailable, Cognizable vs Non-Cognizable, and newly introduced Community Service penalties.
* **BNSS & BSA 2023 Procedural Safeguards**: Digital summons, Zero FIR filing, and mandatory forensic videography.
* **1-Click Legal Citation Copy**: Formatted for FIR drafts or court pleadings.

### 5. 📜 Bilingual Section 6(1) RTI Petition Generator
* **Right to Information Act, 2005**: Drafts legally rigorous RTI petitions to uncover public records.
* **Bilingual Engine**: Complete drafts in English or formal Shuddh Hindi (*सूचना का अधिकार अधिनियम, 2005 की धारा 6(1)*).
* **Statutory Compliance**: Enforces Section 7(1) mandatory 30-day response deadline and ₹10 statutory fee or BPL exemption under Section 7(5).
* **One-Click Export**: Ready for print and PDF generation.

### 6. 🏛️ Citizen Rights & Statutory Legal Notice Wizard
* **Customizable Ready-to-Serve Legal Notices**:
  * Unreturned Tenant Security Deposit (*Model Tenancy Act 2021*)
  * Defective Goods & Deficient Services (*Consumer Protection Act 2019*)
  * Unpaid Freelancer / Vendor Dues (*Section 73 Indian Contract Act 1872*)
  * Workplace Harassment & Unlawful Termination (*POSH Act 2013 / Industrial Disputes Act*)
* **Certified Digital Verification Stamp**: Official verifiable seal of authenticity.
* **Govt E-Filing Direct Gateway**: One-click routing to eCourts Services, NCLT Portal, e-Daakhil Consumer Commission, and RTI Online.

### 7. 📖 Indian Legal Jargon Simplifier & Dictionary
* 50+ curated Indian legal terms, Latin maxims, liability clauses, and dispute resolution definitions with real-world scenarios.
* Direct bridge to the AI Legal Assistant for instant interactive explanations.

### 8. 🤖 24/7 AI Legal Assistant
* Conversational legal advisor powered by Google Gemini and tailored to Indian constitutional and civil rights frameworks.
* Pre-seeded statutory consultation cards for instant legal inquiries.

### 9. 🚀 Hackathon & Judge Showcase Tools
* **1-Click Judge Demo Showcase Modal**: Pre-configured real-world demo scenarios for instant evaluation.
* **National Emergency & Legal Helplines Gateway**: Direct access to NALSA Free Legal Aid (15100), Consumer Helpline (1915), Cyber Crime (1930), and Women Helpline (181).

---

## 🏗️ Technical Architecture

* **Frontend**: React 18, Vite, Lucide Icons, Vanilla CSS Design System, Google Inter Typography.
* **Backend**: FastAPI (Python 3.10+), Uvicorn ASGI Server, Pydantic, python-dotenv.
* **AI Engine**: Google Gemini API (`google.generativeai` with multi-tier model fallbacks).
* **OCR & Document Extraction**: `pdfplumber`, `pytesseract` (Tesseract-OCR), and `PIL` (Pillow).
* **Deployment**: Frontend live on **Vercel**, Backend live on **Render**.

---

## 🚀 Getting Started Locally

### Prerequisites
* **Python**: 3.10+
* **Node.js**: 18+ (with npm)
* **Google Gemini API Key**: [Get a free API key at Google AI Studio](https://aistudio.google.com/)
* *(Optional)* **Tesseract OCR**: Required for image-based text extraction.

### 1. Backend Setup
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Set GEMINI_API_KEY=your_key in .env
python -m uvicorn main:app --reload --port 8000
```
* API root: `http://localhost:8000`
* Swagger docs: `http://localhost:8000/docs`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
* Frontend app: `http://localhost:5173`

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Service health status and registered endpoint index |
| `POST` | `/analyze` | Contract analysis: risk score, risk level, summary, clause breakdown |
| `POST` | `/simplify` | Plain-English legal clause simplification |
| `POST` | `/ask-doc` | Grounded, hallucination-free Q&A over active document text |
| `POST` | `/draft-rti` | Generates bilingual (English/Hindi) Section 6(1) RTI applications |
| `POST` | `/chat` | Conversational Legal Assistant powered by Gemini |
| `POST` | `/extract-text` | Multipart file text extraction (`.txt`, `.pdf`, `.jpg`, `.png` with OCR) |

---

## 📄 License & Attribution

Developed by **[Ayush Pandey (@ayush-3945)](https://github.com/ayush-3945)** and **[Avishi Sharma (@avishisharma08)](https://github.com/avishisharma08)**.  
Licensed under the [MIT License](LICENSE).
