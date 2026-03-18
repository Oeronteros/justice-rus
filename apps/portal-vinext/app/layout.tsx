import type { Metadata, Viewport } from 'next';
import { Suspense } from 'react';
import '@/app/globals.css';
import InputPerformanceMode from '@/components/InputPerformanceMode';
import AppTelemetry from '@/components/platform/AppTelemetry';
import AppThemeBoundary from '@/components/theme/AppThemeBoundary';
import { QueryProvider } from '@/lib/providers/QueryProvider';
import { I18nProvider } from '@/lib/i18n/context';
import { ThemeProvider } from '@/lib/theme/context';
import { defaultLanguage } from '@/lib/i18n/shared';
import { shouldEnableTelemetry } from '@/lib/platform/runtime';

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

const themeBootScript = `(function(){try{var key='silent-moonfall-theme-mode';var stored=localStorage.getItem(key);var mode=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var resolved=mode==='system'?(window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):mode;document.documentElement.dataset.theme=resolved;document.documentElement.dataset.themeMode=mode;document.body.dataset.theme=resolved;document.body.dataset.themeMode=mode;}catch(_error){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={defaultLanguage}>
      <head>
        <title>Silent Moonfall | Guild Portal</title>
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <InputPerformanceMode />
        <ThemeProvider>
          <AppThemeBoundary>
            <QueryProvider>
              <I18nProvider>
                <Suspense fallback={<div className="relative z-10 min-h-screen" />}>
                  <div className="relative z-10">{children}</div>
                </Suspense>
              </I18nProvider>
            </QueryProvider>
          </AppThemeBoundary>
        </ThemeProvider>
        <AppTelemetry enabled={shouldEnableTelemetry()} />
      </body>
    </html>
  );
}
