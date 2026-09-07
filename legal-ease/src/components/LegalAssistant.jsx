import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, User, Sparkles, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LegalAssistant({ initialPrompt }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: "👋 Hello! I am your **Legal-Ease AI Assistant**. Ask me anything about contract clauses, legal jargon, negotiating terms, or protecting your rights!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const promptSuggestions = [
    "What is an uncapped indemnification clause?",
    "How do I ensure I get paid before transferring code IP?",
    "Can my client enforce a 2-year non-compete clause?",
    "What is the difference between Net 30 and Net 60 payment terms?"
  ];

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // AI simulation logic
    setTimeout(() => {
      let responseText = "";
      const lower = text.toLowerCase();

      if (lower.includes('indemnification') || lower.includes('indemnify')) {
        responseText = `### 🛡️ Understanding Indemnification Clauses\n\nAn **indemnification clause** is a legal promise where one party agrees to pay for the other party's losses, damages, or legal defense costs if a third-party lawsuit occurs.\n\n> ⚠️ **Key Risk: Uncapped Indemnification**\nIf your contract contains "uncapped" indemnification, your financial liability is unlimited. You could be forced to pay millions in legal fees even for small oversights.\n\n**How to Negotiate:**\n1. Add a **Liability Cap** (e.g., *"Total indemnification shall not exceed total fees paid under this agreement"*).\n2. Make indemnification **mutual** so both parties are equally protected.`;
      } else if (lower.includes('ip') || lower.includes('transfer') || lower.includes('paid') || lower.includes('ownership')) {
        responseText = `### 💡 Protecting Your Intellectual Property (IP)\n\nIn independent contractor agreements, clients often include a **Work Made for Hire** clause that grants them instant IP ownership the moment you create something.\n\n> 🛡️ **Golden Rule for Creators & Engineers:**\n**Never transfer IP before receiving full payment.**\n\n**Recommended Amendment:**\nRephrase the IP clause to read:  \n*"All deliverables, designs, and code shall become the sole property of the Client ONLY UPON FULL AND FINAL PAYMENT of all outstanding invoices."*`;
      } else if (lower.includes('non-compete') || lower.includes('non compete')) {
        responseText = `### ⚖️ Non-Compete Enforceability\n\nNon-compete clauses restrict your ability to work for competitors or start a similar business within a specified geographic area and time frame.\n\n> 📌 **Recent Legal Trends:**\nCourts and regulators (like the US FTC) are increasingly cracking down on broad non-competes as unfair competition restraint.\n\n**What to Watch For:**\n- **Duration:** Anything over 1 year is generally considered restrictive for freelancers.\n- **Scope:** Ensure the non-compete is limited strictly to direct direct competitors, not an entire industry.`;
      } else {
        responseText = `### 🤖 Legal-Ease Analysis\n\nRegarding **"${text}"**:\n\n1. **Standard Legal Context:** In commercial agreements, this aspect governs rights, liabilities, and enforcement standard.\n2. **Recommendation:** Always ensure terms are reciprocal, clearly defined, and have explicit dispute resolution mechanisms.\n3. **Action Step:** You can run this exact clause through our **Contract Analyzer** tab to view flagged risk scores and plain-English rewrites!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: responseText
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <section className="hero-banner">
        <div className="hero-pill">
          <Bot size={14} /> Conversational Legal Assistant
        </div>
        <h1 className="hero-title">
          Ask legal questions. <span className="text-gradient">Get actionable guidance</span>.
        </h1>
        <p className="hero-subtitle">
          Inquire about tricky contract clauses, negotiating strategy, or legal terminology in real time.
        </p>
      </section>

      <div className="glass-panel chat-container">
        {/* Chat Messages Window */}
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', fontSize: '0.75rem', opacity: 0.8 }}>
                {msg.sender === 'assistant' ? <Bot size={14} color="#a5b4fc" /> : <User size={14} />}
                <strong>{msg.sender === 'assistant' ? 'Legal-Ease AI' : 'You'}</strong>
              </div>
              <div 
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{
                  __html: msg.text
                    .replace(/### (.*)/g, '<h4 style="font-size:1rem; margin-bottom:6px; color:#fff;">$1</h4>')
                    .replace(/> ⚠️ (.*)/g, '<div style="background:rgba(244,63,94,0.15); border-left:3px solid #f43f5e; padding:8px 12px; margin:8px 0; border-radius:4px; color:#fecdd3;">$1</div>')
                    .replace(/> 🛡️ (.*)/g, '<div style="background:rgba(16,185,129,0.15); border-left:3px solid #10b981; padding:8px 12px; margin:8px 0; border-radius:4px; color:#a7f3d0;">$1</div>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
          ))}

          {isTyping && (
            <div className="chat-bubble assistant">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                <Sparkles size={14} className="animate-spin" /> Analyzing legal principles...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="prompt-suggestions">
          {promptSuggestions.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-chip"
              onClick={() => handleSendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          className="chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            className="chat-input"
            placeholder="Type a legal question or paste a clause..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={!input.trim()}>
            <Send size={16} /> Send
          </button>
        </form>
      </div>
    </div>
  );
}
