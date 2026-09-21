import React, { useState } from 'react';
import { 
  PhoneCall, 
  X, 
  ShieldAlert, 
  ShoppingBag, 
  Scale, 
  Headphones, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const HELPLINE_DATA = [
  {
    id: 'cyber',
    number: '1930',
    title: 'National Cyber Financial Fraud Helpline',
    authority: 'Ministry of Home Affairs & I4C',
    icon: ShieldAlert,
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    description: 'Call within golden hours (< 2-3 hours) of any unauthorized UPI, netbanking, or card fraud to initiate immediate account freeze/lien.',
    statute: 'Information Technology Act, 2000 & RBI 3-day zero-liability circular'
  },
  {
    id: 'consumer',
    number: '1915',
    title: 'National Consumer Helpline (NCH)',
    authority: 'Dept of Consumer Affairs, Govt of India',
    icon: ShoppingBag,
    color: '#f59e0b',
    bgColor: 'rgba(245, 158, 11, 0.1)',
    description: 'Toll-free lodging of grievances against e-commerce platforms, airlines, defective products, hidden charges, or unfair contracts.',
    statute: 'Consumer Protection Act, 2019 (Sec 2(47))'
  },
  {
    id: 'nalsa',
    number: '15100',
    title: 'NALSA Free Legal Aid Helpline',
    authority: 'National Legal Services Authority',
    icon: Scale,
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    description: 'Free legal consultation and state-appointed legal defense for eligible citizens, women, workers, and underprivileged persons.',
    statute: 'Legal Services Authorities Act, 1987 (Article 39A Constitution of India)'
  },
  {
    id: 'telelaw',
    number: '14455',
    title: 'Tele-Law Legal Advisory Desk',
    authority: 'Ministry of Law & Justice',
    icon: Headphones,
    color: '#10b981',
    bgColor: 'rgba(16, 185, 129, 0.1)',
    description: 'Direct video/voice consultation with panel advocates regarding property disputes, family matters, labor wages, and FIR issues.',
    statute: 'Department of Justice Civic Empowerment Initiative'
  }
];

export default function HelplineModal({ isOpen, onClose }) {
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="modal-icon-badge">
              <PhoneCall size={18} color="#fbbf24" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                Statutory Citizen Emergency Desks
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Direct official government toll-free emergency numbers in India
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>

        {/* Modal Content / Cards */}
        <div className="modal-body">
          <div className="helpline-grid">
            {HELPLINE_DATA.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedId === item.id;
              return (
                <div key={item.id} className="helpline-card" style={{ borderLeft: `3px solid ${item.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: item.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Icon size={15} color={item.color} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {item.authority}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <a 
                        href={`tel:${item.number}`}
                        className="helpline-dial-pill"
                        title={`Dial ${item.number}`}
                      >
                        <PhoneCall size={12} />
                        <span>{item.number}</span>
                      </a>
                      <button 
                        className="helpline-copy-btn"
                        onClick={() => handleCopy(item.id, item.number)}
                        title="Copy number"
                      >
                        {isCopied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.45, margin: '0 0 0.5rem 0' }}>
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.7rem', color: '#94a3b8' }}>
                    <ShieldCheck size={12} color="#10b981" />
                    <span>{item.statute}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            All numbers listed are verified statutory hotlines operating under GoI jurisdictions.
          </span>
          <button className="btn-secondary" onClick={onClose} style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
