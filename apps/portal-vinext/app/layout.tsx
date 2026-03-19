import type { Metadata, Viewport } from 'next';
import { Manrope, Noto_Serif } from 'next/font/google';
import { Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import '@/app/stylex.css';
import '@/app/globals.css';
import { rootLayoutStyles } from '@/app/layout.stylex';
import StyledComponentsRegistry from '@/app/styled-components-registry';
import { uiPrimitives } from '@/components/shared/Ui.stylex';
import InputPerformanceMode from '@/components/InputPerformanceMode';
import AppTelemetry from '@/components/platform/AppTelemetry';
import AppThemeBoundary from '@/components/theme/AppThemeBoundary';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { I18nProvider } from '@/lib/i18n/context';
import { ThemeProvider } from '@/lib/theme/context';
import { defaultLanguage } from '@/lib/i18n/shared';
import { shouldEnableTelemetry } from '@/lib/platform/runtime';
import { spacing } from '@/lib/stylex/tokens.stylex';

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

const vinextLayoutStyles = stylex.create({
  themeProbeRail: {
    position: 'fixed',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderWidth: 0,
    clipPath: 'inset(50%)',
    pointerEvents: 'none',
  },
  themeProbeStack: {
    display: 'grid',
    gap: spacing.sm,
    width: '320px',
  },
  themeProbeSurface: {
    padding: spacing.lg,
  },
  themeProbeButton: {
    width: '100%',
  },
  themeProbeOverlay: {
    width: '320px',
    maxWidth: '320px',
    maxHeight: 'none',
    padding: spacing.lg,
  },
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLanguage} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
          <InputPerformanceMode />
          <ThemeProvider>
            <AppThemeBoundary>
              <QueryProvider>
                <I18nProvider>
                  <Suspense fallback={<div {...stylex.props(rootLayoutStyles.fallback)} />}>
                    <>
                      <div data-testid="theme-primitives-probe" aria-hidden="true" {...stylex.props(vinextLayoutStyles.themeProbeRail)}>
                        <div {...stylex.props(vinextLayoutStyles.themeProbeStack)}>
                          <div data-testid="theme-probe-card" {...stylex.props(...uiPrimitives.cardStatic, vinextLayoutStyles.themeProbeSurface)} />
                          <div data-testid="theme-probe-panel" {...stylex.props(...uiPrimitives.panel, vinextLayoutStyles.themeProbeSurface)} />
                          <button data-testid="theme-probe-button" type="button" tabIndex={-1} {...stylex.props(...uiPrimitives.secondaryButton, vinextLayoutStyles.themeProbeButton)}>
                            Theme probe
                          </button>
                          <input data-testid="theme-probe-input" tabIndex={-1} readOnly value="Theme probe" {...stylex.props(...uiPrimitives.input)} />
                          <div data-testid="theme-probe-overlay" {...stylex.props(...uiPrimitives.overlayPanelNarrow, vinextLayoutStyles.themeProbeOverlay)} />
                        </div>
                      </div>
                      <div {...stylex.props(rootLayoutStyles.content)}>{children}</div>
                    </>
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
