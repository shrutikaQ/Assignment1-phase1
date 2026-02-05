// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import scansReducer from './Scanslice';
import severityReducer from './severityslice';
import themeReducer from './themeslice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    severity: severityReducer,
    scans: scansReducer,    // <-- MUST be present and named 'scans'
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;