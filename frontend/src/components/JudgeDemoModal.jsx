import React from 'react';
import { 
  Zap, 
  X, 
  Scale, 
  FileText, 
  ShieldAlert, 
  Building2, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Award
} from 'lucide-react';

export default function JudgeDemoModal({ isOpen, onClose, onLaunchDemo }) {
  if (!isOpen) return null;

  const demoScenarios = [
    {
      id: 'demo-contract',
      title: 'Forensic Contract Audit & Redline Studio',
      tab: 'analyzer',
      badge: 'Contract Act 1872 & ₹ INR',
      badgeColor: '#3b82f6',
      icon: FileText,
      description: 'Audit predatory freelance agreement: detect uncapped indemnity, IP forfeiture, and ₹2,50,000 penalty. Switch to Hindi executive summary and launch the 4-tab Redline Negotiation Studio.',
      points: ['₹ INR Realism & Statutory Grounding', 'Bilingual [ English | हिंदी ] Mode', 'Predatory vs Fair Counter-Offer Diff Cards']
    },
    {
      id: 'demo-notice',
      title: '1-Click Printable Legal Demand Notice',
      tab: 'rights',
      badge: 'Model Tenancy & CPA 2019',
      badgeColor: '#f59e0b',
      icon: ShieldAlert,
      description: 'Open the Interactive Notice Wizard for tenant security deposit withholding. Injects citizen & landlord variables into a Speed Post AD formal legal notice with 1-click print.',
      points: ['Dynamic Variable Injection', 'Speed Post AD Tracking & Certified Stamp', 'Clean @media print Formal Typography']
    },
    {
      id: 'demo-rti',
      title: 'Section 6(1) PWD Road Repair RTI Petition',
      tab: 'rti',
      badge: 'RTI Act 2005 Section 6(1)',
      badgeColor: '#10b981',
      icon: Building2,
      description: 'Load complete civic petition demanding road repair tender work orders, contractor measurement book (MB) records, and 30-day statutory response timeline.',
      points: ['Official SPIO/CPIO Addressing', 'BPL Fee Exemption Clause', '30-Day Response & First Appeal Tracker']
    },
    {
      id: 'demo-bns',
      title: 'New Criminal Justice Code: BNS 2023 Crosswalk',
      tab: 'bns',
      badge: 'Effective 1 July 2024',
      badgeColor: '#8b5cf6',
      icon: Flame,
      description: 'Demonstrates cutting-edge compliance with India\'s 2024 criminal laws. Convert IPC 420 (Cheating) to BNS Section 318(4) with BNSS procedural safeguards.',
      points: ['IPC ➔ BNS 2023 Crosswalk', 'Zero FIR & Digital Evidence (BSA Sec 61)', 'Comparative Penalties & Bailable Status']
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content judge-demo-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid var(--border-color)', padding: '1.25rem 1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="judge-badge-icon">
              <Award size={20} color="#fbbf24" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                  Judge & Hackathon Presentation Tour
                </h2>
                <span className="judge-pill-live">
                  <Sparkles size={11} /> 1-Click Interactive Demos
                </span>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                Designed for 3-minute evaluation pitches. Click any scenario below to immediately trigger a live, pre-populated demonstration flow without manual typing.
              </p>
            </div>
          </div>
          <button className="btn-ghost modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Demo Cards Grid */}
        <div className="modal-body scroller" style={{ padding: '1.5rem 1.75rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {demoScenarios.map((demo) => {
            const Icon = demo.icon;
            return (
              <div 
                key={demo.id} 
                className="judge-demo-card"
                onClick={() => {
                  onLaunchDemo(demo.tab);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="judge-card-icon" style={{ background: `${demo.badgeColor}20`, color: demo.badgeColor }}>
                      <Icon size={16} />
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: demo.badgeColor }}>
                      {demo.badge}
                    </span>
                  </div>
                  <span className="launch-text-pill">
                    Run Flow <ArrowRight size={12} />
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f8fafc', margin: '0 0 6px 0' }}>
                  {demo.title}
                </h3>

                <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                  {demo.description}
                </p>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.75rem', color: '#93c5fd', lineHeight: 1.6 }}>
                    {demo.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer with Pitch Tips */}
        <div className="modal-footer" style={{ borderTop: '1px solid var(--border-color)', padding: '1rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(7, 10, 16, 0.95)' }}>
          <div style={{ fontSize: '0.76rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} /> 
            <span>Pro-Tip: Highlight <strong>BNS 2023</strong> and <strong>Model Tenancy Act 2021</strong> compliance during your verbal pitch.</span>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '6px 14px' }} onClick={onClose}>
            Close Showcase
          </button>
        </div>
      </div>
    </div>
  );
}
