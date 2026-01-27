
import { useEffect, useState } from 'react';

export function useMedia(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setMatches('matches' in e ? e.matches : (e as MediaQueryList).matches);
    };

    // initial state + subscribe
    handler(mql as any);

    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', handler as EventListener);
      return () => mql.removeEventListener('change', handler as EventListener);
    } else if (typeof mql.addListener === 'function') {
      mql.addListener(handler as any);
      return () => mql.removeListener(handler as any);
    }

    return () => {};
  }, [query]);

  return matches;
}
