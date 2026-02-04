import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeslice';
import severityReducer from './severityslice'; 
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    // keep your other reducers here if you have them
    severity: severityReducer,  
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;