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
  MessageSquareText
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
  

  const activeSample = SAMPLE_CONTRACTS.find(s => s.id === selectedSampleId) || SAMPLE_CONTRACTS[0];
  const analysis = liveAnalysis || activeSample;

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setContractText(sample.fullText);
    setLiveAnalysis(null);
    setError('');
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
    const textToCopy = `[Legal-Ease Risk Report]\nContract: ${analysis.title}\nRisk Level: ${analysis.overallRisk} (${analysis.riskScore}/100)\n\nSummary:\n${analysis.summary}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Section */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Sparkles size={14} /> Real-Time Legal Text Breakdown & Risk Detection
        </div>
        <h1 className="hero-title">
          Paste any contract. Get instant <span className="text-gradient">plain English answers</span>.
        </h1>
        <p className="hero-subtitle">
          Detect hidden red flags, uncap liabilities, unfair IP clauses, and unreasonable non-competes in seconds.
        </p>
      </section>

      {/* Main Analyzer Grid */}
      <div className="analyzer-grid">
        {/* Left Side: Editor & Sample Selector */}
        <div className="glass-panel editor-card">
          <div className="sample-selector">
            <span className="selector-label">Load Preset Sample Document:</span>
            <div className="sample-buttons">
              {SAMPLE_CONTRACTS.map((sample) => (
                <button
                  key={sample.id}
                  className={`sample-btn ${selectedSampleId === sample.id ? 'selected' : ''}`}
                  onClick={() => handleSelectSample(sample)}
                >
                  <FileText size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {sample.title.split('(')[0]}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="selector-label">Contract / Agreement Text:</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {contractText.length} characters
            </span>
          </div>

          <textarea
            className="contract-textarea"
            value={contractText}
            onChange={(e) => setContractText(e.target.value)}
            placeholder="Paste your legal document, agreement, or clauses here..."
          />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className="btn-primary"
              style={{ flex: 1, opacity: isAnalyzing ? 0.75 : 1, cursor: isAnalyzing ? 'not-allowed' : 'pointer' }}
              onClick={handleReanalyze}
              disabled={isAnalyzing || isExtracting}
              
            >
              <Zap size={16} /> {isAnalyzing ? 'Scanning Clauses...' : 'Analyze Document'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => {
                setContractText('');
                setError('');
              }}
              disabled={isAnalyzing}
            >
              Clear Text
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
                    const response = await fetch('http://127.0.0.1:8000/extract-text', {
                    method: 'POST',
                    body: formData,
                   });
                   const data = await response.json();
                   if (!response.ok) {
                    throw new Error(data.detail || 'Failed to extract text from file.');
                  }
                  setContractText(data.extracted_text);
                }
                  catch (err) {
                    setError(err.message);
                    setUploadedFileName('');
                   } finally {
                    setIsExtracting(false);
                  }
                }}/>
              <button
                className="btn-secondary"
                onClick={() => document.getElementById('fileUpload').click()}
                disabled={isAnalyzing}
              >
                <FileText size={16} /> {isExtracting ? 'Extracting text...' : uploadedFileName ? uploadedFileName : 'Upload Document'}
              </button>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#fca5a5',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              lineHeight: 1.4
            }}>
              <AlertTriangle size={16} color="#ef4444" style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Side: Analysis & Risk Results */}
        <div className="glass-panel analysis-card">
          {/* Header Summary & Gauge */}
          <div className="risk-summary-bar">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className={`risk-badge ${analysis.overallRisk}`}>
                  {analysis.overallRisk === 'Critical' || analysis.overallRisk === 'High' ? (
                    <ShieldAlert size={12} />
                  ) : (
                    <CheckCircle2 size={12} />
                  )}
                  {analysis.overallRisk} Risk Level
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Category: {analysis.category}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>
                {analysis.title}
              </h3>
            </div>

            <div className={`risk-score-circle ${analysis.overallRisk}`}>
              {analysis.riskScore}
              <span className="score-label">Risk Score</span>
            </div>
          </div>

          {/* Plain English Summary Box */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: '#a5b4fc', letterSpacing: '0.05em' }}>
                Executive Plain-English Summary
              </span>
              <button 
                onClick={handleCopySummary}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
              >
                {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
              {analysis.summary}
            </p>
          </div>

          {/* Clauses Accordion */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>
                Clause Analysis ({analysis.clauses.length} Flagged Points)
              </h4>
              <button 
                onClick={() => onAskAssistant && onAskAssistant(`Can you explain the risks in this contract: ${analysis.title}?`)}
                className="btn-secondary"
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                <MessageSquareText size={13} /> Ask AI Assistant
              </button>
            </div>

            <div className="clause-accordion">
              {analysis.clauses.map((clause) => {
                const isExpanded = expandedClauseId === clause.id;
                return (
                  <div key={clause.id} className="clause-item">
                    <div
                      className="clause-header"
                      onClick={() => setExpandedClauseId(isExpanded ? '' : clause.id)}
                    >
                      <div className="clause-title-group">
                        <span className={`risk-badge ${clause.risk}`}>{clause.risk}</span>
                        <span style={{ fontWeight: 600, fontSize: '0.875rem', color: '#f3f4f6' }}>
                          {clause.title}
                        </span>
                      </div>
                      {isExpanded ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                    </div>

                    {isExpanded && (
                      <div className="clause-body">
                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                            Original Contract Text:
                          </span>
                          <div className="original-box">
                            "{clause.originalText}"
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#a5b4fc', display: 'block', marginBottom: '0.25rem' }}>
                            💡 What This Actually Means (Plain English):
                          </span>
                          <div className="simplified-box">
                            {clause.simplifiedText}
                          </div>
                        </div>

                        <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', color: '#10b981', display: 'block', marginBottom: '0.25rem' }}>
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
