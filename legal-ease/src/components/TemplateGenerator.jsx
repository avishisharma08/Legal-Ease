import React, { useState } from 'react';
import { FileCheck, Download, Copy, Check, Sparkles, RefreshCw, FileSearch } from 'lucide-react';

export default function TemplateGenerator({ onAnalyzeGenerated }) {
  const [templateType, setTemplateType] = useState('nda');
  
  // Form fields
  const [partyA, setPartyA] = useState('Acme Technologies Inc.');
  const [partyB, setPartyB] = useState('Jane Doe (Contractor)');
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().split('T')[0]);
  const [jurisdiction, setJurisdiction] = useState('State of California, USA');
  const [paymentAmount, setPaymentAmount] = useState('$5,000');
  const [paymentTerms, setPaymentTerms] = useState('Net 15');
  const [durationYears, setDurationYears] = useState('2');
  const [liabilityCap, setLiabilityCap] = useState('capped to total fees paid');
  
  const [copied, setCopied] = useState(false);

  // Generate dynamic legal text
  const generateDocumentText = () => {
    if (templateType === 'nda') {
      return `MUTUAL NON-DISCLOSURE AGREEMENT (NDA)

This Mutual Non-Disclosure Agreement ("Agreement") is made effective as of ${effectiveDate}, by and between:

DISCLOSING PARTY: ${partyA} ("Party A")
RECEIVING PARTY: ${partyB} ("Party B")

1. PURPOSE & SCOPE.
Party A and Party B intend to evaluate and engage in a potential commercial business relationship. In connection with this purpose, each party may disclose to the other certain proprietary and confidential information.

2. DEFINITION OF CONFIDENTIAL INFORMATION.
"Confidential Information" refers to non-public information, technical data, trade secrets, software code, design mocks, customer lists, and financial records disclosed verbally or in writing, clearly designated or reasonably understood to be confidential.

3. OBLIGATIONS & TERM.
The receiving party agrees to hold all Confidential Information in strict confidence for a period of ${durationYears} year(s) from the date of disclosure. Disclosure to third parties is strictly prohibited without prior written permission.

4. BALANCED LIABILITY & CAP.
Total cumulative financial liability arising from accidental breach of this agreement shall be ${liabilityCap}.

5. GOVERNING LAW.
This Agreement shall be governed by and construed in accordance with the laws of the ${jurisdiction}.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

${partyA}
By: ___________________________

${partyB}
By: ___________________________`;
    }

    if (templateType === 'freelance') {
      return `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement ("Agreement") is entered into as of ${effectiveDate}, between:

CLIENT: ${partyA}
CONTRACTOR: ${partyB}

1. SERVICES & COMPENSATION.
Contractor agrees to perform design and software engineering services. Client shall pay Contractor the sum of ${paymentAmount} under ${paymentTerms} payment terms upon receipt of invoice.

2. INTELLECTUAL PROPERTY & PAYMENT CONDITIONALITY.
All work products, deliverables, and associated copyright created by Contractor shall become the exclusive property of Client ONLY UPON FULL RECEIPT OF ALL APPLICABLE PAYMENTS. Contractor retains full title prior to final settlement.

3. INDEPENDENT STATUS.
Contractor is an independent contractor and not an employee or agent of Client. Neither party has authority to bind the other in any contract.

4. LIMITATION OF LIABILITY.
Contractor's maximum aggregate financial liability under any claim shall be ${liabilityCap}.

5. DISPUTE RESOLUTION.
Any controversy arising out of this Agreement shall be settled by binding arbitration in accordance with the laws of the ${jurisdiction}.

CLIENT: ${partyA}
Signature: ______________________ Date: _________

CONTRACTOR: ${partyB}
Signature: ______________________ Date: _________`;
    }

    return `STANDARD CONSULTING & ADVISORY AGREEMENT

Effective Date: ${effectiveDate}
Between: ${partyA} ("Company") and ${partyB} ("Advisor")

1. ADVISORY SERVICES.
Advisor agrees to provide strategic advisement services. Compensation of ${paymentAmount} shall be remitted payable ${paymentTerms}.

2. CONFIDENTIALITY & NON-CIRCUMVENTION.
Advisor agrees not to disclose Company secrets for ${durationYears} years. 

3. GOVERNING JURISDICTION.
Construed under the laws of ${jurisdiction}.

Company Rep: _______________________
Advisor Rep: _______________________`;
  };

  const documentContent = generateDocumentText();

  const handleCopy = () => {
    navigator.clipboard.writeText(documentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([documentContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${templateType}_${partyA.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <section className="hero-banner">
        <div className="hero-pill">
          <FileCheck size={14} /> Smart Legal Contract Builder
        </div>
        <h1 className="hero-title">
          Generate fair, custom agreements <span className="text-gradient">in under 60 seconds</span>.
        </h1>
        <p className="hero-subtitle">
          Craft balanced NDAs, Freelance Agreements, and Advisory terms with payment safeguards and liability caps included.
        </p>
      </section>

      <div className="generator-layout">
        {/* Left Controls */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--primary)" /> Configure Document Parameters
          </h3>

          <div className="form-group">
            <label className="form-label">Agreement Type</label>
            <select
              className="form-select"
              value={templateType}
              onChange={(e) => setTemplateType(e.target.value)}
            >
              <option value="nda">Mutual Non-Disclosure Agreement (NDA)</option>
              <option value="freelance">Freelance Independent Contractor Agreement</option>
              <option value="consulting">Consulting & Advisory Services Agreement</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Party A (Client / Discloser)</label>
              <input
                type="text"
                className="form-input"
                value={partyA}
                onChange={(e) => setPartyA(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Party B (Contractor / Receiver)</label>
              <input
                type="text"
                className="form-input"
                value={partyB}
                onChange={(e) => setPartyB(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Effective Date</label>
              <input
                type="date"
                className="form-input"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Governing Jurisdiction</label>
              <input
                type="text"
                className="form-input"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
              />
            </div>
          </div>

          {templateType !== 'nda' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Compensation Amount</label>
                <input
                  type="text"
                  className="form-input"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Payment Terms</label>
                <select
                  className="form-select"
                  value={paymentTerms}
                  onChange={(e) => setPaymentTerms(e.target.value)}
                >
                  <option value="Net 15">Net 15 Days</option>
                  <option value="Net 30">Net 30 Days</option>
                  <option value="50% Upfront, 50% Completion">50% Upfront, 50% Completion</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="form-group">
              <label className="form-label">Confidentiality Term (Years)</label>
              <input
                type="number"
                className="form-input"
                value={durationYears}
                onChange={(e) => setDurationYears(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Liability Limitation Clause</label>
            <select
              className="form-select"
              value={liabilityCap}
              onChange={(e) => setLiabilityCap(e.target.value)}
            >
              <option value="capped to total fees paid">Fair Cap (Equal to total fees paid)</option>
              <option value="capped to $50,000 maximum">Fixed Cap ($50,000 Maximum)</option>
              <option value="limited to direct actual damages only">Direct Damages Only</option>
            </select>
          </div>
        </div>

        {/* Right Preview */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Live Generated Contract Preview
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleCopy}>
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }} onClick={handleDownload}>
                <Download size={14} /> Download .TXT
              </button>
            </div>
          </div>

          <div className="preview-container">
            {documentContent}
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%' }}
            onClick={() => onAnalyzeGenerated && onAnalyzeGenerated(documentContent)}
          >
            <FileSearch size={16} /> Send This Contract to Analyzer for AI Risk Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
