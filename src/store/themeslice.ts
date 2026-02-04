// src/store/themeslice.ts (already present)
import { createSlice } from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark';
type ThemeState = { mode: ThemeMode };

const THEME_KEY = 'app_theme_mode';

const getInitialMode = (): ThemeMode => {
  try {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {}
  if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

const slice = createSlice({
  name: 'theme',
  initialState: { mode: getInitialMode() } as ThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(THEME_KEY, state.mode); } catch {}
    },
    setTheme: (state, { payload }: { payload: ThemeMode }) => {
      state.mode = payload;
      try { localStorage.setItem(THEME_KEY, state.mode); } catch {}
    },
  },
});

export const { toggleTheme, setTheme } = slice.actions;
export default slice.reducer;
export const selectThemeMode = (state: { theme: ThemeState }) => state.theme.mode;