import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SeverityKey = 'Critical' | 'High' | 'Medium' | 'Low';

export type SeverityState = {
  // counts of vulns per severity
  counts: Record<SeverityKey, number>;
  // optional trend (if you later add line chart)
  history: { ts: string; counts: Record<SeverityKey, number> }[];
};

const initialState: SeverityState = {
  counts: {
    Critical: 12,
    High: 28,
    Medium: 41,
    Low: 17,
  },
  history: [],
};

const severitySlice = createSlice({
  name: 'severity',
  initialState,
  reducers: {
    // Replace counts in one go
    setSeverityCounts: (state, action: PayloadAction<Record<SeverityKey, number>>) => {
      state.counts = action.payload;
    },
    // Update one key
    setSeverityCount: (state, action: PayloadAction<{ key: SeverityKey; value: number }>) => {
      state.counts[action.payload.key] = action.payload.value;
    },
    // (Optional) push a snapshot for trend charts
    pushSnapshot: (state, action: PayloadAction<{ ts: string; counts: Record<SeverityKey, number> }>) => {
      state.history.push(action.payload);
    },
  },
});

export const { setSeverityCounts, setSeverityCount, pushSnapshot } = severitySlice.actions;
export default severitySlice.reducer;

// selectors
export const selectSeverityCounts = (state: any) => state.severity.counts as Record<SeverityKey, number>;
export const selectSeverityHistory = (state: any) => state.severity.history;