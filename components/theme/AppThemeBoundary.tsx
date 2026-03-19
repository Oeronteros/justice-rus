'use client';

import * as stylex from '@stylexjs/stylex';
import { useEffect, useRef } from 'react';
import { rootLayoutStyles } from '@/app/layout.stylex';
import { useTheme, type ThemeMode } from '@/lib/theme/context';
import { appShellStyles } from '@/lib/stylex/primitives.stylex';
import { mergeStylexProps } from '@/lib/stylex/utils';
import { moonlitTheme, wuxiaTheme } from '@/lib/stylex/theme.stylex';

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

type ThemeToggleHarnessElement = HTMLDivElement & {
  setThemeMode?: (mode: ThemeMode) => void;
};

const darkThemeClassName = stylex.props(wuxiaTheme).className ?? '';
const lightThemeClassName = stylex.props(moonlitTheme).className ?? '';
const darkThemeClassTokens = darkThemeClassName.split(' ').filter(Boolean).join('|');
const lightThemeClassTokens = lightThemeClassName.split(' ').filter(Boolean).join('|');

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

  const themeProps = mergeStylexProps(
    stylex.props(
      resolvedTheme === 'light' ? moonlitTheme : wuxiaTheme,
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
      data-theme-class-dark={darkThemeClassTokens}
      data-theme-class-light={lightThemeClassTokens}
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
