import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import ContractAnalyzer from './components/ContractAnalyzer';
import BNSConverter from './components/BNSConverter';
import RTIAssistant from './components/RTIAssistant';
import CitizenRights from './components/CitizenRights';
import JargonSimplifier from './components/JargonSimplifier';
import TemplateGenerator from './components/TemplateGenerator';
import LegalAssistant from './components/LegalAssistant';
import HelplineModal from './components/HelplineModal';
import JudgeDemoModal from './components/JudgeDemoModal';
import { Scale, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [assistantPrompt, setAssistantPrompt] = useState('');
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState(false);

  const handleAskAssistant = (promptText) => {
    setAssistantPrompt(promptText);
    setActiveTab('assistant');
  };

  const handleNavigateToRTI = () => {
    setActiveTab('rti');
  };

  const handleAnalyzeGenerated = (contractContent) => {
    setActiveTab('analyzer');
  };

  return (
    <div className="app-wrapper">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenHelplines={() => setIsHelplineOpen(true)}
        onOpenJudgeDemo={() => setIsJudgeDemoOpen(true)}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <HomePage 
            onNavigate={(tabId) => setActiveTab(tabId)}
            onOpenHelplines={() => setIsHelplineOpen(true)}
          />
        )}

        {activeTab === 'analyzer' && (
          <ContractAnalyzer onAskAssistant={handleAskAssistant} />
        )}

        {activeTab === 'bns' && (
          <BNSConverter onAskAssistant={handleAskAssistant} />
        )}

        {activeTab === 'rti' && (
          <RTIAssistant />
        )}

        {activeTab === 'rights' && (
          <CitizenRights onNavigateToRTI={handleNavigateToRTI} onAskAssistant={handleAskAssistant} />
        )}

        {activeTab === 'dictionary' && (
          <JargonSimplifier onAskAssistant={handleAskAssistant} />
        )}

        {activeTab === 'generator' && (
          <TemplateGenerator onAnalyzeGenerated={handleAnalyzeGenerated} />
        )}

        {activeTab === 'assistant' && (
          <LegalAssistant initialPrompt={assistantPrompt} />
        )}
      </main>

      <footer className="site-footer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem' }}>
          <Scale size={16} color="var(--primary)" />
          <strong style={{ color: 'var(--text-main)' }}>LegalEase IND</strong>
          <span>• Institutional Civic & Statutory Intelligence Platform</span>
        </div>
        <p style={{ maxWidth: '650px', margin: '0 auto 0.5rem', fontSize: '0.78rem', lineHeight: 1.5 }}>
          Disclaimer: LegalEase IND provides codified statutory legal information, contract forensic audits, and automated document generation for educational and civic purposes. It does not replace professional advocate representation.
        </p>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
          LegalEase IND © {new Date().getFullYear()} • Grounded in Indian Law (BNS 2023 / ICA 1872 / MTA 2021)
        </div>
      </footer>

      {/* Global Interactive Helpline Modal */}
      <HelplineModal 
        isOpen={isHelplineOpen} 
        onClose={() => setIsHelplineOpen(false)} 
      />

      {/* 1-Click Judge & Hackathon Demo Showcase Modal */}
      <JudgeDemoModal
        isOpen={isJudgeDemoOpen}
        onClose={() => setIsJudgeDemoOpen(false)}
        onLaunchDemo={(targetTab) => setActiveTab(targetTab)}
      />
    </div>
  );
}
