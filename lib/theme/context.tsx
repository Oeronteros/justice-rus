'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ThemeMode = 'system' | 'dark' | 'light';
export type ResolvedTheme = 'dark' | 'light';

const THEME_CHANGE_EVENT = 'silent-moonfall-theme-modechange';

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setMode: (mode: ThemeMode) => void;
  cycleMode: () => void;
}

const STORAGE_KEY = 'silent-moonfall-theme-mode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      setModeState(stored);
      setResolvedTheme(resolveTheme(stored));
      return;
    }

    setResolvedTheme(resolveTheme('system'));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const syncTheme = () => {
      setResolvedTheme(resolveTheme(mode));
    };

    syncTheme();
    mediaQuery.addEventListener('change', syncTheme);

    return () => {
      mediaQuery.removeEventListener('change', syncTheme);
    };
  }, [mode]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleThemeModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode?: ThemeMode; resolvedTheme?: ResolvedTheme }>;
      const nextMode = customEvent.detail?.mode;
      const nextResolvedTheme = customEvent.detail?.resolvedTheme;

      if (nextMode === 'system' || nextMode === 'dark' || nextMode === 'light') {
        setModeState(nextMode);
        setResolvedTheme(nextResolvedTheme === 'light' || nextResolvedTheme === 'dark' ? nextResolvedTheme : resolveTheme(nextMode));
      }
    };

    window.addEventListener(THEME_CHANGE_EVENT, handleThemeModeChange as EventListener);

    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, handleThemeModeChange as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.themeMode = mode;
    document.body.dataset.theme = resolvedTheme;
    document.body.dataset.themeMode = mode;
  }, [mode, resolvedTheme]);

  const setMode = useCallback((nextMode: ThemeMode) => {
    setModeState(nextMode);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextMode);
    }
  }, []);

  const cycleMode = useCallback(() => {
    setMode(mode === 'system' ? 'dark' : mode === 'dark' ? 'light' : 'system');
  }, [mode, setMode]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode,
      resolvedTheme,
      setMode,
      cycleMode,
    }),
    [cycleMode, mode, resolvedTheme, setMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export function useOptionalTheme() {
  return useContext(ThemeContext);
}
