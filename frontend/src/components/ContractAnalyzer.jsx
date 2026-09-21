import React, { useState } from 'react';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';
import { 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  Zap,
  ArrowRight,
  MessageSquareText,
  Shield,
  Scale,
  UploadCloud,
  FileCheck
} from 'lucide-react';

export default function ContractAnalyzer({ onAskAssistant }) {
  const [selectedSampleId, setSelectedSampleId] = useState('sample-freelance');
  const [contractText, setContractText] = useState(SAMPLE_CONTRACTS[1].fullText);
  const [expandedClauseId, setExpandedClauseId] = useState('fc2');
  const [copied, setCopied] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [liveAnalysis, setLiveAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);

  // Document-specific Q&A State
  const [docQuestion, setDocQuestion] = useState('');
  const [isAskingDoc, setIsAskingDoc] = useState(false);
  const [docQnAList, setDocQnAList] = useState([]);
  const [showDocQnA, setShowDocQnA] = useState(false);

  const activeSample = SAMPLE_CONTRACTS.find(s => s.id === selectedSampleId) || SAMPLE_CONTRACTS[0];
  const analysis = liveAnalysis || activeSample;

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setContractText(sample.fullText);
    setLiveAnalysis(null);
    setError('');
    setDocQnAList([]);
    setExpandedClauseId(sample.clauses[0]?.id || '');
  };

  const handleReanalyze = async () => {
    const textToAnalyze = contractText.trim();
    if (!textToAnalyze) {
      setError('Please paste or select a contract to analyze.');
      return;
    }
    if (textToAnalyze.length < 20) {
      setError('Contract text is too short to analyze. Please provide a more complete agreement or clauses.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ contract_text: textToAnalyze })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Analysis failed with status ${response.status}`);
      }

      const normalizeRisk = (lvl) => {
        if (!lvl) return 'Medium';
        const str = String(lvl).toLowerCase();
        if (str === 'critical') return 'Critical';
        if (str === 'high') return 'High';
        if (str === 'low') return 'Low';
        return 'Medium';
      };

      const formattedClauses = (data.clauses || []).map((c, index) => ({
        id: `clause-${index}`,
        title: c.clause_title || 'Flagged Clause',
        risk: normalizeRisk(c.severity),
        originalText: c.original_text || '',
        simplifiedText: c.plain_english || '',
        recommendation: c.recommendation || ''
      }));

      const formattedAnalysis = {
        id: 'live-' + Date.now(),
        title: data.title || 'Analyzed Agreement',
        category: data.category || 'General Agreement',
        overallRisk: normalizeRisk(data.risk_level),
        riskScore: typeof data.risk_score === 'number' ? data.risk_score : 50,
        summary: data.executive_summary || '',
        clauses: formattedClauses
      };

      setLiveAnalysis(formattedAnalysis);
      if (formattedClauses.length > 0) {
        setExpandedClauseId(formattedClauses[0].id);
      }
    } catch (err) {
      console.error('Contract analysis error:', err);
      setError(err.message || 'Failed to connect to backend at http://localhost:8000/analyze');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopySummary = () => {
    const textToCopy = `[Legal-Ease Risk Report]\nContract: ${analysis.title}\nRisk Level: ${analysis.overallRisk} (${analysis.riskScore}/100)\n\nExecutive Summary:\n${analysis.summary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAskDocument = async (questionToAsk) => {
    const q = questionToAsk || docQuestion;
    if (!q.trim() || isAskingDoc) return;

    if (!contractText.trim()) {
      setError('Please paste or upload a document first before asking questions.');
      return;
    }

    setIsAskingDoc(true);
    setShowDocQnA(true);
    const userQ = q.trim();
    if (!questionToAsk) setDocQuestion('');

    try {
      const response = await fetch('http://localhost:8000/ask-doc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          document_text: contractText,
          question: userQ
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Failed to answer question about document.');

      setDocQnAList(prev => [
        ...prev,
        {
          id: Date.now(),
          question: userQ,
          answer: data.answer
        }
      ]);
    } catch (err) {
      console.warn('Ask doc failed, providing client guidance:', err);
      setDocQnAList(prev => [
        ...prev,
        {
          id: Date.now(),
          question: userQ,
          answer: `Could not retrieve live answer: ${err.message}. Ensure backend is running and GEMINI_API_KEY is configured in backend/.env.`
        }
      ]);
    } finally {
      setIsAskingDoc(false);
    }
  };

  // SVG Gauge calculations
  const radius = 32;
  const circumference = 2 * Math.PI * radius; // ~201.06
  const scorePercent = Math.min(Math.max(analysis.riskScore || 0, 0), 100);
  const strokeDashoffset = circumference - (circumference * scorePercent) / 100;

  const getGaugeColor = (risk) => {
    switch (risk) {
      case 'Critical': return '#f43f5e';
      case 'High': return '#f97316';
      case 'Medium': return '#eab308';
      case 'Low': return '#10b981';
      default: return '#3b82f6';
    }
  };

  const gaugeColor = getGaugeColor(analysis.overallRisk);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Scale size={14} className="hero-pill-icon" />
          <span>Statutory Contractual Risk & Clause Intelligence</span>
        </div>
        <h1 className="hero-title">
          Deconstruct Complex Agreements with <span className="hero-gradient-text">Absolute Clarity</span>.
        </h1>
        <p className="hero-subtitle">
          Identify predatory red flags, uncapped liabilities, unfair IP forfeiture, and restrictive covenants before signing.
        </p>
        
        {/* Unified Institutional Trust Ribbon */}
        <div className="trust-ribbon">
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Indian Contract Act 1872 Compliant</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Clause-by-Clause Forensic Audit</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Plain-English Translation</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Direct Document Grounded Q&A</span>
          </div>
        </div>
      </section>

      {/* Main Analyzer Grid */}
      <div className="analyzer-grid">
        {/* Left Side: Editor & Sample Selector */}
        <div className="glass-panel editor-card">
          <div className="sample-selector">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="selector-label">Load Preset Agreement:</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Click to load sample contract
              </span>
            </div>
            <div className="sample-buttons">
              {SAMPLE_CONTRACTS.map((sample) => (
                <button
                  key={sample.id}
                  className={`sample-btn ${selectedSampleId === sample.id ? 'selected' : ''}`}
                  onClick={() => handleSelectSample(sample)}
                >
                  <FileText size={13} style={{ marginRight: '5px' }} />
                  {sample.title.split('(')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="selector-label">Contract / Agreement Text:</span>
            <span className="character-count-pill">
              {contractText.length.toLocaleString()} characters
            </span>
          </div>

          <textarea
            className="contract-textarea scroller"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste your legal agreement, vendor contract, tenancy deed, or freelance terms here..."
          />

          <div className="action-buttons-row">
            <button
              className="btn-primary"
              style={{ flex: 1.2, minWidth: '170px' }}
              onClick={handleReanalyze}
              disabled={isAnalyzing || isExtracting}
            >
              <Zap size={16} /> 
              <span>{isAnalyzing ? 'Analyzing Statutory Clauses...' : 'Analyze Document'}</span>
            </button>

            <button
              className={`btn-secondary ${showDocQnA ? 'active-toggle' : ''}`}
              onClick={() => setShowDocQnA(!showDocQnA)}
            >
              <MessageSquareText size={15} color={showDocQnA ? '#93c5fd' : 'var(--text-secondary)'} /> 
              <span>{showDocQnA ? 'Close Doc Q&A' : 'Ask AI About Doc'}</span>
            </button>

            <input
              type="file"
              id="fileUpload"
              accept=".txt,.pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                setUploadedFileName(file.name);
                setIsExtracting(true);
                setError('');
                const formData = new FormData();
                formData.append('file', file);
                try {
                  const response = await fetch('http://localhost:8000/extract-text', {
                    method: 'POST',
                    body: formData,
                  });
                  const data = await response.json();
                  if (!response.ok) {
                    throw new Error(data.detail || 'Failed to extract text from file.');
                  }
                  setContractText(data.extracted_text);
                } catch (err) {
                  setError(err.message);
                  setUploadedFileName('');
                } finally {
                  setIsExtracting(false);
                }
              }}
            />

            <button
              className="btn-secondary"
              onClick={() => document.getElementById('fileUpload').click()}
              disabled={isAnalyzing}
              title="Upload PDF, Image (OCR), or Text file"
            >
              <UploadCloud size={15} /> 
              <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {isExtracting ? 'Extracting OCR...' : uploadedFileName ? uploadedFileName : 'Upload Doc'}
              </span>
            </button>

            <button
              className="btn-ghost"
              onClick={() => {
                setContractText('');
                setError('');
                setDocQnAList([]);
              }}
              disabled={isAnalyzing}
              title="Clear editor text"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="error-banner">
              <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Interactive Document Q&A Panel */}
          {showDocQnA && (
            <div className="doc-qna-panel">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> Grounded Document Q&A
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Strictly answers from active agreement text
                </span>
              </div>

              {/* Preset Document Questions */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[
                  'What are my payment terms & deadlines?',
                  'Can this agreement be terminated early?',
                  'Who owns the IP and copyright created?',
                  'Are there any penalties or uncapped liabilities?'
                ].map((presetQ, idx) => (
                  <button
                    key={idx}
                    className="doc-qna-chip"
                    onClick={() => handleAskDocument(presetQ)}
                  >
                    <span>🔍</span> {presetQ}
                  </button>
                ))}
              </div>

              {/* Q&A Input */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <input
                  type="text"
                  className="custom-input"
                  style={{ fontSize: '0.84rem', padding: '8px 12px' }}
                  placeholder="Ask a specific question (e.g. When is the security deposit refunded?)..."
                  value={docQuestion}
                  onChange={(e) => setDocQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskDocument()}
                />
                <button
                  className="btn-primary"
                  style={{ padding: '8px 16px', fontSize: '0.84rem' }}
                  onClick={() => handleAskDocument()}
                  disabled={isAskingDoc || !docQuestion.trim()}
                >
                  {isAskingDoc ? 'Searching...' : 'Ask'}
                </button>
              </div>

              {/* Q&A Results List */}
              {docQnAList.length > 0 && (
                <div className="doc-qna-results scroller">
                  {docQnAList.map((item) => (
                    <div key={item.id} className="doc-qna-item">
                      <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#f8fafc', marginBottom: '4px' }}>
                        Q: {item.question}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                        {item.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Analysis & Risk Results */}
        <div className="glass-panel analysis-card">
          {/* Header Summary & SVG Gauge */}
          <div className="risk-summary-bar">
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <span className={`risk-badge ${analysis.overallRisk}`}>
                  {analysis.overallRisk === 'Critical' || analysis.overallRisk === 'High' ? (
                    <ShieldAlert size={12} />
                  ) : (
                    <CheckCircle2 size={12} />
                  )}
                  {analysis.overallRisk} Risk Level
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Category: {analysis.category}
                </span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.25 }}>
                {analysis.title}
              </h3>
            </div>

            {/* SVG Circular Risk Gauge */}
            <div className="svg-gauge-container">
              <svg width="76" height="76" viewBox="0 0 80 80">
                {/* Background Ring Track */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="6"
                  fill="none"
                />
                {/* Animated Meter Progress Ring */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  stroke={gaugeColor}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="none"
                  transform="rotate(-90 40 40)"
                  style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {/* Center Score Number */}
                <text
                  x="40"
                  y="38"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="18"
                  fontWeight="800"
                  fill="#fff"
                >
                  {analysis.riskScore}
                </text>
                <text
                  x="40"
                  y="52"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="8"
                  fontWeight="700"
                  fill="var(--text-muted)"
                  letterSpacing="0.05em"
                >
                  /100
                </text>
              </svg>
              <span className="gauge-label-sub">Risk Score</span>
            </div>
          </div>

          {/* Plain English Summary Box */}
          <div className="summary-box-card" style={{ borderLeft: `3px solid ${gaugeColor}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#93c5fd', letterSpacing: '0.06em' }}>
                Executive Plain-English Summary
              </span>
              <button 
                onClick={handleCopySummary}
                className="btn-copy-report"
                title="Copy risk summary to clipboard"
              >
                {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6, margin: 0 }}>
              {analysis.summary}
            </p>
          </div>

          {/* Clauses Accordion */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Clause Analysis ({analysis.clauses.length} Flagged Points)
              </h4>
              <button 
                onClick={() => onAskAssistant && onAskAssistant(`Can you explain the risks in this contract: ${analysis.title}?`)}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                <MessageSquareText size={13} /> 
                <span>Ask AI Advisor</span>
              </button>
            </div>

            <div className="clause-accordion">
              {analysis.clauses.map((clause) => {
                const isExpanded = expandedClauseId === clause.id;
                const clauseBorderColor = getGaugeColor(clause.risk);
                return (
                  <div 
                    key={clause.id} 
                    className="clause-item"
                    style={{ borderLeft: `3px solid ${clauseBorderColor}` }}
                  >
                    <div
                      className="clause-header"
                      onClick={() => setExpandedClauseId(isExpanded ? '' : clause.id)}
                    >
                      <div className="clause-title-group">
                        <span className={`risk-badge ${clause.risk}`}>{clause.risk}</span>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f8fafc' }}>
                          {clause.title}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                    </div>

                    {isExpanded && (
                      <div className="clause-body">
                        <div>
                          <span className="clause-section-title" style={{ color: 'var(--text-muted)' }}>
                            Original Contract Text:
                          </span>
                          <div className="original-box">
                            "{clause.originalText}"
                          </div>
                        </div>

                        <div>
                          <span className="clause-section-title" style={{ color: '#93c5fd' }}>
                            💡 What This Actually Means (Plain English):
                          </span>
                          <div className="simplified-box">
                            {clause.simplifiedText}
                          </div>
                        </div>

                        <div>
                          <span className="clause-section-title" style={{ color: '#6ee7b7' }}>
                            🛡️ Recommended Action / Negotiating Tip:
                          </span>
                          <div className="recommendation-box">
                            {clause.recommendation}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
