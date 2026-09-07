import React, { useState } from 'react';
import Header from './components/Header';
import ContractAnalyzer from './components/ContractAnalyzer';
import JargonSimplifier from './components/JargonSimplifier';
import TemplateGenerator from './components/TemplateGenerator';
import LegalAssistant from './components/LegalAssistant';
import { Scale, ShieldCheck, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('analyzer');
  const [assistantPrompt, setAssistantPrompt] = useState('');

  const handleAskAssistant = (promptText) => {
    setAssistantPrompt(promptText);
    setActiveTab('assistant');
  };

  const handleAnalyzeGenerated = (contractContent) => {
    setActiveTab('analyzer');
    // Note: Can pass directly or rely on contract analyzer editor
  };

  return (
    <div className="app-wrapper">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        {activeTab === 'analyzer' && (
          <ContractAnalyzer onAskAssistant={handleAskAssistant} />
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
          <strong style={{ color: 'var(--text-main)' }}>Legal-Ease AI</strong>
          <span>• Demystifying Legal Complexity</span>
        </div>
        <p style={{ maxWidth: '650px', margin: '0 auto 0.5rem', fontSize: '0.78rem', lineHeight: 1.5 }}>
          Disclaimer: Legal-Ease provides automated document simplification and clause risk scoring for educational and informational purposes only. It does not constitute formal attorney-client legal advice.
        </p>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
          Legal-Ease © {new Date().getFullYear()} • Built with React & AI Design Systems
        </div>
      </footer>
    </div>
  );
}
