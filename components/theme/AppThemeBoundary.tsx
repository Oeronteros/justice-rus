'use client';

import * as stylex from '@stylexjs/stylex';
import { useEffect, useRef } from 'react';
import { rootLayoutStyles } from '@/app/layout.stylex';
import { useTheme, type ThemeMode } from '@/lib/theme/context';
import { appShellStyles } from '@/lib/stylex/primitives.stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { sharedThemeClassTokens, sharedThemesByMode } from '@/lib/stylex/theme.stylex';

const themeToggleHarnessStyles = {
  position: 'fixed',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  border: 0,
  clipPath: 'inset(50%)',
  pointerEvents: 'none',
} as const;

const themeModes = ['system', 'dark', 'light'] as const;
const themePrimitivesProbeSelector = '[data-testid="theme-primitives-probe"]';

type ThemeToggleHarnessElement = HTMLDivElement & {
  setThemeMode?: (mode: ThemeMode) => void;
};

function syncThemeProbeNode(mode: ThemeMode, resolvedTheme: 'dark' | 'light') {
  const probeNode = document.querySelector(themePrimitivesProbeSelector);
  if (!probeNode) {
    return false;
  }

  probeNode.setAttribute('data-theme-current', resolvedTheme);
  probeNode.setAttribute('data-theme-mode', mode);
  probeNode.setAttribute('data-theme-ready', 'true');
  return true;
}

export default function AppThemeBoundary({ children }: { children: React.ReactNode }) {
  const { mode, resolvedTheme, setMode } = useTheme();
  const themeToggleHarnessRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const harnessNode = themeToggleHarnessRef.current as ThemeToggleHarnessElement | null;
    if (!harnessNode) {
      return;
    }

    harnessNode.setThemeMode = (nextMode: ThemeMode) => {
      setMode(nextMode);
    };

    return () => {
      delete harnessNode.setThemeMode;
    };
  }, [setMode]);

  useEffect(() => {
    let timeoutId: number | null = null;
    let attempts = 0;

    const syncProbe = () => {
      if (syncThemeProbeNode(mode, resolvedTheme) || attempts >= 10) {
        return;
      }

      attempts += 1;
      timeoutId = window.setTimeout(syncProbe, 50);
    };

    syncProbe();

    return () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [mode, resolvedTheme]);

  const themeProps = mergeStylexProps(
    stylex.props(
      sharedThemesByMode[resolvedTheme],
      rootLayoutStyles.body,
      resolvedTheme === 'light' && rootLayoutStyles.bodyLight,
      appShellStyles.page
    ),
    `theme-wuxia theme-${resolvedTheme}`
  );

  return (
    <div
      {...themeProps}
      data-testid="theme-boundary"
      data-theme={resolvedTheme}
      data-theme-mode={mode}
      data-theme-class-dark={sharedThemeClassTokens.dark}
      data-theme-class-light={sharedThemeClassTokens.light}
    >
      <div
        ref={themeToggleHarnessRef}
        style={themeToggleHarnessStyles}
        aria-hidden="true"
        data-testid="theme-toggle"
        data-theme-current={mode}
        data-theme-ready="true"
      >
        {themeModes.map((themeMode) => (
          <button
            key={themeMode}
            type="button"
            onClick={() => setMode(themeMode)}
            aria-pressed={mode === themeMode}
            data-theme-mode={themeMode}
          >
            {themeMode}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}
