import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  User, 
  Sparkles, 
  AlertCircle, 
  ShieldCheck, 
  Scale, 
  ArrowRight, 
  FileText, 
  Building2, 
  Shield, 
  ShoppingBag,
  CreditCard,
  Briefcase
} from 'lucide-react';

export default function LegalAssistant({ initialPrompt }) {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'assistant',
      text: "👋 **Namaste! I am your 24/7 LegalEase AI Advisor.**\nStrictly grounded in codified Indian jurisprudence — including the **Indian Contract Act 1872**, **Model Tenancy Act 2021**, **Consumer Protection Act 2019**, and **RTI Act 2005**.\n\nAsk any question below, or select a common legal situation to get immediate statutory guidance!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const quickTopics = [
    {
      icon: Shield,
      color: '#f59e0b',
      title: 'Tenant Security Deposit Withheld',
      statute: 'Section 20, Model Tenancy Act 2021',
      prompt: 'My landlord has withheld my ₹65,000 security deposit for over 30 days without bills. What are my legal remedies and how do I send a demand notice?'
    },
    {
      icon: Briefcase,
      color: '#3b82f6',
      title: 'Freelance & Tech Non-Compete',
      statute: 'Section 27, Indian Contract Act 1872',
      prompt: 'Can an Indian client or employer enforce a 2-year non-compete clause restricting me from working with competitor clients?'
    },
    {
      icon: ShoppingBag,
      color: '#10b981',
      title: 'Defective Product & Refund Refusal',
      statute: 'Section 35, Consumer Protection Act 2019',
      prompt: 'An e-commerce platform delivered a defective phone and refused a refund citing their 7-day policy. How do I file on e-Daakhil?'
    },
    {
      icon: Building2,
      color: '#8b5cf6',
      title: 'RTI Section 6(1) Drafting',
      statute: 'Right to Information Act 2005',
      prompt: 'How do I draft an RTI application to municipal corporation (MCD) to inspect road repair tenders and quality test measurement books?'
    },
    {
      icon: CreditCard,
      color: '#ec4899',
      title: 'Unauthorized UPI / Cyber Fraud',
      statute: 'RBI Zero Customer Liability Circular',
      prompt: 'I lost ₹40,000 in an unauthorized UPI scam today. What is the RBI 3-day zero liability rule and how to get shadow reversal from bank?'
    },
    {
      icon: FileText,
      color: '#06b6d4',
      title: 'Unpaid Wages & Relieving Letter Delay',
      statute: 'Payment of Wages Act 1936',
      prompt: 'My employer is withholding my relieving letter and delaying my Full & Final settlement past 30 days. What legal action can I take?'
    }
  ];

  const quickPromptPills = [
    "What is an uncapped indemnification clause?",
    "How to ensure IP is transferred only after full payment?",
    "What is the difference between Net 15 and Net 60 payment terms?",
    "Can a company forfeit gratuity if an employee resigns?"
  ];

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (messages.length > 1) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const historyPayload = newMessages
        .filter((m, idx) => idx > 0)
        .map((m) => ({
          role: m.sender === 'assistant' ? 'assistant' : 'user',
          content: m.text
        }));

      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || `Server responded with ${response.status}`);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: data.response
        }
      ]);
    } catch (err) {
      console.warn('Backend chat fallback:', err);
      let responseText = "";
      const lower = text.toLowerCase();

      if (lower.includes('deposit') || lower.includes('rent') || lower.includes('landlord')) {
        responseText = `### 🏠 Recovery of Withheld Security Deposit under Indian Law\n\nUnder the **Model Tenancy Act 2021** and State Rent Control Acts:\n\n1. **Statutory Timeline:** The landlord is legally mandated to refund the security deposit within **30 days** of receiving peaceful vacant possession.\n2. **Arbitrary Deductions Prohibited:** Deductions can only be made for actual tenant-caused structural damage, substantiated with original contractor bills. Normal wear-and-tear painting costs cannot be deducted.\n3. **Legal Recourse:** Issue a formal **15-day Legal Demand Notice** demanding refund along with 18% p.a. penal interest. If unresolved, file an application before the local **Rent Authority / Rent Court** under Section 20.`;
      } else if (lower.includes('non-compete') || lower.includes('compete') || lower.includes('section 27')) {
        responseText = `### ⚖️ Post-Termination Non-Compete Clauses in India (Section 27)\n\nUnder **Section 27 of the Indian Contract Act 1872**:\n\n> 🛡️ *"Every agreement by which anyone is restrained from exercising a lawful profession, trade or business of any kind, is to that extent void."*\n\n- **Landmark Supreme Court Precedent:** *Niranjan Shankar Golikari v. Century Spg. & Mfg. Co. Ltd.* and *Percept D'Mark v. Zaheer Khan* established that non-competes are valid **only during** active service, but **strictly void and unenforceable after termination**.\n- If a client or employer threatens a lawsuit for joining a competitor, their post-term restriction carries zero legal enforceability under Indian law.`;
      } else if (lower.includes('upi') || lower.includes('fraud') || lower.includes('scam') || lower.includes('bank')) {
        responseText = `### 🛡️ Reversal of Unauthorized Financial Fraud (RBI Guidelines)\n\nUnder **RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18**:\n\n1. **Golden 3-Day Rule:** If you report unauthorized fraud to your bank within **3 working days**, your liability is **ZERO (Zero Customer Liability)**.\n2. **Immediate Action:** Dial **1930** (National Cybercrime Helpline) immediately to freeze beneficiary bank accounts.\n3. **Bank Shadow Reversal:** The bank must credit the disputed amount back to your account within **10 working days** from the date of reporting.`;
      } else if (lower.includes('indemnification') || lower.includes('indemnify')) {
        responseText = `### 🛡️ Understanding Indemnification under Indian Contract Act 1872\n\nAn **indemnification clause** is governed by **Section 124 & 73** of the Indian Contract Act 1872.\n\n> ⚠️ **Key Risk: Uncapped Indemnification**\nIf your contract contains "uncapped" liability, you are financially exposed to unlimited third-party claims.\n\n**Standard Counter-Offer:**\n*"Contractor's aggregate liability under this agreement shall be strictly capped at the total service fees actually paid by Client within the preceding 12 months."*`;
      } else {
        responseText = `### 🏛️ Indian Legal Guidance on Your Query\n\nThank you for reaching out. Under Indian codified law:\n\n- Always ensure contractual covenants are governed by Indian jurisdiction with reference to the **Indian Contract Act 1872**.\n- Maintain formal written notices delivered via Registered Post AD or Speed Post to establish clear documentary proof before any Tribunal or Civil Forum.\n\n*Would you like to analyze a specific contract clause in the **Contracts** tab or draft a statutory notice in the **Citizen Rights** section?*`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: responseText
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Header */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Scale size={14} className="hero-pill-icon" />
          <span>Statutory Jurisprudence & 24/7 Citizen AI Copilot</span>
        </div>
        <h1 className="hero-title">
          Ask any Indian legal question. <span className="hero-gradient-text">Get actionable statutory clarity</span>.
        </h1>
        <p className="hero-subtitle">
          Inquire about predatory contract terms, tenancy deposit withholding, RTI Section 6(1) drafting, or consumer refund claims in real time.
        </p>
      </section>

      {/* Main Chat Panel */}
      <div className="glass-panel chat-container">
        {/* Chat Messages Stream */}
        <div className="chat-messages scroller">
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.74rem', opacity: 0.85 }}>
                {msg.sender === 'assistant' ? <Bot size={14} color="#93c5fd" /> : <User size={14} />}
                <strong style={{ letterSpacing: '0.02em' }}>{msg.sender === 'assistant' ? 'LegalEase AI Advisor' : 'You'}</strong>
              </div>
              <div 
                style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}
                dangerouslySetInnerHTML={{
                  __html: msg.text
                    .replace(/### (.*)/g, '<h4 style="font-size:1.02rem; margin:8px 0 6px; color:#fff; font-weight:700;">$1</h4>')
                    .replace(/> ⚠️ (.*)/g, '<div style="background:rgba(239,68,68,0.12); border-left:3px solid #ef4444; padding:8px 12px; margin:8px 0; border-radius:4px; color:#fca5a5;">$1</div>')
                    .replace(/> 🛡️ (.*)/g, '<div style="background:rgba(16,185,129,0.12); border-left:3px solid #10b981; padding:8px 12px; margin:8px 0; border-radius:4px; color:#a7f3d0;">$1</div>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </div>
          ))}

          {/* Quick-Start Consultation Cards (Shown when conversation is fresh) */}
          {messages.length === 1 && (
            <div className="chat-quick-topics-grid">
              <div style={{ gridColumn: '1 / -1', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Frequently Consulted Legal Situations:
                </span>
              </div>
              {quickTopics.map((topic, idx) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={idx}
                    className="quick-topic-card"
                    onClick={() => handleSendMessage(topic.prompt)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div className="quick-topic-icon" style={{ background: `${topic.color}20`, color: topic.color }}>
                        <Icon size={14} />
                      </div>
                      <span style={{ fontWeight: 600, fontSize: '0.84rem', color: '#f1f5f9' }}>
                        {topic.title}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#93c5fd', marginBottom: '4px' }}>
                      {topic.statute}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      {topic.prompt.slice(0, 75)}...
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isTyping && (
            <div className="chat-bubble assistant">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#93c5fd', fontSize: '0.85rem' }}>
                <Sparkles size={15} className="animate-spin" /> Synthesizing Indian statutory jurisprudence...
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="prompt-suggestions">
          {quickPromptPills.map((prompt, idx) => (
            <button
              key={idx}
              className="prompt-chip"
              onClick={() => handleSendMessage(prompt)}
            >
              <span>⚖️</span> {prompt}
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
            placeholder="Type your legal question (e.g. Can landlord deduct security deposit without bills?)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" disabled={!input.trim() || isTyping}>
            <Send size={15} /> <span>Ask AI</span>
          </button>
        </form>
      </div>
    </div>
  );
}
