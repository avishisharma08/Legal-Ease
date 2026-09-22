import React, { useState } from 'react';
import { BNS_CATEGORIES, BNS_SECTIONS, BNSS_PROCEDURAL_REFORMS } from '../data/bnsData';
import { 
  Scale, 
  Search, 
  BookOpen, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  AlertCircle,
  FileCheck2,
  ChevronRight,
  MessageSquareText,
  BadgeAlert,
  SlidersHorizontal,
  Flame
} from 'lucide-react';

export default function BNSConverter({ onAskAssistant }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const filteredSections = BNS_SECTIONS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch = 
      item.oldIpc.toLowerCase().includes(q) ||
      item.newBns.toLowerCase().includes(q) ||
      item.offense.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.bnsChange.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (item) => {
    const citationText = `[Indian Criminal Law Citation]\nOffense: ${item.offense}\nNew Law: ${item.newBns}, Bharatiya Nyaya Sanhita (BNS) 2023\nCorresponding Repealed Law: ${item.oldIpc}, Indian Penal Code 1860\nPunishment: ${item.punishment}\nClassification: ${item.cognizable}, ${item.bailable}`;
    navigator.clipboard.writeText(citationText);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Showcase Header */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Scale size={14} className="hero-pill-icon" />
          <span>Bharatiya Nyaya Sanhita (BNS) 2023 Intelligence Engine</span>
        </div>
        <h1 className="hero-title">
          India's New Criminal Justice Codes. <span className="hero-gradient-text">Decoded Instantly</span>.
        </h1>
        <p className="hero-subtitle">
          Effective 1 July 2024: India replaced the 164-year-old IPC 1860 with the <strong>Bharatiya Nyaya Sanhita (BNS) 2023</strong>. Crosswalk any repealed IPC section to its contemporary BNS replacement with comparative penalties.
        </p>

        {/* Contemporary Legal Trust Ribbon */}
        <div className="trust-ribbon">
          <div className="trust-ribbon-item">
            <Flame size={13} color="#f59e0b" />
            <span>Effective 1 July 2024 Code</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <FileCheck2 size={13} className="trust-check-icon" />
            <span>IPC ➔ BNS Crosswalk</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <FileCheck2 size={13} className="trust-check-icon" />
            <span>BNSS 2023 Procedural Safeguards</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <FileCheck2 size={13} className="trust-check-icon" />
            <span>Zero FIR & Digital Evidence (BSA)</span>
          </div>
        </div>
      </section>

      {/* BNSS 2023 Procedural Highlights Banner */}
      <div className="bns-procedural-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Sparkles size={16} color="#fbbf24" />
          <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Historic Procedural Reforms under BNSS 2023 & BSA 2023:
          </h3>
        </div>
        <div className="bns-procedural-grid">
          {BNSS_PROCEDURAL_REFORMS.slice(0, 3).map((reform, idx) => (
            <div key={idx} className="bns-procedural-card">
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#93c5fd', marginBottom: '2px' }}>
                {reform.title}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginBottom: '4px' }}>
                {reform.statute}
              </div>
              <div style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.45 }}>
                {reform.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by IPC section (e.g. 420, 302, 379), BNS section (e.g. 318, 103), or offense name (Cheating, Forgery, Theft, Defamation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {BNS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`prompt-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{
                background: selectedCategory === cat.id ? 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)' : 'rgba(255,255,255,0.04)',
                color: selectedCategory === cat.id ? '#fff' : 'var(--text-muted)',
                borderColor: selectedCategory === cat.id ? 'var(--primary)' : 'var(--border-color)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Results List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Showing {filteredSections.length} Codified Criminal Offenses
          </span>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-subtle)' }}>
            Click citation to copy for FIR or legal pleadings
          </span>
        </div>

        {filteredSections.map((item) => {
          const isCopied = copiedId === item.id;
          return (
            <div key={item.id} className="bns-section-card glass-panel">
              {/* Top Header: Comparison Badge & Copy */}
              <div className="bns-card-header">
                <div className="bns-crosswalk-badges">
                  <div className="bns-badge-old">
                    <span className="badge-micro-label">REPEALED LAW</span>
                    <strong>{item.oldIpc}</strong>
                  </div>
                  <div className="bns-arrow-indicator">
                    <ArrowRight size={16} />
                  </div>
                  <div className="bns-badge-new">
                    <span className="badge-micro-label">CONTEMPORARY CODE</span>
                    <strong>{item.newBns} (BNS 2023)</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    className="diff-copy-pill"
                    onClick={() => handleCopyCitation(item)}
                    title="Copy formal criminal citation"
                  >
                    {isCopied ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                    <span>{isCopied ? 'Copied Citation!' : 'Copy Citation'}</span>
                  </button>
                  <button 
                    className="btn-ghost"
                    style={{ fontSize: '0.72rem', padding: '3px 8px' }}
                    onClick={() => onAskAssistant && onAskAssistant(`What is the punishment and procedure under ${item.newBns} of Bharatiya Nyaya Sanhita (formerly ${item.oldIpc})?`)}
                  >
                    <MessageSquareText size={12} /> Ask AI
                  </button>
                </div>
              </div>

              {/* Offense Title & Description */}
              <div style={{ marginTop: '0.5rem' }}>
                <h3 style={{ fontSize: '1.08rem', color: '#fff', margin: '0 0 4px 0', fontWeight: 700 }}>
                  {item.offense}
                </h3>
                <p style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.55, margin: 0 }}>
                  {item.description}
                </p>
              </div>

              {/* Statutory Classifications & Punishment Row */}
              <div className="bns-details-row">
                <div className="bns-detail-box">
                  <span className="bns-detail-label">Punishment / Penalty:</span>
                  <span className="bns-detail-val font-semibold text-rose-400">{item.punishment}</span>
                </div>

                <div className="bns-detail-box">
                  <span className="bns-detail-label">Cognizability:</span>
                  <span className={`bns-detail-pill ${item.cognizable.includes('Cognizable') ? 'cognizable' : 'non-cognizable'}`}>
                    {item.cognizable}
                  </span>
                </div>

                <div className="bns-detail-box">
                  <span className="bns-detail-label">Bail Classification:</span>
                  <span className={`bns-detail-pill ${item.bailable.includes('Non-Bailable') ? 'non-bailable' : 'bailable'}`}>
                    {item.bailable}
                  </span>
                </div>
              </div>

              {/* What Changed in BNS 2023 */}
              <div className="bns-reform-note">
                <span style={{ fontWeight: 700, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={13} /> Reform Note under BNS 2023:
                </span>
                <span style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>
                  {item.bnsChange}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
