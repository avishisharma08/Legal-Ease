import React, { useState } from 'react';
import { 
  Scale, 
  X, 
  Copy, 
  Check, 
  Download, 
  Mail, 
  FileCheck2, 
  GitCompare, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Send
} from 'lucide-react';

export default function NegotiationStudioModal({ isOpen, onClose, redlineData, onRegenerate, isRegenerating }) {
  const [activeTab, setActiveTab] = useState('diff'); // 'diff' | 'letter' | 'clean' | 'precedents'
  const [copiedType, setCopiedType] = useState(null);

  if (!isOpen || !redlineData) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = (text, filename) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to render redline diff with colored highlights
  const renderRedlineDiff = (text) => {
    if (!text) return null;

    // Matches [[DELETED: ...]] and [[ADDED: ...]]
    const parts = text.split(/(\[\[DELETED:[\s\S]*?\]\]|\[\[ADDED:[\s\S]*?\]\])/g);

    return parts.map((part, index) => {
      if (part.startsWith('[[DELETED:')) {
        const deletedText = part.replace(/^\[\[DELETED:\s*/, '').replace(/\s*\]\]$/, '');
        return (
          <span key={index} className="redline-deleted" title="Unfair / Predatory Term Removed">
            {deletedText}
          </span>
        );
      }
      if (part.startsWith('[[ADDED:')) {
        const addedText = part.replace(/^\[\[ADDED:\s*/, '').replace(/\s*\]\]$/, '');
        return (
          <span key={index} className="redline-added" title="Commercially Fair Replacement Added">
            {addedText}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-panel negotiation-studio-modal" onClick={(e) => e.stopPropagation()}>
        {/* Studio Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="modal-icon-badge" style={{ background: 'rgba(37, 99, 235, 0.15)', borderColor: 'rgba(59, 130, 246, 0.35)' }}>
              <GitCompare size={18} color="#93c5fd" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  AI Contract Negotiation & Redline Studio
                </h3>
                <span className="jurisdiction-badge" style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#6ee7b7', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
                  FAIR COUNTER-OFFER
                </span>
              </div>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>
                Commercially balanced amendments grounded in Indian Contract Act 1872 & Supreme Court precedents
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close studio">
            <X size={18} />
          </button>
        </div>

        {/* Segmented Studio Tabs */}
        <div className="studio-tabs-bar">
          <button 
            className={`studio-tab-btn ${activeTab === 'diff' ? 'active' : ''}`}
            onClick={() => setActiveTab('diff')}
          >
            <GitCompare size={14} />
            <span>Redline Diff View</span>
          </button>

          <button 
            className={`studio-tab-btn ${activeTab === 'letter' ? 'active' : ''}`}
            onClick={() => setActiveTab('letter')}
          >
            <Mail size={14} />
            <span>Negotiation Email / Letter</span>
          </button>

          <button 
            className={`studio-tab-btn ${activeTab === 'clean' ? 'active' : ''}`}
            onClick={() => setActiveTab('clean')}
          >
            <FileCheck2 size={14} />
            <span>Clean Revised Contract</span>
          </button>

          <button 
            className={`studio-tab-btn ${activeTab === 'precedents' ? 'active' : ''}`}
            onClick={() => setActiveTab('precedents')}
          >
            <ShieldCheck size={14} />
            <span>Precedents & Statutory Grounds ({redlineData.key_amendments?.length || 0})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body scroller" style={{ maxHeight: '68vh' }}>
          {/* TAB 1: Visual Redline Diff View */}
          {activeTab === 'diff' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="diff-legend-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
                  <span className="diff-legend-pill deleted" />
                  <span style={{ color: '#fda4af' }}>Red Strike-Through: Predatory term removed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
                  <span className="diff-legend-pill added" />
                  <span style={{ color: '#6ee7b7' }}>Emerald Highlight: Balanced statutory term inserted</span>
                </div>
              </div>

              <div className="redline-paper-viewer scroller">
                <pre className="redline-diff-text">
                  {renderRedlineDiff(redlineData.redlined_contract)}
                </pre>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Tip: Copy the Clean Revised Draft tab when sending the final amended version.
                </span>
                <button 
                  className="btn-secondary"
                  onClick={() => handleCopy(redlineData.redlined_contract, 'redline')}
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                >
                  {copiedType === 'redline' ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                  <span>{copiedType === 'redline' ? 'Copied' : 'Copy Marked Diff'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Strategic Negotiation Email */}
          {activeTab === 'letter' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                    Proposed Counter-Offer Cover Letter
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    Polite, non-confrontational phrasing designed to maintain good commercial relationships while protecting liability.
                  </p>
                </div>

                <button 
                  className="btn-primary"
                  onClick={() => handleCopy(redlineData.cover_letter, 'letter')}
                  style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                >
                  {copiedType === 'letter' ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedType === 'letter' ? 'Letter Copied!' : 'Copy Negotiation Email'}</span>
                </button>
              </div>

              <div className="email-preview-box scroller">
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-sans)', fontSize: '0.88rem', color: '#e2e8f0', lineHeight: 1.65 }}>
                  {redlineData.cover_letter}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: Clean Revised Contract */}
          {activeTab === 'clean' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                    Clean Proposed Agreement (Ready to Sign)
                  </h4>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    All fair amendments cleanly incorporated without markup annotations.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    className="btn-secondary"
                    onClick={() => handleDownload(redlineData.clean_negotiated_contract, 'Revised_Agreement_CounterOffer.txt')}
                    style={{ fontSize: '0.82rem', padding: '6px 12px' }}
                  >
                    <Download size={14} />
                    <span>Download (.txt)</span>
                  </button>

                  <button 
                    className="btn-primary"
                    onClick={() => handleCopy(redlineData.clean_negotiated_contract, 'clean')}
                    style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                  >
                    {copiedType === 'clean' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedType === 'clean' ? 'Copied Clean Draft!' : 'Copy Clean Contract'}</span>
                  </button>
                </div>
              </div>

              <div className="redline-paper-viewer scroller">
                <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: '#e2e8f0', lineHeight: 1.6 }}>
                  {redlineData.clean_negotiated_contract}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: Statutory Precedents & Rationale */}
          {activeTab === 'precedents' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                  Statutory Grounds & Supreme Court Citations
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  Why these changes are legally justified under Indian law:
                </p>
              </div>

              {/* Precedent Badges */}
              {redlineData.precedents_cited?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {redlineData.precedents_cited.map((p, idx) => (
                    <div key={idx} className="precedent-pill">
                      <Scale size={12} color="#fbbf24" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key Amendments Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {(redlineData.key_amendments || []).map((item, idx) => (
                  <div key={idx} className="amendment-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#93c5fd' }}>
                        {item.section}
                      </span>
                      <span className="jurisdiction-badge" style={{ background: 'rgba(217, 119, 6, 0.12)', color: '#fbbf24' }}>
                        {item.statutory_rationale}
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      <div className="concern-box">
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fca5a5', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                          Original Problem:
                        </span>
                        <span>{item.original_concern}</span>
                      </div>

                      <div className="proposed-box">
                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                          Proposed Fair Amendment:
                        </span>
                        <span>{item.proposed_change}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Studio Footer */}
        <div className="modal-footer">
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            All redlines are drafted under standard Indian commercial conventions (Section 73 & 27 Contract Act).
          </span>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
            Close Studio
          </button>
        </div>
      </div>
    </div>
  );
}
