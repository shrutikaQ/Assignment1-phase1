// src/ThemeWatcher.tsx
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks';
import { selectThemeMode } from './store/themeslice'; // <-- lowercase 's' per your tree

export function ThemeWatcher() {
  const mode = useAppSelector(selectThemeMode); // 'light' | 'dark'

  useEffect(() => {
    // Expose Redux theme mode to the DOM for optional CSS use
    document.documentElement.dataset.theme = mode;

    // Let the browser adapt scrollbars/forms (does NOT change your app colors)
    document.documentElement.style.colorScheme = mode; // 'light' | 'dark'
  }, [mode]);

  return null;
}