import React, { useState } from 'react';
import { CITIZEN_RIGHTS_CATEGORIES, CITIZEN_RIGHTS_GUIDES } from '../data/citizenRightsData';
import { 
  Shield, 
  Search, 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  MessageSquareText, 
  Sparkles,
  Scale
} from 'lucide-react';

export default function CitizenRights({ onNavigateToRTI, onAskAssistant }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState('tenant-deposit');
  const [copied, setCopied] = useState(false);

  // Editable notice state for customization
  const activeGuide = CITIZEN_RIGHTS_GUIDES.find(g => g.id === selectedGuideId) || CITIZEN_RIGHTS_GUIDES[0];
  const [customNoticeBody, setCustomNoticeBody] = useState(activeGuide.sampleNotice.body);

  const handleSelectGuide = (guide) => {
    setSelectedGuideId(guide.id);
    setCustomNoticeBody(guide.sampleNotice.body);
  };

  const filteredGuides = CITIZEN_RIGHTS_GUIDES.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.applicableLaw.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(customNoticeBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Scale size={14} /> Citizen Rights & Legal Remedies Hub
        </div>
        <h1 className="hero-title">
          Know your legal protections. <span className="text-gradient">Take decisive action</span>.
        </h1>
        <p className="hero-subtitle">
          Plain-English rights breakdowns for tenants, consumers, employees, and cyber fraud victims with auto-generated legal demand notices.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search citizen rights issues (e.g. security deposit, defective product refund, unpaid salary, UPI fraud)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {CITIZEN_RIGHTS_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`prompt-chip ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{
                background: selectedCategory === cat.id ? 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat.id ? '#fff' : 'var(--text-muted)',
                borderColor: selectedCategory === cat.id ? 'var(--primary)' : 'var(--border-color)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Guide List & Selected Guide Details */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', alignItems: 'start' }}>
        {/* Left Column: Topics / Guides List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Available Citizen Guides ({filteredGuides.length})
          </h3>

          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className={`glass-panel ${selectedGuideId === guide.id ? 'selected-card' : ''}`}
              style={{ 
                padding: '1.25rem', 
                cursor: 'pointer',
                borderColor: selectedGuideId === guide.id ? 'var(--primary)' : 'var(--border-color)',
                boxShadow: selectedGuideId === guide.id ? '0 0 16px rgba(99, 102, 241, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleSelectGuide(guide)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0, color: selectedGuideId === guide.id ? '#a5b4fc' : 'var(--text-main)' }}>
                  {guide.title}
                </h4>
                <span className="risk-badge Low" style={{ textTransform: 'capitalize', fontSize: '0.72rem' }}>
                  {guide.category}
                </span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 8px 0' }}>
                {guide.summary}
              </p>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Scale size={13} color="var(--primary)" /> {guide.applicableLaw}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Detailed Breakdown & Notice Generator */}
        <div className="glass-panel" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Shield size={20} color="var(--primary)" />
              <h2 style={{ fontSize: '1.3rem', margin: 0 }}>{activeGuide.title}</h2>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#a5b4fc', margin: '4px 0 0 0' }}>
              Statute: <strong>{activeGuide.applicableLaw}</strong>
            </p>
          </div>

          {/* Key Rights Section */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 0 }}>
              <CheckCircle2 size={16} /> Your Statutory Protections & Rights:
            </h3>
            <ul style={{ margin: '8px 0 0', paddingLeft: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
              {activeGuide.keyRights.map((r, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Action Steps Checklist */}
          <div>
            <h3 style={{ fontSize: '0.95rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 0 }}>
              <AlertTriangle size={16} /> Recommended Action Steps:
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {activeGuide.actionSteps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.84rem', lineHeight: 1.5 }}>
                  <span style={{ 
                    background: 'var(--primary)', 
                    color: '#fff', 
                    borderRadius: '50%', 
                    width: '20px', 
                    height: '20px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Official Demand Notice Generator */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                <FileText size={16} color="var(--primary)" /> Ready-to-Send Legal Demand Notice:
              </h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handleCopyNotice}>
                  {copied ? <><Check size={13} color="#34d399" /> Copied!</> : <><Copy size={13} /> Copy Notice</>}
                </button>
                <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem' }} onClick={handlePrint}>
                  <Printer size={13} /> Print
                </button>
              </div>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Edit the bracketed details (e.g. [Amount], [Date]) directly in the box below before copying or sending via Registered Post / Email:
            </p>

            <textarea 
              className="custom-input"
              rows={12}
              style={{ fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.5, resize: 'vertical' }}
              value={customNoticeBody}
              onChange={(e) => setCustomNoticeBody(e.target.value)}
            />
          </div>

          {/* Bridge Actions: RTI and AI Assistant */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
            <button 
              className="btn-secondary" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.84rem' }}
              onClick={() => onNavigateToRTI?.()}
            >
              <Building2 size={15} color="var(--primary)" /> Need Govt Records? File RTI Application <ArrowRight size={14} />
            </button>
            <button 
              className="btn-secondary" 
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.84rem' }}
              onClick={() => onAskAssistant?.(`What are my legal rights regarding ${activeGuide.title} under ${activeGuide.applicableLaw}?`)}
            >
              <MessageSquareText size={15} color="#a5b4fc" /> Ask Legal Assistant <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
