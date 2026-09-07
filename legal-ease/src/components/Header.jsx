import React from 'react';
import { Scale, FileSearch, BookOpen, FileCheck, Bot, Sparkles } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'analyzer', label: 'Contract Analyzer', icon: FileSearch },
    { id: 'dictionary', label: 'Jargon Simplifier', icon: BookOpen },
    { id: 'generator', label: 'Agreement Builder', icon: FileCheck },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-group" onClick={() => setActiveTab('analyzer')}>
          <div className="logo-icon-bg">
            <Scale size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="logo-title">Legal-Ease</span>
              <span className="logo-badge">
                <Sparkles size={10} style={{ marginRight: '3px' }} /> AI v2.5
              </span>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', marginTop: '-2px' }}>
              Demystify Legal Contracts & Jargon
            </span>
          </div>
        </div>

        <nav className="nav-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveTab('dictionary')}>
            <BookOpen size={15} /> 50+ Legal Terms
          </button>
          <button className="btn-primary" onClick={() => setActiveTab('analyzer')}>
            <FileSearch size={15} /> Analyze Document
          </button>
        </div>
      </div>
    </header>
  );
}
