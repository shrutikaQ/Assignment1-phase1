import React from 'react';
import './ContactSupport.css';

type CommonTask = {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  onClick?: () => void;
};

export const ContactSupport: React.FC = () => {
  // Mock actions – wire these to your routing or handlers
  const tasks: CommonTask[] = [
    {
      icon: <IconTrash />,
      label: 'Remove IPs',
      onClick: () => console.log('Remove IPs clicked'),
    },
    {
      icon: <IconPlus />,
      label: 'Add IPs',
      onClick: () => console.log('Add IPs clicked'),
    },
    {
      icon: <IconDoc />,
      label: 'Request False Positive Review/ Addendum',
      onClick: () => console.log('Request False Positive clicked'),
    },
    {
      icon: <IconShield />,
      label: 'Generate PCC Compliance',
      sublabel: 'Executive network report',
      onClick: () => console.log('Generate PCC clicked'),
    },
  ];

  return (
    <div className="cs-page">
      <div className="cs-card">
        {/* Header */}
        <header className="cs-header">
          <h1 className="cs-title">Contact Support</h1>

          {/* Illustration blob */}
          <div className="cs-hero">
            <div className="cs-hero-blob" aria-hidden>
              <div className="cs-hero-circle">
                <AgentIllustration />
              </div>
              <div className="cs-hero-bubble" aria-hidden>
                <span>💬</span>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome copy */}
        <section className="cs-welcome">
          <h2 className="cs-welcome-title">Welcome!</h2>
          <p className="cs-welcome-desc">
            Qualys offers around-the-clock support, every day of the year. Our
            global infrastructure is designed to provide top‑notch assistance
            wherever you need. For account management, technical assistance,
            false positive reviews, and more, don’t hesitate to reach out to our
            support team.
          </p>
        </section>

        {/* Common Tasks */}
        <section className="cs-tasks">
          <h3 className="cs-section-title">Common Tasks</h3>

          <div className="cs-task-grid">
            {tasks.map((t) => (
              <button
                key={t.label}
                type="button"
                className={`cs-task ${t.sublabel ? 'cs-task--wide' : ''}`}
                onClick={t.onClick}
                aria-label={t.label}
              >
                <span className="cs-task-icon">{t.icon}</span>
                <span className="cs-task-text">
                  <span className="cs-task-label">{t.label}</span>
                  {t.sublabel && (
                    <span className="cs-task-sublabel">{t.sublabel}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Email form */}
        <section className="cs-form">
          <h3 className="cs-section-title">Email</h3>

          <div className="cs-form-grid">
            <div className="cs-field">
              <label className="cs-label">Product:</label>
              <div className="cs-static">Qualysguard PCI</div>
            </div>

            <div className="cs-field">
              <label className="cs-label">To:</label>
              <div className="cs-static">Qualysguard PCI Support</div>
            </div>

            <div className="cs-field cs-field--full">
              <label htmlFor="subject" className="cs-label required">
                Subject
              </label>
              <input
                id="subject"
                className="cs-input"
                placeholder="Add a concise subject"
              />
            </div>

            <div className="cs-field cs-field--full">
              <label htmlFor="message" className="cs-label">
                Message
              </label>
              <textarea
                id="message"
                className="cs-textarea"
                rows={6}
                placeholder="Describe the issue or request. Include IPs, scan IDs, dates, etc."
              />
            </div>

            <div className="cs-actions cs-field--full" role="group" aria-label="form actions">
              <button type="button" className="cs-btn cs-btn--ghost">
                Cancel
              </button>
              <button type="button" className="cs-btn cs-btn--primary">
                Submit
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

/* =======================
   Inline SVG Icons
   ======================= */

function IconTrash() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 3h6l1 2h4v2H4V5h4l1-2zM6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 13h8M8 17h8M8 9h4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3l8 3v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-3z"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AgentIllustration() {
  return (
    <svg viewBox="0 0 160 160" width="100%" height="100%" aria-hidden>
      <defs>
        <linearGradient id="hair" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2B2C7F" />
          <stop offset="100%" stopColor="#3D3FE0" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="78" fill="#EEF2FF" />
      <circle cx="80" cy="80" r="56" fill="#DDE3FF" />
      <circle cx="80" cy="74" r="18" fill="#FFD3B6" />
      <path d="M54 112c6-12 18-18 26-18s20 6 26 18" fill="#7E83FF" />
      <path d="M60 60c0 0 10-16 24-14 10 2 18 8 20 20" fill="url(#hair)" />
      <rect x="98" y="74" width="20" height="14" rx="7" fill="#7E83FF" />
      <circle cx="116" cy="81" r="4" fill="#FFFFFF" />
      <rect x="60" y="86" width="12" height="10" rx="5" fill="#FFFFFF" />
      <circle cx="66" cy="91" r="2" fill="#7E83FF" />
    </svg>
  );
}
