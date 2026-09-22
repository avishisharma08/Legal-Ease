import React, { useState } from 'react';
import { API_BASE_URL } from '../config/api';
import { 
  Building2, 
  FileText, 
  Send, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Copy, 
  Check, 
  Printer, 
  AlertCircle, 
  Sparkles, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Languages, 
  HelpCircle,
  ShieldCheck,
  FileCheck2
} from 'lucide-react';

const COMMON_RTI_PRESETS = [
  {
    title: 'Road Repair & Pothole Work Inspection',
    dept: 'Public Works Department (PWD) / Municipal Corporation',
    subject: 'Details of sanctioned funds, contractor details, and quality inspection for road repairs in [Area]',
    queries: [
      'Certified copy of the work order, tender agreement, and sanctioned budget for road construction/repair of [Road/Area Name].',
      'Name and contact details of the contractor/agency awarded the tender and the supervising executive engineer.',
      'Certified copy of the quality test inspection report and measurement book (MB) records for the completed road stretch.',
      'Details of the penalty or liquidated damages imposed, if any, for delay in completion beyond the scheduled deadline.'
    ]
  },
  {
    title: 'PDS Ration Shop Records & Stock Inspection',
    dept: 'Department of Food, Civil Supplies & Consumer Affairs',
    subject: 'Inspection of daily sales registers, grain allocation, and stock position of Fair Price Shop #[Shop No]',
    queries: [
      'Certified copy of monthly quota allocated and actual lifting records for wheat, rice, and sugar for Fair Price Shop #[Shop No] for the past 6 months.',
      'Certified copy of the daily sales register and biometric/Aadhaar point-of-sale (PoS) distribution log for the month of [Month/Year].',
      'List of active ration card holders registered at this shop and records of unlifted grain quota returned to government godowns.'
    ]
  },
  {
    title: 'University / Board Exam Answer Sheet Inspection',
    dept: 'State University / Central Board Examination Authority',
    subject: 'Certified photocopy and inspection of evaluated answer scripts for Roll No. [Roll No]',
    queries: [
      'Certified photocopies of evaluated answer books for Roll No. [Roll No] for Examination [Exam Name], Subject [Subject Name] held on [Date].',
      'Certified copy of the answer key and marking scheme provided to examiners for evaluating the aforementioned paper.',
      'Daily evaluation chart showing question-wise marks awarded and moderation/re-totalling records.'
    ]
  },
  {
    title: 'Police FIR / Complaint Action Taken Report (ATR)',
    dept: 'Office of the District Superintendent of Police / Commissioner of Police',
    subject: 'Action Taken Report (ATR) regarding Complaint dated [Date] lodged at [Police Station Name]',
    queries: [
      'Daily General Diary (GD) / Station Diary entry details concerning the complaint submitted by [Name] on [Date].',
      'Name and rank of the Investigating Officer (IO) assigned to the case and chronological status of inquiry conducted.',
      'Certified copy of the Action Taken Report (ATR) or preliminary inquiry report submitted to senior supervisory officers.'
    ]
  }
];

export const AUTHORITY_TYPES = [
  'State Government Department',
  'Central Government Department',
  'Municipal Corporation / Civic Body',
  'Police / Home Department',
  'University / Educational Board',
  'Public Sector Undertaking (PSU) / Bank'
];

export default function RTIAssistant() {
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('English');
  
  // Applicant details
  const [applicantName, setApplicantName] = useState('Rahul Sharma');
  const [address, setAddress] = useState('B-42, Sector 15, Green Park, New Delhi - 110016');
  const [contactInfo, setContactInfo] = useState('+91 98765 43210 | rahul.sharma@example.com');
  const [bplCategory, setBplCategory] = useState(false);

  // Authority details
  const [authorityType, setAuthorityType] = useState('Municipal Corporation / Civic Body');
  const [publicAuthority, setPublicAuthority] = useState('Municipal Corporation of Delhi (MCD), Engineering Division');
  const [subject, setSubject] = useState('Information regarding delayed road resurfacing and tender fund allocation in Ward 42');
  
  // Specific queries
  const [queries, setQueries] = useState([
    'Certified copy of the work order, sanctioned budget, and tender completion date for Ward 42 road repairs.',
    'Name of the private contractor awarded the work and daily progress report submitted to the Executive Engineer.',
    'Reason on record for the delay of over 4 months in completing the road construction.',
    'Certified copy of the quality test report of the bitumen and raw material utilized.'
  ]);
  const [newQueryInput, setNewQueryInput] = useState('');

  // Generated draft & status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [filingDate, setFilingDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateDeadline = (startDateStr) => {
    const start = new Date(startDateStr);
    const deadline = new Date(start);
    deadline.setDate(start.getDate() + 30);
    return deadline.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleAddQuery = () => {
    if (newQueryInput.trim()) {
      setQueries([...queries, newQueryInput.trim()]);
      setNewQueryInput('');
    }
  };

  const handleRemoveQuery = (index) => {
    setQueries(queries.filter((_, i) => i !== index));
  };

  const handleApplyPreset = (preset) => {
    setPublicAuthority(preset.dept);
    setSubject(preset.subject);
    setQueries([...preset.queries]);
  };

  const handleGenerateRTI = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch(`${API_BASE_URL}/draft-rti`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_name: applicantName,
          address: address,
          contact_info: contactInfo,
          public_authority: publicAuthority,
          authority_type: authorityType.includes('Central') ? 'Central' : 'State',
          subject: subject,
          specific_queries: queries,
          bpl_category: bplCategory,
          language: language
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'RTI generation failed');

      setGeneratedDraft(data.formatted_application);
      setStep(3);
    } catch (err) {
      console.warn('Backend draft failed, utilizing client-side legal fallback:', err);
      // Fallback generator
      const pioTitle = authorityType.includes('Central') 
        ? 'The Central Public Information Officer (CPIO)' 
        : 'The State Public Information Officer (SPIO)';

      const feeText = bplCategory
        ? 'The applicant belongs to the Below Poverty Line (BPL) category and is exempt from payment of RTI application fee under Section 7(5) of the RTI Act, 2005. (Attested BPL Card Copy enclosed).'
        : 'An application fee of Rs. 10/- has been duly remitted via Indian Postal Order (IPO) / Court Fee Stamp No. [____________________] in favor of the Accounts Officer, ' + publicAuthority + '.';

      const draft = language === 'Hindi' 
        ? `सेवा में,
जन सूचना अधिकारी (SPIO / CPIO),
${publicAuthority}

विषय: सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत आवेदन।

महोदय/महोदया,

कृपया सूचना का अधिकार अधिनियम, 2005 की धारा 6(1) के अंतर्गत निम्नलिखित बिंदुवार सूचना एवं प्रमाणित अभिलेख उपलब्ध कराने की कृपा करें:

विषय: ${subject}

वांछित सूचना का विवरण:
${queries.map((q, i) => `${i + 1}. ${q}`).join('\n')}

आवेदन शुल्क:
${feeText}

नागरिकता घोषणा:
मैं प्रमाणित करता/करती हूँ कि मैं भारत का/की नागरिक हूँ।

कृपया आरटीआई अधिनियम, 2005 की धारा 7(1) के तहत निर्धारित 30 दिनों की वैधानिक समय-सीमा में सूचना उपलब्ध कराने का कष्ट करें।

स्थान: ${address.split(',').pop() || 'नई दिल्ली'}
दिनांक: ${new Date().toLocaleDateString('hi-IN')}

भवदीय / भवदीया,
हस्ताक्षर: ___________________________
नाम: ${applicantName}
पता: ${address}
संपर्क: ${contactInfo}`
        : `FORM 'A'
[See Rule 3(1)]
APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
${pioTitle},
Office of: ${publicAuthority}

1. Full Name of the Applicant:
   ${applicantName}

2. Address for Correspondence:
   ${address}

3. Contact Details:
   ${contactInfo}

4. Subject Matter of Information:
   ${subject}

5. Specific Information Sought:
${queries.map((q, i) => `   5.${i + 1} ${q}`).join('\n')}

6. Period to which the information relates:
   Current official records / immediate preceding 12 months.

7. Application Fee Details:
   ${feeText}

8. Citizenship Declaration:
   I hereby declare and confirm that I am a Citizen of the Republic of India as defined under the Constitution of India and the Citizenship Act, 1955.

9. Mandatory Statutory Timeframe:
   As stipulated under Section 7(1) of the Right to Information Act, 2005, the requested information/certified copies must be provided within thirty (30) days from the receipt of this application.

Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
Place: ${address.split(',')[1]?.trim() || 'New Delhi'}

Yours faithfully,

________________________________________
(Signature / Thumb Impression of Applicant)
${applicantName}`;

      setGeneratedDraft(draft);
      setStep(3);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDraft);
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
          <Building2 size={14} /> Right to Information (RTI) Act, 2005 Portal
        </div>
        <h1 className="hero-title">
          Hold public authorities accountable with <span className="text-gradient">official RTI drafts</span>.
        </h1>
        <p className="hero-subtitle">
          Auto-draft legally sound applications under Section 6(1), calculate 30-day statutory response deadlines, and guide First Appeals if unanswered.
        </p>
      </section>

      {/* Progress Steps Indicator */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem' }}>
        <div className="step-indicator-bar">
          <div 
            className={`step-item ${step === 1 ? 'active' : step > 1 ? 'completed' : ''}`}
            onClick={() => setStep(1)}
          >
            <div className="step-number">{step > 1 ? <Check size={14} /> : '1'}</div>
            <div className="step-label">Department & PIO</div>
          </div>
          <div className="step-line" />
          <div 
            className={`step-item ${step === 2 ? 'active' : step > 2 ? 'completed' : ''}`}
            onClick={() => setStep(2)}
          >
            <div className="step-number">{step > 2 ? <Check size={14} /> : '2'}</div>
            <div className="step-label">Specific Queries</div>
          </div>
          <div className="step-line" />
          <div 
            className={`step-item ${step === 3 ? 'active' : ''}`}
            onClick={() => generatedDraft && setStep(3)}
          >
            <div className="step-number">3</div>
            <div className="step-label">Generated RTI & 30-Day Tracker</div>
          </div>
        </div>
      </div>

      {/* STEP 1: Authority & Applicant */}
      {step === 1 && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building2 className="text-gradient" size={22} /> Step 1: Select Public Authority & Applicant Profile
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div>
              <label className="field-label">Authority Type / Level:</label>
              <select 
                className="custom-select"
                value={authorityType} 
                onChange={(e) => setAuthorityType(e.target.value)}
              >
                {AUTHORITY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="field-label">Public Authority / Department Name:</label>
              <input 
                type="text" 
                className="custom-input"
                placeholder="e.g. Municipal Corporation of Delhi, PWD, State Police"
                value={publicAuthority}
                onChange={(e) => setPublicAuthority(e.target.value)}
              />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem', marginTop: '1rem' }}>
            <h3 style={{ fontSize: '1rem', color: '#a5b4fc', marginBottom: '1rem' }}>
              👤 Applicant Information (For Official Response by Postal Mail)
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div>
                <label className="field-label">Full Name of Applicant:</label>
                <input 
                  type="text" 
                  className="custom-input"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
              </div>

              <div>
                <label className="field-label">Contact Phone & Email:</label>
                <input 
                  type="text" 
                  className="custom-input"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label className="field-label">Complete Postal Address (Mandatory for receiving physical copy):</label>
                <textarea 
                  className="custom-input"
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="bplCheck"
                checked={bplCategory}
                onChange={(e) => setBplCategory(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              <label htmlFor="bplCheck" style={{ fontSize: '0.88rem', color: 'var(--text-main)', cursor: 'pointer' }}>
                Applicant falls under <strong>Below Poverty Line (BPL)</strong> category (exempts Rs. 10 application fee under Section 7(5))
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.75rem' }}>
            <button className="btn-primary" onClick={() => setStep(2)}>
              Proceed to Information Queries <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Queries & Smart Presets */}
      {step === 2 && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileCheck2 className="text-gradient" size={22} /> Step 2: Information Requested & Queries
            </h2>
            
            {/* Language Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: '8px' }}>
              <Languages size={15} color="#a5b4fc" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Draft Language:</span>
              <button 
                className={`prompt-chip ${language === 'English' ? 'active' : ''}`}
                style={{ padding: '4px 10px', margin: 0 }}
                onClick={() => setLanguage('English')}
              >
                English
              </button>
              <button 
                className={`prompt-chip ${language === 'Hindi' ? 'active' : ''}`}
                style={{ padding: '4px 10px', margin: 0 }}
                onClick={() => setLanguage('Hindi')}
              >
                हिंदी (Hindi)
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label className="field-label">Or Pick a Common Citizen RTI Template:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '6px' }}>
              {COMMON_RTI_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  className="sample-btn"
                  onClick={() => handleApplyPreset(p)}
                  title={p.subject}
                >
                  ⚡ {p.title}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="field-label">Subject Matter of the RTI:</label>
            <input 
              type="text" 
              className="custom-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Information regarding tender sanction and completion status of road repair"
            />
          </div>

          <div>
            <label className="field-label">Specific Questions / Records Requested:</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '6px' }}>
              {queries.map((q, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--primary)', width: '22px' }}>{idx + 1}.</span>
                  <input 
                    type="text" 
                    className="custom-input"
                    value={q}
                    onChange={(e) => {
                      const updated = [...queries];
                      updated[idx] = e.target.value;
                      setQueries(updated);
                    }}
                  />
                  <button 
                    className="btn-secondary" 
                    style={{ padding: '8px 12px', color: '#f87171' }}
                    onClick={() => handleRemoveQuery(idx)}
                    title="Remove Question"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {/* Add New Query Input */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <input 
                  type="text" 
                  className="custom-input"
                  placeholder="Type an additional question or record requested..."
                  value={newQueryInput}
                  onChange={(e) => setNewQueryInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddQuery()}
                />
                <button className="btn-secondary" onClick={handleAddQuery}>
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            <button className="btn-secondary" onClick={() => setStep(1)}>
              Back to Step 1
            </button>
            <button 
              className="btn-primary" 
              onClick={handleGenerateRTI}
              disabled={isGenerating || queries.length === 0}
            >
              {isGenerating ? (
                <><Sparkles size={16} className="animate-spin" /> Auto-Drafting Official RTI...</>
              ) : (
                <><Sparkles size={16} /> Generate Official RTI Application</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Generated Application & 30-Day Tracker */}
      {step === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
          {/* Left Column: Official RTI Document View */}
          <div className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Official RTI Application (Section 6(1))</h3>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" onClick={handleCopy}>
                  {copied ? <><Check size={14} color="#34d399" /> Copied!</> : <><Copy size={14} /> Copy</>}
                </button>
                <button className="btn-secondary" onClick={handlePrint}>
                  <Printer size={14} /> Print / PDF
                </button>
              </div>
            </div>

            {/* Legal Paper Viewer */}
            <div className="rti-paper-view">
              <pre style={{ margin: 0, fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6, fontSize: '0.88rem' }}>
                {generatedDraft}
              </pre>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <button className="btn-secondary" onClick={() => setStep(2)}>
                Edit Details
              </button>
              <button 
                className="btn-primary"
                onClick={() => {
                  setLanguage(language === 'English' ? 'Hindi' : 'English');
                  handleGenerateRTI();
                }}
              >
                <Languages size={15} /> Switch to {language === 'English' ? 'Hindi (हिंदी)' : 'English'}
              </button>
            </div>
          </div>

          {/* Right Column: 30-Day Response Timeline & First Appeal Guidance */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Timeline Card */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <Clock size={18} color="#f59e0b" />
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>30-Day Statutory Reply Tracker</h3>
              </div>
              
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Under <strong>Section 7(1) of the RTI Act 2005</strong>, the Public Authority has a mandatory obligation to supply the requested information within 30 calendar days.
              </p>

              <div style={{ marginTop: '1rem' }}>
                <label className="field-label">Date of Filing / Dispatch:</label>
                <input 
                  type="date" 
                  className="custom-input"
                  value={filingDate}
                  onChange={(e) => setFilingDate(e.target.value)}
                />
              </div>

              <div className="tracker-box" style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.82rem' }}>
                  <span>Filing Date: <strong>{filingDate}</strong></span>
                  <span style={{ color: '#f59e0b' }}>Mandatory Deadline: <strong>{calculateDeadline(filingDate)}</strong></span>
                </div>
                <div className="risk-bar-container">
                  <div className="risk-bar-fill" style={{ width: '100%', background: 'linear-gradient(90deg, #10b981 0%, #f59e0b 70%, #ef4444 100%)' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                  <span>Day 1 (Receipt)</span>
                  <span>Day 15 (PIO Review)</span>
                  <span>Day 30 (Statutory Limit)</span>
                </div>
              </div>

              <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '8px', padding: '10px 12px', marginTop: '1rem', fontSize: '0.8rem', color: '#fca5a5' }}>
                ⚡ <strong>Life & Liberty Exemption:</strong> If the information sought concerns the life or liberty of a person, Section 7(1) mandates response within <strong>48 hours</strong>!
              </div>
            </div>

            {/* Next Steps & First Appeal Card */}
            <div className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem' }}>
                <ShieldCheck size={18} color="#10b981" />
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>What if PIO Doesn't Reply? (First Appeal)</h3>
              </div>
              <ul style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.6, paddingLeft: '1.25rem', margin: 0 }}>
                <li>
                  <strong>Section 19(1) First Appeal:</strong> If no reply is received within 30 days or the reply is incomplete/misleading, you have the statutory right to file a First Appeal to the senior officer within 30 days.
                </li>
                <li>
                  <strong>Zero Fee on First Appeal:</strong> Most states do not charge any fee for filing a First Appeal under the RTI Act.
                </li>
                <li>
                  <strong>Section 20 Penalties:</strong> The Information Commission can levy a direct fine of <strong>Rs. 250 per day (up to Rs. 25,000)</strong> directly on the PIO's personal salary for willful delay!
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
