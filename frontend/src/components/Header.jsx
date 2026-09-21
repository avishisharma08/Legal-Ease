import React from 'react';
import { Home, Scale, FileText, BookOpen, Bot, Building2, Shield, PhoneCall } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenHelplines }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analyzer', label: 'Contracts', icon: FileText },
    { id: 'rti', label: 'RTI Filing', icon: Building2 },
    { id: 'rights', label: 'Citizen Rights', icon: Shield },
    { id: 'dictionary', label: 'Glossary', icon: BookOpen },
    { id: 'assistant', label: 'AI Advisor', icon: Bot },
  ];

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo & Authority Badge */}
        <div className="logo-group" onClick={() => setActiveTab('home')}>
          <div className="logo-icon-bg">
            <Scale size={20} />
          </div>
          <div className="logo-text-col">
            <div className="logo-title-row">
              <span className="logo-title">LegalEase</span>
              <span className="jurisdiction-badge">IND</span>
            </div>
            <span className="logo-subline">
              Statutory Civic & Contract Intelligence
            </span>
          </div>
        </div>

        {/* Center Segmented Navigation (No Scrollbars) */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={14} className="tab-icon" />
                <span className="tab-label">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Header Utility Actions */}
        <div className="header-actions">
          <div 
            className="statutory-pill" 
            title="Verified against Indian legal frameworks including RTI Act 2005, Contract Act 1872, and Consumer Protection Act 2019"
          >
            <span className="live-indicator-dot" />
            <span className="statutory-text">Law Grounded</span>
          </div>

          <button 
            className="btn-helpline-trigger" 
            onClick={onOpenHelplines}
            title="Click to view verified Indian Civic & Emergency Helplines (1930 / 1915 / 15100 / 14455)"
          >
            <PhoneCall size={13} className="phone-icon-pulse" />
            <span className="helpline-btn-text">Helplines 1930 / 1915</span>
          </button>
        </div>
      </div>
    </header>
  );
}
