import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchScans, selectScans, selectScanFilters, selectScansLoading } from '../store/Scanslice';

export default function ScansList() {
  const dispatch = useAppDispatch();
  const scans = useAppSelector(selectScans);
  const filters = useAppSelector(selectScanFilters);
  const loading = useAppSelector(selectScansLoading);

  useEffect(() => {
    // initial load
    dispatch(fetchScans());
  }, [dispatch]);

  const filtered = scans.filter(s => {
    const statusOk = filters.status === 'all' || s.status === filters.status;
    const q = (filters.search ?? '').toLowerCase().trim();
    const matches = !q || s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
    return statusOk && matches;
  });

  return (
    <div>
      {loading && <div>Loading scans…</div>}
      {!loading && filtered.length === 0 && <div>No scans found.</div>}
      <ul>
        {filtered.map(s => (
          <li key={s.id} style={{ padding:'8px 10px', border:'1px solid #ddd', borderRadius:8, marginBottom:8 }}>
            <strong>{s.name}</strong> — {s.id} — <em>{s.status}</em>
            <div style={{ fontSize:12, opacity:.8 }}>{new Date(s.startedAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}