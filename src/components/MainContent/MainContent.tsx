
import type { HomePageData } from '../../types';

type Props = { data: HomePageData };

export const MainContent: React.FC<Props> = ({ data }) => {
  const { banner, stats, severityLabels, scanDetails, support } = data;
  return (
    <section className="content-grid">
      {/* Left main column */}
      <div className="col-main">
        {/* Banner */}
        <div className="panel banner">
          <div className="banner-left">
            <div className="status-dot" aria-hidden="true"></div>
            <div>
              <div className="banner-title">{banner.status}</div>
              <div className="compliance-row">
                <span className="pill pill-danger">{banner.compliance}</span>
                <span className="muted">{banner.complianceNote}</span>
              </div>
            </div>
          </div>
          <div className="banner-actions">
            {banner.actions.map((a, idx) => (
              <button key={a} className={`btn-pill ${idx===0? 'primary':''}`}>{a}</button>
            ))}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid-2 gap16">
          <div className="panel stat-card stat-blue">
            <div className="stat-title">Total Hosts</div>
            <div className="stat-value">{stats.totalHosts.value}</div>
            <div className="stat-note">{stats.totalHosts.note}</div>
          </div>
          <div className="panel stat-card stat-orange">
            <div className="stat-title">Live Host in compliance</div>
            <div className="stat-value">{stats.liveCompliance.value}</div>
            <div className="stat-note">{stats.liveCompliance.note}</div>
          </div>
        </div>

        {/* Vulnerability Distribution */}
        <div className="panel purple">
          <div className="panel-head">
            <div className="panel-title">Vulnerability Distribution</div>
            <div className="panel-sub">severity breakdown by level</div>
          </div>
          <ul className="legend">
            {severityLabels.map((lbl) => (
              <li key={lbl}><span className={`dot ${lbl.toLowerCase()}`}></span>{lbl}</li>
            ))}
          </ul>
          <div className="bars">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>

        {/* Scan details */}
        <div className="panel">
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
            <button className="btn-long success">{scanDetails.footerButtons[0]}</button>
            <button className="btn-long outline">{scanDetails.footerButtons[1]}</button>
          </div>
        </div>
      </div>

      {/* Right support column */}
      <aside className="col-support">
        <div className="panel support">
          <div className="support-title">{support.title}</div>
          <div className="support-sub">{support.subtitle}</div>
          <ul className="support-list">
            {support.items.map(q => (
              <li key={q} className="support-item">
                <span className="support-icon" aria-hidden>📄</span>
                <span className="support-text">{q}</span>
                <span className="support-go" aria-hidden>↗</span>
              </li>
            ))}
          </ul>
        </div>
        <button className="panel big-cta">{support.ctaPrimary} ↗</button>
        <div className="panel contact">
          <div className="contact-title">{support.contactTitle}</div>
          <button className="link">{support.contactCta} ↗</button>
        </div>
      </aside>
    </section>
  );
};
