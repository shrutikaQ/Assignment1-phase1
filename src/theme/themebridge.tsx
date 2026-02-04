import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { useAppSelector } from '../store/hooks';
// NOTE: adjust the import path to your slice filename:
import { selectThemeMode } from '../store/themeslice'; // or '../store/themeSlice'

export default function MuiThemeBridge({ children }: { children: React.ReactNode }) {
  const mode = useAppSelector(selectThemeMode); // 'light' | 'dark'
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        // You can map CSS vars to MUI if desired:
        // components: { ... },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies MUI baseline styles that react to palette mode */}
      {children}
    </ThemeProvider>
  );
}