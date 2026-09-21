import React from 'react';
import { 
  FileText, 
  Building2, 
  Shield, 
  BookOpen, 
  Bot, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  PhoneCall, 
  FileCheck2, 
  ShieldAlert, 
  Clock, 
  Lock,
  ChevronRight,
  Zap,
  HelpCircle,
  Award
} from 'lucide-react';

export default function HomePage({ onNavigate, onOpenHelplines }) {
  const features = [
    {
      id: 'analyzer',
      badge: 'OCR & Redline Studio Intelligence',
      badgeColor: '#3b82f6',
      badgeBg: 'rgba(59, 130, 246, 0.12)',
      title: 'Forensic Contract Analyzer',
      description: 'Audit agreements, drop PDFs/scanned images (OCR), view bilingual English & हिंदी summaries, listen via Suno Audio, and generate redline counter-offers.',
      icon: FileText,
      stats: '1872 Contract Act & ₹ INR Grounded',
      highlights: ['OCR Drag & Drop Document Ingestion', 'Bilingual [ English | हिंदी ] Mode', 'Redline Counter-Offer Studio & Diff Cards'],
      cta: 'Open Contract Analyzer'
    },
    {
      id: 'rti',
      badge: 'Civic Transparency Engine',
      badgeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
      title: 'Section 6(1) RTI Assistant',
      description: 'Draft official Right to Information petitions to public authorities. Demand inspection of road repairs, PDS ration distribution, university evaluations, or police ATRs.',
      icon: Building2,
      stats: 'RTI Act 2005 Mandated',
      highlights: ['English & Hindi Bilingual Petitions', '30-Day Response Tracker', 'One-Click Print & PDF Ready'],
      cta: 'Draft an RTI Application'
    },
    {
      id: 'rights',
      badge: 'Printable Demand Notice Wizard',
      badgeColor: '#f59e0b',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
      title: 'Citizen Rights & Legal Notices',
      description: 'Defend yourself against illegal rent hikes, withheld security deposits, defective goods, and salary delays with live printable Speed Post AD legal notices.',
      icon: Shield,
      stats: 'Model Tenancy 2021 & CPA 2019',
      highlights: ['Interactive Notice Variable Wizard', '1-Click Print & PDF Formal Letterhead', 'Section 20 MTA & Section 35 CPA Ready'],
      cta: 'Open Legal Notice Wizard'
    },
    {
      id: 'dictionary',
      badge: 'Plain Language Demystifier',
      badgeColor: '#8b5cf6',
      badgeBg: 'rgba(139, 92, 246, 0.12)',
      title: 'Legal Glossary & Jargon Decoder',
      description: 'No more confusing legalese or Latin phrases. Search 50+ intimidating contract terms like Indemnification, Force Majeure, Severability, and Liquidated Damages.',
      icon: BookOpen,
      stats: 'Everyday Plain Analogies',
      highlights: ['Categorized by Risk & Subject', 'Real-World Everyday Examples', 'Actionable Practical Context'],
      cta: 'Browse Legal Glossary'
    },
    {
      id: 'assistant',
      badge: 'Conversational Legal Guide',
      badgeColor: '#06b6d4',
      badgeBg: 'rgba(6, 182, 212, 0.12)',
      title: '24/7 AI Legal Advisor',
      description: 'Ask free-form questions about consumer complaints, tenancy disputes, employment rights, or police complaints. Strictly grounded in codified Indian jurisprudence.',
      icon: Bot,
      stats: 'Zero-Hallucination Mode',
      highlights: ['Interactive Step-by-Step Guidance', 'Statute & Section Citations', 'Free Civic Consultation'],
      cta: 'Consult Legal Advisor'
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Showcase Section */}
      <section className="home-hero">
        <div className="hero-pill">
          <Scale size={14} className="hero-pill-icon" />
          <span>Institutional Civic & Legal Intelligence Platform</span>
        </div>

        <h1 className="home-hero-title">
          Demystifying Indian Law. <br />
          <span className="hero-gradient-text">Empowering Every Citizen</span>.
        </h1>

        <p className="home-hero-subtitle">
          From forensic contract risk analysis to official Section 6(1) RTI drafting and tenant-consumer dispute notices—LegalEase transforms intimidating legal systems into accessible, actionable clarity.
        </p>

        {/* Dual Primary Call-to-Actions */}
        <div className="home-hero-actions">
          <button 
            className="btn-primary home-cta-btn"
            onClick={() => onNavigate('analyzer')}
          >
            <Zap size={18} />
            <span>Analyze a Contract / Document</span>
            <ArrowRight size={16} />
          </button>

          <button 
            className="btn-secondary home-cta-btn"
            onClick={() => onNavigate('rti')}
          >
            <Building2 size={18} color="#10b981" />
            <span>Draft Section 6(1) RTI</span>
          </button>

          <button 
            className="btn-secondary home-cta-btn"
            onClick={() => onNavigate('rights')}
          >
            <Shield size={18} color="#f59e0b" />
            <span>Check Citizen Rights & Notices</span>
          </button>
        </div>

        {/* Trust Ribbon Bar */}
        <div className="trust-ribbon" style={{ marginTop: '2rem' }}>
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Indian Contract Act 1872</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>RTI Act 2005 Section 6(1)</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Consumer Protection Act 2019</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Zero Legal Fees • 100% Civic</span>
          </div>
        </div>
      </section>

      {/* Emergency Helpline Banner Strip */}
      <section className="emergency-banner-card glass-panel">
        <div className="emergency-banner-content">
          <div className="emergency-badge-pulse">
            <PhoneCall size={18} color="#ef4444" />
          </div>
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.98rem', fontWeight: 700, margin: 0 }}>
              Need Urgent Statutory Assistance?
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', margin: '2px 0 0 0' }}>
              Access direct Government of India helplines: <strong>1930</strong> (Cyber Fraud), <strong>1915</strong> (Consumer Complaints), <strong>15100</strong> (NALSA Legal Aid), <strong>14455</strong> (Tele-Law).
            </p>
          </div>
        </div>

        <button 
          className="btn-helpline-trigger"
          onClick={onOpenHelplines}
          style={{ padding: '8px 16px', fontSize: '0.82rem' }}
        >
          <PhoneCall size={14} />
          <span>Open Emergency Desks (1930 / 1915)</span>
        </button>
      </section>

      {/* Feature Suite Grid (5 Specialized Pillars) */}
      <section className="home-feature-section">
        <div className="section-header-centered">
          <span className="selector-label" style={{ color: '#93c5fd' }}>
            Comprehensive Legal-Tech Suite
          </span>
          <h2 style={{ fontSize: '1.9rem', fontWeight: 700, color: '#fff', margin: '6px 0 10px' }}>
            Five Specialized Pillars of Civic Intelligence
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '640px', margin: '0 auto' }}>
            Each tool is purpose-built to give Indian citizens, freelancers, tenants, and consumers the same legal leverage as institutional legal teams.
          </p>
        </div>

        <div className="home-features-grid">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id} 
                className="home-feature-card glass-panel"
                onClick={() => onNavigate(feat.id)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div 
                    className="feature-icon-box"
                    style={{ background: feat.badgeBg, border: `1px solid ${feat.badgeColor}35` }}
                  >
                    <Icon size={22} color={feat.badgeColor} />
                  </div>

                  <span 
                    className="feature-statute-pill"
                    style={{ color: feat.badgeColor, background: feat.badgeBg, border: `1px solid ${feat.badgeColor}30` }}
                  >
                    {feat.stats}
                  </span>
                </div>

                <div className="feature-category-label" style={{ color: feat.badgeColor }}>
                  {feat.badge}
                </div>

                <h3 className="feature-card-title">
                  {feat.title}
                </h3>

                <p className="feature-card-desc">
                  {feat.description}
                </p>

                <div className="feature-highlights-list">
                  {feat.highlights.map((h, i) => (
                    <div key={i} className="highlight-row">
                      <CheckCircle2 size={13} color="#10b981" style={{ flexShrink: 0 }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="feature-card-footer">
                  <span className="feature-cta-text" style={{ color: feat.badgeColor }}>
                    {feat.cta}
                  </span>
                  <div className="feature-cta-arrow" style={{ background: feat.badgeBg, color: feat.badgeColor }}>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works (Workflow Overview) */}
      <section className="how-it-works-section glass-panel">
        <div className="section-header-centered" style={{ marginBottom: '2rem' }}>
          <span className="selector-label" style={{ color: 'var(--gold-light)' }}>
            Methodology & Integrity
          </span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', margin: '6px 0 8px' }}>
            How LegalEase Operates
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '580px', margin: '0 auto' }}>
            Built on grounded legal jurisprudence, not hallucinated AI advice.
          </p>
        </div>

        <div className="steps-cards-row">
          <div className="workflow-step-card">
            <div className="step-num-badge">01</div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: '0.75rem 0 0.4rem' }}>
              Input Your Facts or Document
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
              Paste your agreement text, upload a scanned PDF/Image, or choose from pre-configured citizen dispute scenarios.
            </p>
          </div>

          <div className="workflow-step-card">
            <div className="step-num-badge">02</div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: '0.75rem 0 0.4rem' }}>
              Statutory Grounding & Audit
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
              Clauses are cross-examined against Indian legal statutes (Indian Contract Act 1872, RTI Act 2005, Model Tenancy Act, CPA 2019).
            </p>
          </div>

          <div className="workflow-step-card">
            <div className="step-num-badge">03</div>
            <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: '0.75rem 0 0.4rem' }}>
              Actionable Deliverable
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
              Receive an audit risk scorecard, plain-English translations, printable bilingual RTI applications, or formal legal demand notices.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Launch Bottom Banner */}
      <section className="quick-launch-cta glass-panel">
        <div style={{ maxWidth: '620px' }}>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#fff', marginBottom: '0.4rem' }}>
            Ready to audit a contract or demand government accountability?
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            Start immediately without any sign-up barrier. Free, grounded, and privacy-first.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            className="btn-primary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
            onClick={() => onNavigate('analyzer')}
          >
            <Zap size={16} />
            <span>Launch Contract Analyzer</span>
          </button>
          <button 
            className="btn-secondary"
            style={{ padding: '0.75rem 1.4rem', fontSize: '0.88rem' }}
            onClick={() => onNavigate('assistant')}
          >
            <Bot size={16} />
            <span>Talk to AI Advisor</span>
          </button>
        </div>
      </section>
    </div>
  );
}
