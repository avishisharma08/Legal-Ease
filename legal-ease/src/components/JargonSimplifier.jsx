import React, { useState } from 'react';
import { LEGAL_DICTIONARY } from '../data/legalDictionary';
import { Search, BookOpen, AlertTriangle, Lightbulb, Filter, ArrowRight } from 'lucide-react';

export default function JargonSimplifier({ onAskAssistant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTermModal, setSelectedTermModal] = useState(null);

  const categories = ['All', 'Liability & Risk', 'Contract Execution', 'Penalties', 'Intellectual Property', 'Dispute Resolution'];

  const filteredDictionary = LEGAL_DICTIONARY.filter((item) => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.simpleDefinition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.latin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Header */}
      <section className="hero-banner">
        <div className="hero-pill">
          <BookOpen size={14} /> Legal Jargon Translator & Dictionary
        </div>
        <h1 className="hero-title">
          Translate complex legalese into <span className="text-gradient">plain human terms</span>.
        </h1>
        <p className="hero-subtitle">
          Search over 50+ intimidating contract terms, Latin legal phrases, and liability clauses with real-world examples.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search legal terms (e.g. Indemnification, Force Majeure, Liquidated Damages)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '0.25rem' }}>
            <Filter size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`prompt-chip ${selectedCategory === cat ? 'active' : ''}`}
              style={{
                background: selectedCategory === cat ? 'linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)' : 'rgba(255,255,255,0.05)',
                color: selectedCategory === cat ? '#fff' : 'var(--text-muted)',
                borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border-color)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary Card Grid */}
      <div className="dictionary-grid">
        {filteredDictionary.map((item) => (
          <div
            key={item.id}
            className="glass-panel dictionary-card"
            onClick={() => setSelectedTermModal(item)}
          >
            <div className="term-header">
              <div>
                <h3 className="term-title">{item.term}</h3>
                <span className="latin-tag">{item.latin}</span>
              </div>
              <span className={`risk-badge ${item.riskLevel}`}>
                {item.riskLevel} Risk
              </span>
            </div>

            <p className="term-def">
              {item.simpleDefinition}
            </p>

            <div className="example-box">
              <strong style={{ color: '#a5b4fc', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                <Lightbulb size={12} /> Real World Example:
              </strong>
              {item.realWorldExample}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--primary)' }}>
              <span>Category: {item.category}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                View Trap Warning <ArrowRight size={12} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal View for Term Details */}
      {selectedTermModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1.5rem'
        }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className={`risk-badge ${selectedTermModal.riskLevel}`} style={{ marginBottom: '0.5rem' }}>
                  {selectedTermModal.riskLevel} Risk Term
                </span>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff' }}>
                  {selectedTermModal.term}
                </h2>
                <span className="latin-tag" style={{ fontSize: '0.9rem' }}>
                  Etymology: {selectedTermModal.latin}
                </span>
              </div>
              <button
                onClick={() => setSelectedTermModal(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--primary)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#a5b4fc', display: 'block', marginBottom: '0.25rem' }}>
                Plain-English Meaning
              </span>
              <p style={{ color: '#fff', fontSize: '0.95rem', lineHeight: 1.6 }}>
                {selectedTermModal.simpleDefinition}
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '0.25rem' }}>
                Real-World Context
              </span>
              <p style={{ color: 'var(--text-main)', fontSize: '0.875rem' }}>
                {selectedTermModal.realWorldExample}
              </p>
            </div>

            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '1rem', borderRadius: 'var(--radius-sm)', borderLeft: '4px solid var(--risk-high)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--risk-high)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.25rem' }}>
                <AlertTriangle size={14} /> Common Contract Trap / Warning
              </span>
              <p style={{ color: '#fed7aa', fontSize: '0.875rem' }}>
                {selectedTermModal.commonTrap}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button 
                className="btn-secondary"
                onClick={() => {
                  const termName = selectedTermModal.term;
                  setSelectedTermModal(null);
                  if (onAskAssistant) onAskAssistant(`How can I negotiate or rephrase the "${termName}" clause in a contract?`);
                }}
              >
                Ask AI Assistant About This Term
              </button>
              <button className="btn-primary" onClick={() => setSelectedTermModal(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
