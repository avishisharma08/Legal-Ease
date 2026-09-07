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

  const activeSample = SAMPLE_CONTRACTS.find(s => s.id === selectedSampleId) || SAMPLE_CONTRACTS[0];

  // Dynamic analysis computation if text is modified or custom contract is pasted
  const getAnalysis = () => {
    if (contractText === activeSample.fullText) {
      return activeSample;
    }
    
    // Simple dynamic rule-based analyzer for custom pasted text
    const lower = contractText.toLowerCase();
    const clauses = [];
    let score = 20;

    if (lower.includes('indemnify') || lower.includes('hold harmless')) {
      score += 30;
      clauses.push({
        id: 'dyn-1',
        title: 'Indemnification & Liability Assumption',
        type: 'Liability',
        risk: 'High',
        originalText: 'Extracted indemnification phrase within document...',
        simplifiedText: 'You may be forced to pay legal fees and damages if a third party sues over this agreement.',
        recommendation: 'Request a mutual liability cap limited to fees paid.'
      });
    }

    if (lower.includes('work made for hire') || lower.includes('copyright') || lower.includes('ownership')) {
      score += 25;
      clauses.push({
        id: 'dyn-2',
        title: 'Intellectual Property Ownership',
        type: 'IP Rights',
        risk: 'Medium',
        originalText: 'All work products and IP vest immediately in client...',
        simplifiedText: 'The client will own everything you create for them under this contract.',
        recommendation: 'Ensure IP transfer occurs ONLY after full payment is received.'
      });
    }

    if (lower.includes('liquidated damages') || lower.includes('penalty')) {
      score += 25;
      clauses.push({
        id: 'dyn-3',
        title: 'Pre-Determined Financial Penalty',
        type: 'Penalty',
        risk: 'Critical',
        originalText: 'Liquidated damages of specific dollar amounts assigned per breach...',
        simplifiedText: 'Fixed monetary penalties are specified if specific terms are broken.',
        recommendation: 'Carefully check dollar amounts and remove fixed punitive fines.'
      });
    }

    if (lower.includes('terminate') || lower.includes('cancellation')) {
      score += 10;
      clauses.push({
        id: 'dyn-4',
        title: 'Termination Rights & Notice Period',
        type: 'Termination',
        risk: 'Low',
        originalText: 'Terms regarding cancellation and notice periods...',
        simplifiedText: 'Rules defining how either party can end this agreement.',
        recommendation: 'Ensure a balanced 14-to-30 day written notice period.'
      });
    }

    const finalScore = Math.min(100, Math.max(10, score));
    let overall = 'Low';
    if (finalScore >= 75) overall = 'Critical';
    else if (finalScore >= 50) overall = 'High';
    else if (finalScore >= 30) overall = 'Medium';

    return {
      id: 'custom',
      title: 'Custom Analyzed Contract',
      category: 'User Upload',
      overallRisk: overall,
      riskScore: finalScore,
      summary: `Analyzed ${contractText.length} characters of legal text. Found ${clauses.length} key clause areas. Risk score estimated at ${finalScore}/100.`,
      clauses: clauses.length > 0 ? clauses : [
        {
          id: 'dyn-def',
          title: 'Standard Terms Detected',
          type: 'General',
          risk: 'Low',
          originalText: contractText.slice(0, 150) + '...',
          simplifiedText: 'Standard agreement language without immediate high-risk red flag triggers.',
          recommendation: 'Always review jurisdiction and payment terms carefully.'
        }
      ]
    };
  };

  const analysis = getAnalysis();

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setContractText(sample.fullText);
    setExpandedClauseId(sample.clauses[0]?.id || '');
  };

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 400);
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
            <button className="btn-primary" style={{ flex: 1 }} onClick={handleReanalyze}>
              <Zap size={16} /> {isAnalyzing ? 'Scanning Clauses...' : 'Analyze Document'}
            </button>
            <button className="btn-secondary" onClick={() => setContractText('')}>
              Clear Text
            </button>
          </div>
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
