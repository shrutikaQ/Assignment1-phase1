import React from 'react';
import './NewScan.css';

type AssetType = 'IP' | 'DNS';
type Bandwidth = 'Low' | 'Medium' | 'High';
type LaunchMode = 'now' | 'later';

type ScanForm = {
  title: string;
  bandwidth: Bandwidth;
  assetType: AssetType;
  targetMode: 'all' | 'select';
  targets: string;
  launch: LaunchMode;
  scheduleAt?: string; // ISO string yyyy-MM-ddThh:mm
};

const defaultForm: ScanForm = {
  title: '',
  bandwidth: 'Medium',
  assetType: 'IP',
  targetMode: 'all',
  targets: '',
  launch: 'now',
  scheduleAt: '',
};

const FieldRequired = () => <span className="req" aria-hidden>*</span>;

const InfoIcon = ({ title }: { title: string }) => (
  <span className="info" role="img" aria-label="info" title={title}>ⓘ</span>
);

export default function ScanSettings() {
  const [form, setForm] = React.useState<ScanForm>(defaultForm);
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const onChange = <K extends keyof ScanForm>(key: K, val: ScanForm[K]) => {
    setForm(prev => ({ ...prev, [key]: val }));
    setErrors(prev => ({ ...prev, [key as string]: '' }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!form.title.trim()) next.title = 'Title is required.';
    if (form.targetMode === 'select' && !form.targets.trim()) {
      next.targets = 'Please enter one or more IPs/DNS targets.';
    }
    if (form.launch === 'later' && !form.scheduleAt) {
      next.scheduleAt = 'Please choose a date & time.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate submit
    const payload = {
      ...form,
      targetsParsed:
        form.targetMode === 'all'
          ? 'ALL'
          : form.targets
              .split(/[\s,;\n]+/)
              .map(s => s.trim())
              .filter(Boolean),
    };

    console.log('[ScanSettings] submit', payload);
    alert('Scan scheduled successfully (mock)!');
  };

  const handleCancel = () => {
    setForm(defaultForm);
    setErrors({});
  };

  return (
    <div className="scan-page">
      <div className="scan-grid">
        {/* ===== Left: Form Card ===== */}
        <form className="scan-card" onSubmit={handleSubmit} noValidate>
          <header className="scan-head">
            <div className="scan-icon" aria-hidden>
              <ShieldIcon />
            </div>
            <div>
              <h1 className="scan-title">Scan Settings</h1>
              <p className="scan-sub">Configure bandwidth, targets, and launch behavior</p>
            </div>
          </header>

          <div className="scan-body">
            {/* Title */}
            <div className="row">
              <label htmlFor="title" className="lbl">
                Title <FieldRequired />
              </label>
              <div className="fld">
                <input
                  id="title"
                  className={`inp ${errors.title ? 'err' : ''}`}
                  placeholder="Enter a descriptive scan title"
                  value={form.title}
                  onChange={e => onChange('title', e.target.value)}
                  aria-describedby={errors.title ? 'err-title' : undefined}
                />
                {errors.title && (
                  <div id="err-title" className="err-msg">{errors.title}</div>
                )}
              </div>
            </div>

            {/* Bandwidth */}
            <div className="row">
              <label className="lbl">
                Bandwidth <FieldRequired />
              </label>
              <div className="fld fld-inline">
                <select
                  className="select"
                  value={form.bandwidth}
                  onChange={e => onChange('bandwidth', e.target.value as Bandwidth)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
                <InfoIcon title="Controls scan aggressiveness. High = faster scans, potentially more network load." />
              </div>
            </div>

            {/* Asset Type */}
            <div className="row">
              <label className="lbl">
                Asset Type <FieldRequired />
              </label>
              <div className="fld">
                <div className="radios">
                  <label className="radio">
                    <input
                      type="radio"
                      name="asset"
                      checked={form.assetType === 'IP'}
                      onChange={() => onChange('assetType', 'IP')}
                    />
                    <span>IP</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="asset"
                      checked={form.assetType === 'DNS'}
                      onChange={() => onChange('assetType', 'DNS')}
                    />
                    <span>DNS</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Targets */}
            <section className="group">
              <div className="group-head">
                <h3 className="group-title">Target IPs / Hosts</h3>
                <span className="muted">Choose all assets or add a list</span>
              </div>

              <div className="group-body">
                <div className="row">
                  <label className="lbl">Target Mode</label>
                  <div className="fld">
                    <div className="radios radios-row">
                      <label className="radio">
                        <input
                          type="radio"
                          name="tmode"
                          checked={form.targetMode === 'all'}
                          onChange={() => onChange('targetMode', 'all')}
                        />
                        <span>All IPs</span>
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="tmode"
                          checked={form.targetMode === 'select'}
                          onChange={() => onChange('targetMode', 'select')}
                        />
                        <span>Select IPs / Hosts</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className={`row ${form.targetMode === 'all' ? 'is-disabled' : ''}`}>
                  <label htmlFor="targets" className="lbl">List</label>
                  <div className="fld">
                    <textarea
                      id="targets"
                      className={`ta ${errors.targets ? 'err' : ''}`}
                      placeholder="e.g. 10.10.1.10, 10.10.1.11 or host1.example.com (comma, space, or newline separated)"
                      rows={6}
                      value={form.targets}
                      onChange={e => onChange('targets', e.target.value)}
                      disabled={form.targetMode === 'all'}
                      aria-describedby={errors.targets ? 'err-targets' : undefined}
                    />
                    {errors.targets && (
                      <div id="err-targets" className="err-msg">{errors.targets}</div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Launch */}
            <section className="group">
              <div className="group-head">
                <h3 className="group-title">Launch</h3>
                <span className="muted">Start now or schedule for a later time</span>
              </div>

              <div className="group-body">
                <div className="row">
                  <label className="lbl">
                    Launch Mode <FieldRequired />
                  </label>
                  <div className="fld">
                    <div className="radios radios-row">
                      <label className="radio">
                        <input
                          type="radio"
                          name="launch"
                          checked={form.launch === 'now'}
                          onChange={() => onChange('launch', 'now')}
                        />
                        <span>Launch Now</span>
                      </label>
                      <label className="radio">
                        <input
                          type="radio"
                          name="launch"
                          checked={form.launch === 'later'}
                          onChange={() => onChange('launch', 'later')}
                        />
                        <span>Schedule for Later</span>
                      </label>
                    </div>
                  </div>
                </div>

                {form.launch === 'later' && (
                  <div className="row">
                    <label htmlFor="scheduleAt" className="lbl">
                      Date &amp; Time <FieldRequired />
                    </label>
                    <div className="fld">
                      <input
                        id="scheduleAt"
                        type="datetime-local"
                        className={`inp ${errors.scheduleAt ? 'err' : ''}`}
                        value={form.scheduleAt}
                        onChange={e => onChange('scheduleAt', e.target.value)}
                        aria-describedby={errors.scheduleAt ? 'err-schedule' : undefined}
                      />
                      {errors.scheduleAt && (
                        <div id="err-schedule" className="err-msg">{errors.scheduleAt}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Sticky action bar */}
          <footer className="scan-actions">
            <button type="button" className="btn ghost" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn primary">
              {form.launch === 'now' ? 'Start Scan' : 'Schedule Scan'}
            </button>
          </footer>
        </form>

        {/* ===== Right: Live Summary ===== */}
        <aside className="scan-side">
          <div className="side-card">
            <h3 className="side-title">Summary</h3>
            <dl className="kv">
              <dt>Title</dt>
              <dd>{form.title || <span className="muted">Untitled</span>}</dd>

              <dt>Bandwidth</dt>
              <dd>{form.bandwidth}</dd>

              <dt>Asset Type</dt>
              <dd>{form.assetType}</dd>

              <dt>Targets</dt>
              <dd>
                {form.targetMode === 'all'
                  ? 'All IPs'
                  : form.targets.trim()
                    ? `${form.targets.split(/[\s,;\n]+/).filter(Boolean).length} selected`
                    : <span className="muted">None</span>}
              </dd>

              <dt>Launch</dt>
              <dd>
                {form.launch === 'now'
                  ? 'Launch Now'
                  : form.scheduleAt
                    ? new Date(form.scheduleAt).toLocaleString()
                    : 'Scheduled (unset)'}
              </dd>
            </dl>
            <div className="tip">
              <span className="tip-dot" aria-hidden />
              Scans may take longer with **LOW** bandwidth on throttled networks.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ============ Inline SVG Icon ============ */
function ShieldIcon() {
  return (
    <svg viewBox="0 0 64 64" width="28" height="28" aria-hidden>
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b7bff" />
          <stop offset="100%" stopColor="#7f5bff" />
        </linearGradient>
      </defs>
      <path
        d="M32 4l22 8v14c0 14-9.6 25.6-22 28C19.6 51.6 10 40 10 26V12l22-8z"
        fill="url(#g1)"
      />
      <path d="M23 30l6 6 12-12" stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}