// src/pages/Home/Home.tsx
import React from 'react';
import type { HomePageData } from '@types';

// ✅ Chart: reads data from Redux and updates reactively
import SeverityBarChart from '../../components/charts/SeverityBarChart';

type HomeProps = {
  data: HomePageData;
  onNewScan?: () => void; // optional callback to open New Scan page
};

const Home: React.FC<HomeProps> = ({ data, onNewScan }) => {
  const { banner, stats, /* severityLabels, */ scanDetails, support } = data;

  return (
    <section className="content-grid" aria-label="Home content">
      {/* LEFT / MAIN COLUMN */}
      <div className="col-main">
        {/* Banner */}
        <div className="panel banner" role="region" aria-label="status banner">
          <div className="banner-left">
            <div className="status-dot" aria-hidden="true" />
            <div>
              <div className="banner-title">{banner.status}</div>
              <div className="compliance-row">
                <span className="pill pill-danger">{banner.compliance}</span>
                <span className="muted">{banner.complianceNote}</span>
              </div>
            </div>
          </div>

          <div className="banner-actions">
            {banner.actions.map((a, idx) => {
              const isPrimary = idx === 0;
              const props = isPrimary
                ? { onClick: onNewScan } // clicking first button opens New Scan (if provided)
                : { onClick: () => console.log(a, 'clicked') };
              return (
                <button
                  key={a}
                  className={`btn-pill ${isPrimary ? 'primary' : ''}`}
                  type="button"
                  {...props}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid-2 gap16">
          <div className="panel stat-card stat-blue" role="region" aria-label="total hosts">
            <div className="stat-title">Total Hosts</div>
            <div className="stat-value">{stats.totalHosts.value}</div>
            <div className="stat-note">{stats.totalHosts.note}</div>
          </div>

          <div
            className="panel stat-card stat-orange"
            role="region"
            aria-label="live host in compliance"
          >
            <div className="stat-title">Live Host in compliance</div>
            <div className="stat-value">{stats.liveCompliance.value}</div>
            <div className="stat-note">{stats.liveCompliance.note}</div>
          </div>
        </div>

        {/* ===========================
            Severity (replaces purple "Vulnerability Distribution" box)
            =========================== */}
        <section
          aria-label="Vulnerability Distribution"
          style={{
            background: 'var(--surface, #ede9fe)',
            border: '1px solid var(--border-color, #e2e8f0)',
            borderRadius: 12,
            padding: 16,
            marginTop: 16,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <h3 style={{ margin: 0 }}>Severity</h3>

            {/* Optional legend (kept compact and in sync with chart colors) */}
            <div style={{ display: 'flex', gap: 12, fontSize: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }}
                />
                Critical
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#f97316' }}
                />
                High
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }}
                />
                Medium
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <span
                  style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }}
                />
                Low
              </span>
            </div>
          </div>

          <div style={{ marginTop: 8 }}>
            <SeverityBarChart />
          </div>
        </section>

        {/* ❌ Removed the old decorative bars block */}
        {/* <div className="bars" aria-hidden="true">
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div> */}

        {/* Scan details */}
        <div className="panel" role="region" aria-label="scan details">
          <div className="panel-head row">
            <div className="panel-title">Scan Details</div>
            <div className="panel-sub">Current Scan Information and history</div>
          </div>

          <div className="grid-3 gap16 small-cards">
            <div className="mini-card">
              <div className="mini-title">SCAN STATUS</div>
              <div className="mini-value">{scanDetails.status}</div>
              <div className="mini-note started">● {scanDetails.statusNote}</div>
            </div>

            <div className="mini-card">
              <div className="mini-title">LAST SUBMITTED</div>
              <div className="mini-value">{scanDetails.lastSubmitted}</div>
              <div className="mini-note">No previous scans</div>
            </div>

            <div className="mini-card">
              <div className="mini-title">NEXT DUE</div>
              <div className="mini-value">{scanDetails.nextDue}</div>
              <div className="mini-note">Schedule a Scan to set</div>
            </div>
          </div>

          <div className="row btn-row">
            <button className="btn-long success" type="button" onClick={onNewScan}>
              {scanDetails.footerButtons[0]}
            </button>
            <button className="btn-long outline" type="button">
              {scanDetails.footerButtons[1]}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT / SUPPORT COLUMN */}
      <aside className="col-support" role="complementary" aria-label="support">
        <div className="panel support">
          <div className="support-title">{support.title}</div>
          <div className="support-sub">{support.subtitle}</div>

          <ul className="support-list">
            {support.items.map((q) => (
              <li key={q} className="support-item">
                <span className="support-icon" aria-hidden>
                  📄
                </span>
                <span className="support-text">{q}</span>
                <span className="support-go" aria-hidden>
                  ↗
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button className="panel big-cta" type="button" aria-label={support.ctaPrimary}>
          {support.ctaPrimary} ↗
        </button>

        <div className="panel contact">
          <div className="contact-title">{support.contactTitle}</div>
          <button className="link" type="button" aria-label={support.contactCta}>
            {support.contactCta} ↗
          </button>
        </div>
      </aside>
    </section>
  );
};

export default Home;