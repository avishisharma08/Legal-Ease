# LegalEase

AI-powered legal document simplification and rights assistance platform.

## Current Stage: MVP (Step 1-6)

### 1. Backend Setup (FastAPI)
1. Open a terminal and navigate to `C:\LegalEase\backend`:
   ```bash
   cd C:\LegalEase\backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Add your Google Gemini API key to [backend/.env](file:///C:/LegalEase/backend/.env):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. Start the FastAPI server:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```
   API will be live at: `http://localhost:8000` (docs at `http://localhost:8000/docs`).

### 2. Frontend Setup (React)
1. Open another terminal and navigate to `C:\LegalEase\frontend`:
   ```bash
   cd C:\LegalEase\frontend
   npm install
   npm run dev
   ```
   Access the frontend at `http://localhost:3000`.
   *(Alternatively, open [frontend/test.html](file:///C:/LegalEase/frontend/test.html) directly in any browser for instant testing).*
