export type ScanStatus = 'queued' | 'running' | 'completed' | 'failed';
export interface Scan {
  id: string;
  name: string;
  status: ScanStatus;
  startedAt: string;
}

let MOCK_SCANS: Scan[] = [
  { id: 'S-1001', name: 'Weekly PCI Scan', status: 'completed', startedAt: new Date(Date.now()-86400000).toISOString() },
  { id: 'S-1002', name: 'Quick check',     status: 'running',   startedAt: new Date(Date.now()-600000).toISOString() },
];

export const fakeApi = {
  async listScans(): Promise<Scan[]> {
    await new Promise(r => setTimeout(r, 600)); // simulate network delay
    return JSON.parse(JSON.stringify(MOCK_SCANS));
  },
  async startScan(name: string): Promise<Scan> {
    await new Promise(r => setTimeout(r, 800));
    const s: Scan = {
      id: 'S-' + Math.floor(1000 + Math.random()*9000),
      name,
      status: 'queued',
      startedAt: new Date().toISOString(),
    };
    MOCK_SCANS = [s, ...MOCK_SCANS];
    return s;
  }
};