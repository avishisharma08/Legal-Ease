import React, { useState, useEffect } from 'react';
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
  Scale,
  Sliders,
  Download,
  Edit3,
  RefreshCw,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function CitizenRights({ onNavigateToRTI, onAskAssistant }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideId, setSelectedGuideId] = useState('tenant-deposit');
  const [copied, setCopied] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);

  // Structured notice customization state
  const [noticeForm, setNoticeForm] = useState({
    senderName: 'Ayush Pandey',
    senderContact: '+91 98765 43210 | citizen@legalease.in',
    senderAddress: 'Apt 402, Lotus Towers, Sector 62, Noida, UP - 201301',
    opponentName: 'Shri Rajesh Sharma (Landlord / Vendor)',
    opponentAddress: 'Plot 18, Commercial Block, Sector 18, Noida, UP',
    disputedAmount: '₹65,000',
    incidentDate: '15th May 2024',
    noticeDays: '15',
    transactionRef: 'AGR/2023-24/09'
  });

  const activeGuide = CITIZEN_RIGHTS_GUIDES.find(g => g.id === selectedGuideId) || CITIZEN_RIGHTS_GUIDES[0];
  const [customNoticeBody, setCustomNoticeBody] = useState(activeGuide.sampleNotice.body);

  const handleSelectGuide = (guide) => {
    setSelectedGuideId(guide.id);
    setCustomNoticeBody(guide.sampleNotice.body);
    // Update reasonable defaults based on guide category
    if (guide.id === 'tenant-deposit') {
      setNoticeForm(prev => ({
        ...prev,
        opponentName: 'Shri R. K. Verma (Landlord)',
        disputedAmount: '₹60,000',
        transactionRef: 'Rental Lease Agreement dated 01-Jun-2023'
      }));
    } else if (guide.id === 'consumer-defective') {
      setNoticeForm(prev => ({
        ...prev,
        opponentName: 'Customer Grievance Redressal Officer, E-Commerce Retail Ltd.',
        disputedAmount: '₹34,999',
        transactionRef: 'Order Invoice #INV-2024-99823'
      }));
    } else if (guide.id === 'employee-salary') {
      setNoticeForm(prev => ({
        ...prev,
        opponentName: 'The Management & Human Resources, TechNova Solutions Pvt. Ltd.',
        disputedAmount: '₹1,45,000',
        transactionRef: 'Employee ID #EMP-8841 (Relieving Dues)'
      }));
    } else if (guide.id === 'cyber-fraud') {
      setNoticeForm(prev => ({
        ...prev,
        opponentName: 'The Branch Manager & Nodal Grievance Officer, State Bank of India',
        disputedAmount: '₹48,500',
        transactionRef: 'Unauthorized UPI UTR #412093849102'
      }));
    }
  };

  const generateDynamicNotice = () => {
    const today = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    const refYear = new Date().getFullYear();
    const refId = `REF: LE-IND/${refYear}-${(refYear + 1).toString().slice(-2)}/NT-${Math.floor(1000 + Math.random() * 9000)}`;

    return `================================================================================
FORMAL STATUTORY LEGAL DEMAND NOTICE
DISPATCH MODE: REGISTERED POST WITH ACKNOWLEDGEMENT DUE (RPAD) & SPEED POST
REF NO: ${refId}
BARCODE / CONSIGNMENT TRACKING: [AFFIX INDIA POST BARCODE STICKER HERE]
================================================================================

DATE: ${today}

TO:
${noticeForm.opponentName}
${noticeForm.opponentAddress}

FROM (CLAIMANT / CITIZEN):
${noticeForm.senderName}
${noticeForm.senderAddress}
Contact / Phone: ${noticeForm.senderContact}

SUBJECT: STATUTORY LEGAL DEMAND NOTICE UNDER ${activeGuide.applicableLaw.toUpperCase()} FOR IMMEDIATE REMISSION OF ${noticeForm.disputedAmount}

Sir / Madam,

Under instructions and information from my client / undersigned, this formal Legal Demand Notice is hereby served upon you:

1. BACKGROUND & TRANSACTION REFERENCE:
Pursuant to the transaction and legal relationship under Transaction Reference [${noticeForm.transactionRef}], entered into on or about ${noticeForm.incidentDate}, the claimant has complied with all lawful covenants.

2. STATUTORY VIOLATION UNDER APPLICABLE INDIAN LAW:
Under the binding provisions of ${activeGuide.applicableLaw}:
${activeGuide.keyRights.map((r, i) => `   (${String.fromCharCode(97 + i)}) ${r}`).join('\n')}

Despite repeated oral requests, emails, and amicable entreaties, you have willfully, unlawfully, and without reasonable cause withheld / defaulted on the sum of ${noticeForm.disputedAmount}. This willful default constitutes actionable deficiency and breach under Indian law.

3. PEREMPTORY REQUISITION:
I hereby formally call upon you to unconditionally disburse and credit the lawful sum of ${noticeForm.disputedAmount} into the claimant's bank account within a peremptory window of ${noticeForm.noticeDays} (FIFTEEN) DAYS from the date of receipt of this notice.

4. NOTICE OF IMPENDING LEGAL PROCEEDINGS:
TAKE NOTICE that if you fail to comply with the statutory demand within the stipulated ${noticeForm.noticeDays} days, the claimant shall immediately institute formal proceedings before the competent Forum / Rent Tribunal / Consumer Commission (e-Daakhil) / Labor Commissioner / Civil Court:
   (a) For recovery of the principal sum of ${noticeForm.disputedAmount} along with penal interest at 18% per annum from default date until realization;
   (b) Exemplary damages of ₹50,000 for mental agony, harassment, and deficiency of service;
   (c) Full litigation expenses, advocate fees, and court costs at your sole risk and consequence.

A copy of this notice and proof of delivery (RPAD Postal Receipt) are preserved for tender as primary documentary evidence in court under Section 61 of the Bharatiya Sakshya Adhiniyam 2023.

Yours faithfully,

________________________________________
${noticeForm.senderName}
(Claimant / Complainant)
New Delhi / India

================================================================================
STATUTORY COMPLIANCE SEAL:
Drafted pursuant to Codified Laws of the Republic of India (MTA 2021 / CPA 2019 / ICA 1872)
Digitally Verified & Watermarked via LegalEase IND Institutional Platform
================================================================================`;
  };

  const activeNoticeText = isWizardOpen ? generateDynamicNotice() : customNoticeBody;

  const filteredGuides = CITIZEN_RIGHTS_GUIDES.filter((guide) => {
    const matchesCat = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.applicableLaw.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyNotice = () => {
    navigator.clipboard.writeText(activeNoticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([activeNoticeText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `Legal_Demand_Notice_${activeGuide.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-pill">
          <Scale size={14} /> Citizen Rights & Statutory Remedies Hub
        </div>
        <h1 className="hero-title">
          Know your statutory protections. <span className="text-gradient">Take decisive legal action</span>.
        </h1>
        <p className="hero-subtitle">
          Plain-English rights breakdowns for tenants, consumers, employees, and cyber fraud victims with 1-click printable legal demand notices.
        </p>

        <div className="trust-ribbon">
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Model Tenancy Act 2021 Ready</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Consumer Protection Act 2019 (e-Daakhil)</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Payment of Wages Act 1936</span>
          </div>
          <div className="trust-ribbon-sep" />
          <div className="trust-ribbon-item">
            <CheckCircle2 size={13} className="trust-check-icon" />
            <span>Speed Post AD Ready Formatting</span>
          </div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem' }}>
        <div className="search-bar-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search citizen rights (e.g. security deposit, defective product refund, unpaid salary, UPI fraud)..."
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
                background: selectedCategory === cat.id ? 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)' : 'rgba(255,255,255,0.05)',
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
            Statutory Guides ({filteredGuides.length})
          </h3>

          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className={`glass-panel ${selectedGuideId === guide.id ? 'selected-card' : ''}`}
              style={{ 
                padding: '1.25rem', 
                cursor: 'pointer',
                borderColor: selectedGuideId === guide.id ? 'var(--primary)' : 'var(--border-color)',
                boxShadow: selectedGuideId === guide.id ? '0 0 16px rgba(37, 99, 235, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
              onClick={() => handleSelectGuide(guide)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '1.05rem', margin: 0, color: selectedGuideId === guide.id ? '#93c5fd' : 'var(--text-main)' }}>
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
            <p style={{ fontSize: '0.84rem', color: '#93c5fd', margin: '4px 0 0 0' }}>
              Governing Statute: <strong>{activeGuide.applicableLaw}</strong>
            </p>
          </div>

          {/* Key Rights Section */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '1.25rem' }}>
            <h3 style={{ fontSize: '0.95rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 0 }}>
              <CheckCircle2 size={16} /> Your Statutory Protections & Citizen Rights:
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                  <FileText size={17} color="var(--primary)" /> 
                  <span>Statutory Legal Demand Notice</span>
                </h3>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Legally enforceable notice under {activeGuide.applicableLaw}
                </span>
              </div>

              {/* Mode Toggle & Actions */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                <button 
                  className={`btn-secondary ${isWizardOpen ? 'active-toggle' : ''}`}
                  style={{ padding: '6px 11px', fontSize: '0.78rem' }}
                  onClick={() => setIsWizardOpen(!isWizardOpen)}
                >
                  <Sliders size={13} color={isWizardOpen ? '#93c5fd' : 'var(--text-muted)'} />
                  <span>{isWizardOpen ? 'Manual Text Editor' : '⚡ Interactive Notice Wizard'}</span>
                </button>

                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 11px', fontSize: '0.78rem' }} 
                  onClick={handleCopyNotice}
                  title="Copy formatted notice to clipboard"
                >
                  {copied ? <><Check size={13} color="#34d399" /> Copied!</> : <><Copy size={13} /> Copy</>}
                </button>

                <button 
                  className="btn-secondary" 
                  style={{ padding: '6px 11px', fontSize: '0.78rem' }} 
                  onClick={handleDownloadTxt}
                  title="Download notice as plain text file"
                >
                  <Download size={13} /> .TXT
                </button>

                <button 
                  className="btn-primary" 
                  style={{ padding: '6px 14px', fontSize: '0.78rem' }} 
                  onClick={handlePrint}
                  title="Print or Save as PDF"
                >
                  <Printer size={13} /> Print Notice
                </button>
              </div>
            </div>

            {/* Interactive Notice Wizard Form */}
            {isWizardOpen && (
              <div className="notice-wizard-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Notice Variables (Auto-Injected into Legal Letter)
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Fill details once, updates in real time
                  </span>
                </div>

                <div className="wizard-form-grid">
                  <div className="wizard-field">
                    <label>Citizen / Sender Full Name:</label>
                    <input 
                      type="text" 
                      className="custom-input wizard-input"
                      value={noticeForm.senderName}
                      onChange={(e) => setNoticeForm({ ...noticeForm, senderName: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Disputed Amount in ₹ INR:</label>
                    <input 
                      type="text" 
                      className="custom-input wizard-input"
                      value={noticeForm.disputedAmount}
                      onChange={(e) => setNoticeForm({ ...noticeForm, disputedAmount: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Opposite Party (Landlord / Company / Bank):</label>
                    <input 
                      type="text" 
                      className="custom-input wizard-input"
                      value={noticeForm.opponentName}
                      onChange={(e) => setNoticeForm({ ...noticeForm, opponentName: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Opposite Party Address / Branch:</label>
                    <input 
                      type="text" 
                      className="custom-input wizard-input"
                      value={noticeForm.opponentAddress}
                      onChange={(e) => setNoticeForm({ ...noticeForm, opponentAddress: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Transaction / Lease Reference / Invoice #:</label>
                    <input 
                      type="text" 
                      className="custom-input wizard-input"
                      value={noticeForm.transactionRef}
                      onChange={(e) => setNoticeForm({ ...noticeForm, transactionRef: e.target.value })}
                    />
                  </div>

                  <div className="wizard-field">
                    <label>Peremptory Notice Window (Days):</label>
                    <select 
                      className="custom-input wizard-input"
                      value={noticeForm.noticeDays}
                      onChange={(e) => setNoticeForm({ ...noticeForm, noticeDays: e.target.value })}
                    >
                      <option value="7">7 Days (Urgent Settlement)</option>
                      <option value="15">15 Days (Standard Legal Notice)</option>
                      <option value="30">30 Days (Statutory Government/Corporate)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Printable Notice Paper Viewer */}
            <div className="printable-notice-container">
              <div className="printable-notice-badge">
                <span>Official Legal Notice Draft</span>
                <span>Speed Post AD Standard</span>
              </div>
              <textarea 
                className="printable-notice scroller"
                rows={16}
                value={activeNoticeText}
                onChange={(e) => {
                  setCustomNoticeBody(e.target.value);
                  if (isWizardOpen) setIsWizardOpen(false);
                }}
              />
            </div>
          </div>

          {/* Official Government E-Filing & Redressal Gateway */}
          <div className="gov-efiling-panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Building2 size={14} /> Official Government E-Filing & Portal Gateway:
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Official portals to submit notice copies
              </span>
            </div>
            <div className="gov-portals-grid">
              <a href="https://edaakhil.nic.in" target="_blank" rel="noreferrer" className="gov-portal-pill">
                <span className="gov-portal-dot" />
                <span><strong>e-Daakhil Portal</strong> (Consumer Court Online)</span>
                <ExternalLink size={11} />
              </a>
              <a href="https://rtionline.gov.in" target="_blank" rel="noreferrer" className="gov-portal-pill">
                <span className="gov-portal-dot" />
                <span><strong>RTI Online Portal</strong> (Central Government)</span>
                <ExternalLink size={11} />
              </a>
              <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="gov-portal-pill">
                <span className="gov-portal-dot" />
                <span><strong>Cybercrime Portal (1930)</strong></span>
                <ExternalLink size={11} />
              </a>
              <a href="https://nalsa.gov.in" target="_blank" rel="noreferrer" className="gov-portal-pill">
                <span className="gov-portal-dot" />
                <span><strong>NALSA Free Legal Aid (Art. 39A)</strong></span>
                <ExternalLink size={11} />
              </a>
            </div>
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
              <MessageSquareText size={15} color="#93c5fd" /> Ask Legal Assistant <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
