import type { Metadata, Viewport } from 'next';
import { Manrope, Noto_Serif } from 'next/font/google';
import { Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import '@/app/stylex.css';
import '@/app/globals.css';
import { rootLayoutStyles } from '@/app/layout.stylex';
import StyledComponentsRegistry from '@/app/styled-components-registry';
import { uiThemeProbeContract, uiThemeProbeEntries, uiThemeProbeStyles } from '@/components/shared/Ui.stylex';
import InputPerformanceMode from '@/components/InputPerformanceMode';
import AppTelemetry from '@/components/platform/AppTelemetry';
import AppThemeBoundary from '@/components/theme/AppThemeBoundary';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { I18nProvider } from '@/lib/i18n/context';
import { ThemeProvider } from '@/lib/theme/context';
import { defaultLanguage } from '@/lib/i18n/shared';
import { shouldEnableTelemetry } from '@/lib/platform/runtime';
import {
  themePrimitiveProbeStyles,
} from '@/lib/stylex/primitives.stylex';

export const metadata: Metadata = {
  title: 'Silent Moonfall | Guild Portal',
  description: 'Official Silent Moonfall guild portal for Justice Mobile players.',
  keywords: ['justice mobile', 'silent moonfall', 'guild', 'guild portal', 'mmorpg'],
  authors: [{ name: 'Silent Moonfall' }],
  openGraph: {
    title: 'Silent Moonfall | Guild Portal',
    description: 'Official Silent Moonfall guild portal for Justice Mobile players.',
    type: 'website',
    locale: 'ru_RU',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const bodyFont = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-body',
});

const displayFont = Noto_Serif({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '700', '800'],
});

const themeBootScript = `(function(){try{var key='silent-moonfall-theme-mode';var stored=localStorage.getItem(key);var mode=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var resolved=mode==='system'?(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):mode;document.documentElement.dataset.theme=resolved;document.documentElement.dataset.themeMode=mode;document.body.dataset.theme=resolved;document.body.dataset.themeMode=mode;}catch(_error){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const themeProbeSlot = (
    <div
      data-testid="theme-primitives-probe"
      data-theme-primitives={uiThemeProbeContract.join(',')}
      aria-hidden="true"
      {...stylex.props(uiThemeProbeStyles.rail)}
    >
      <div {...stylex.props(uiThemeProbeStyles.stack)}>
        {uiThemeProbeEntries.map((entry) => {
          if (entry.primitive === 'pageChrome') {
            return <div key={entry.testId} data-testid={entry.testId} data-theme-probe-primitive={entry.primitive} {...stylex.props(...entry.styles, uiThemeProbeStyles.page)} />;
          }

          if (entry.primitive === 'button') {
            return (
              <button key={entry.testId} data-testid={entry.testId} data-theme-probe-primitive={entry.primitive} type="button" tabIndex={-1} {...stylex.props(...entry.styles, uiThemeProbeStyles.button)}>
                Theme probe
              </button>
            );
          }

          if (entry.primitive === 'input') {
            return <input key={entry.testId} data-testid={entry.testId} data-theme-probe-primitive={entry.primitive} tabIndex={-1} readOnly value="Theme probe" {...stylex.props(...entry.styles)} />;
          }

          if (entry.primitive === 'overlayPanelNarrow') {
            return <div key={entry.testId} data-testid={entry.testId} data-theme-probe-primitive={entry.primitive} {...stylex.props(...entry.styles, uiThemeProbeStyles.overlay)} />;
          }

          return <div key={entry.testId} data-testid={entry.testId} data-theme-probe-primitive={entry.primitive} {...stylex.props(...entry.styles, uiThemeProbeStyles.surface)} />;
        })}
      </div>
    </div>
  );

  return (
    <html lang={defaultLanguage} className={`${bodyFont.variable} ${displayFont.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>
          <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
          <InputPerformanceMode />
          <ThemeProvider>
            <AppThemeBoundary qaSlot={themeProbeSlot}>
              <QueryProvider>
                <I18nProvider>
                  <Suspense fallback={<div {...stylex.props(rootLayoutStyles.fallback)} />}>
                    <div {...stylex.props(rootLayoutStyles.content)}>{children}</div>
                  </Suspense>
                </I18nProvider>
              </QueryProvider>
            </AppThemeBoundary>
          </ThemeProvider>
          <AppTelemetry enabled={shouldEnableTelemetry()} />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
