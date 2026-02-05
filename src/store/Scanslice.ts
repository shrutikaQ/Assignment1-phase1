import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fakeApi, type Scan } from './fakeapi';

export interface ScanFilters {
  status?: 'all' | 'queued' | 'running' | 'completed' | 'failed';
  search?: string; // by name/id
}

interface ScansState {
  items: Scan[];
  loading: boolean;
  error?: string;
  filters: ScanFilters;
}

const initialState: ScansState = {
  items: [],
  loading: false,
  filters: { status: 'all', search: '' },
};

// Thunks (async actions)
export const fetchScans = createAsyncThunk('scans/fetchScans', async () => {
  const res = await fakeApi.listScans();
  return res as Scan[];
});

export const startNewScan = createAsyncThunk('scans/startNewScan', async (name: string) => {
  const res = await fakeApi.startScan(name);
  return res as Scan;
});

const scansSlice = createSlice({
  name: 'scans',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<ScanFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScans.pending, (state) => {
        state.loading = true; state.error = undefined;
      })
      .addCase(fetchScans.fulfilled, (state, action) => {
        state.loading = false; state.items = action.payload;
      })
      .addCase(fetchScans.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to load scans';
      })
      .addCase(startNewScan.pending, (state) => { state.loading = true; })
      .addCase(startNewScan.fulfilled, (state, action) => {
        state.loading = false; state.items = [action.payload, ...state.items];
      })
      .addCase(startNewScan.rejected, (state, action) => {
        state.loading = false; state.error = action.error.message || 'Failed to start scan';
      });
  }
});

export const { setFilters } = scansSlice.actions;
export default scansSlice.reducer;

// Selectors
export const selectScanState = (s: any) => s.scans as ScansState;
export const selectScans = (s: any) => (s.scans as ScansState).items;
export const selectScanFilters = (s: any) => (s.scans as ScansState).filters;
export const selectScansLoading = (s: any) => (s.scans as ScansState).loading;