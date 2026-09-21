import sys
import json
import time
from fastapi.testclient import TestClient
from main import app

# Ensure utf-8 stdout
sys.stdout.reconfigure(encoding='utf-8')

client = TestClient(app)

SAMPLE_FREELANCE_CONTRACT = """INDEPENDENT CONTRACTOR AGREEMENT

1. SERVICES AND COMPENSATION.
Contractor agrees to perform web application design and software engineering services. Client shall pay Contractor $8,000 upon successful milestone completion within 60 days of invoice receipt.

2. WORK FOR HIRE & INTELLECTUAL PROPERTY.
All materials, code, designs, and deliverables created by Contractor shall be deemed "Work Made for Hire". All title, ownership, copyright, and patent rights immediately vest in Client upon creation, regardless of whether payment has been remitted.

3. WARRANTIES AND REPRESENTATIONS.
Contractor warrants that all code provided is original and does not infringe upon any third-party patents or open-source licenses. Contractor shall personally indemnify Client against any third-party copyright claims.

4. TERMINATION FOR CONVENIENCE.
Client may terminate this Agreement at any time without cause upon 24 hours written notice. Upon termination, Contractor must cease all work and Client shall only pay for work accepted prior to notice.

5. NON-SOLICITATION & LIQUIDATED DAMAGES.
Contractor agrees not to solicit or perform services for any client or partner of Client during the term and for two (2) years thereafter. Violation of this clause shall result in liquidated damages of $25,000 per occurrence."""

def test_empty_input():
    print("--- Test 1: Empty text validation ---")
    resp = client.post("/analyze", json={"contract_text": ""})
    print(f"Status: {resp.status_code}, Body: {resp.json()}")
    assert resp.status_code == 400
    assert "empty" in resp.json()["detail"].lower()
    print("PASS: Empty text rejected correctly.")

def test_too_short_input():
    print("--- Test 2: Too-short text validation ---")
    resp = client.post("/analyze", json={"contract_text": "Short snippet"})
    print(f"Status: {resp.status_code}, Body: {resp.json()}")
    assert resp.status_code == 400
    assert "too short" in resp.json()["detail"].lower()
    print("PASS: Too-short text rejected correctly.")

def test_analyze_freelance_contract():
    print("--- Test 3: Live Gemini Analysis of Freelance Contract ---")
    resp = client.post("/analyze", json={"contract_text": SAMPLE_FREELANCE_CONTRACT})
    print(f"Status: {resp.status_code}")

    if resp.status_code == 429:
        print("INFO: Rate limit reached (429). Waiting 30 seconds to retry once...")
        time.sleep(30)
        resp = client.post("/analyze", json={"contract_text": SAMPLE_FREELANCE_CONTRACT})
        print(f"Retry Status: {resp.status_code}")

    if resp.status_code != 200:
        print(f"Error detail: {resp.json()}")
        raise AssertionError(f"Expected 200, got {resp.status_code}: {resp.text}")

    data = resp.json()
    print(f"Document Title: {data.get('title')}")
    print(f"Category: {data.get('category')}")
    print(f"Risk Score: {data.get('risk_score')}/100")
    print(f"Risk Level: {data.get('risk_level')}")
    print(f"Executive Summary: {data.get('executive_summary')}")
    print(f"Clauses count: {len(data.get('clauses', []))}")

    # Validate schema
    assert "risk_score" in data and 0 <= data["risk_score"] <= 100
    assert data["risk_level"] in ["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    assert "category" in data and len(data["category"]) > 0
    assert "title" in data and len(data["title"]) > 0
    assert "executive_summary" in data and len(data["executive_summary"]) > 0
    assert isinstance(data["clauses"], list) and len(data["clauses"]) > 0

    for idx, clause in enumerate(data["clauses"]):
        print(f"  Clause {idx+1}: [{clause.get('severity')}] {clause.get('clause_title')}")
        print(f"    Original: {clause.get('original_text')[:60]}...")
        print(f"    Plain English: {clause.get('plain_english')[:60]}...")
        print(f"    Tip: {clause.get('recommendation')[:60]}...")
        assert clause["severity"] in ["CRITICAL", "HIGH", "MEDIUM", "LOW"]
        assert len(clause["clause_title"]) > 0
        assert len(clause["original_text"]) > 0
        assert len(clause["plain_english"]) > 0
        assert len(clause["recommendation"]) > 0

    print("PASS: Freelance Contract analysis verified successfully.")

if __name__ == "__main__":
    test_empty_input()
    test_too_short_input()
    test_analyze_freelance_contract()
