import type { Metadata, Viewport } from 'next';
import { Manrope, Noto_Serif } from 'next/font/google';
import { Suspense } from 'react';
import * as stylex from '@stylexjs/stylex';
import '@/app/stylex.css';
import '@/app/globals.css';
import { rootLayoutStyles } from '@/app/layout.stylex';
import StyledComponentsRegistry from '@/app/styled-components-registry';
import { uiThemeProbeContract, uiThemeProbeStyles } from '@/components/shared/Ui.stylex';
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

const themeBootScript = `
(function () {
  try {
    var key = 'silent-moonfall-theme-mode';
    var eventName = 'silent-moonfall-theme-modechange';
    var mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    var getStoredMode = function () {
      var stored = localStorage.getItem(key);
      return stored === 'light' || stored === 'dark' || stored === 'system' ? stored : 'system';
    };

    var resolveTheme = function (mode) {
      return mode === 'system' ? (mediaQuery.matches ? 'light' : 'dark') : mode;
    };

    var updateToggle = function (root, mode) {
      if (!root) {
        return;
      }

      root.setThemeMode = applyMode;
      root.setAttribute('data-theme-current', mode);

      var buttons = root.querySelectorAll('[data-theme-mode]');
      for (var i = 0; i < buttons.length; i += 1) {
        var button = buttons[i];
        var buttonMode = button.getAttribute('data-theme-mode');
        button.setAttribute('aria-pressed', buttonMode === mode ? 'true' : 'false');
      }
    };

    var updateBoundary = function (mode, resolved) {
      var boundary = document.querySelector('[data-testid="theme-boundary"]');
      if (!boundary) {
        return;
      }

      boundary.setAttribute('data-theme', resolved);
      boundary.setAttribute('data-theme-mode', mode);
      boundary.classList.remove('theme-dark', 'theme-light');
      boundary.classList.add('theme-' + resolved);

      var darkClasses = (boundary.getAttribute('data-theme-class-dark') || '').split('|').filter(Boolean);
      var lightClasses = (boundary.getAttribute('data-theme-class-light') || '').split('|').filter(Boolean);

      for (var i = 0; i < darkClasses.length; i += 1) {
        boundary.classList.remove(darkClasses[i]);
      }

      for (var j = 0; j < lightClasses.length; j += 1) {
        boundary.classList.remove(lightClasses[j]);
      }

      var nextClasses = resolved === 'light' ? lightClasses : darkClasses;
      for (var k = 0; k < nextClasses.length; k += 1) {
        boundary.classList.add(nextClasses[k]);
      }
    };

    var updateProbe = function (mode, resolved) {
      var probe = document.querySelector('[data-testid="theme-primitives-probe"]');
      if (!probe) {
        return;
      }

      probe.setAttribute('data-theme-current', resolved);
      probe.setAttribute('data-theme-mode', mode);
      probe.setAttribute('data-theme-ready', 'true');
    };

    var syncDom = function (mode, resolved) {
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themeMode = mode;
      document.body.dataset.theme = resolved;
      document.body.dataset.themeMode = mode;
      updateBoundary(mode, resolved);
      updateToggle(document.querySelector('[data-testid="theme-toggle"]'), mode);
      updateToggle(document.querySelector('[data-testid="theme-toggle-visual"]'), mode);
      updateProbe(mode, resolved);
    };

    var applyMode = function (mode) {
      var resolved = resolveTheme(mode);
      try {
        localStorage.setItem(key, mode);
      } catch (_storageError) {}

      syncDom(mode, resolved);
      window.dispatchEvent(new CustomEvent(eventName, { detail: { mode: mode, resolvedTheme: resolved } }));
    };

    var ensureThemeHooks = function (attempt) {
      var currentMode = getStoredMode();
      syncDom(currentMode, resolveTheme(currentMode));

      var boundary = document.querySelector('[data-testid="theme-boundary"]');
      var harness = document.querySelector('[data-testid="theme-toggle"]');
      var probe = document.querySelector('[data-testid="theme-primitives-probe"]');

      if (attempt < 40 && (!boundary || !probe || !harness || typeof harness.setThemeMode !== 'function')) {
        setTimeout(function () {
          ensureThemeHooks(attempt + 1);
        }, 50);
      }
    };

    window.__silentMoonfallSetThemeMode = applyMode;

    var initialMode = getStoredMode();
    syncDom(initialMode, resolveTheme(initialMode));

    document.addEventListener(
      'click',
      function (event) {
        var target = event.target;
        var button = target && target.closest ? target.closest('[data-theme-mode]') : null;
        if (!button) {
          return;
        }

        var root = button.closest('[data-testid="theme-toggle"],[data-testid="theme-toggle-visual"]');
        if (!root) {
          return;
        }

        var nextMode = button.getAttribute('data-theme-mode');
        if (nextMode === 'light' || nextMode === 'dark' || nextMode === 'system') {
          event.preventDefault();
          applyMode(nextMode);
        }
      },
      true
    );

    var syncSystemMode = function () {
      var currentMode = getStoredMode();
      if (currentMode === 'system') {
        var resolvedTheme = resolveTheme(currentMode);
        syncDom(currentMode, resolvedTheme);
        window.dispatchEvent(new CustomEvent(eventName, { detail: { mode: currentMode, resolvedTheme: resolvedTheme } }));
      }
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncSystemMode);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(syncSystemMode);
    }

    ensureThemeHooks(0);
  } catch (_error) {}
})();
`;

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
                      <div
                        data-testid="theme-primitives-probe"
                        data-theme-primitives={uiThemeProbeContract.join(',')}
                        aria-hidden="true"
                        {...stylex.props(uiThemeProbeStyles.rail)}
                      >
                        <div {...stylex.props(uiThemeProbeStyles.stack)}>
                          <div data-testid="theme-probe-page" data-theme-probe-primitive="pageChrome" {...stylex.props(...themePrimitiveProbeStyles.pageChrome, uiThemeProbeStyles.page)} />
                          <div data-testid="theme-probe-card" data-theme-probe-primitive="card" {...stylex.props(...themePrimitiveProbeStyles.card, uiThemeProbeStyles.surface)} />
                          <div data-testid="theme-probe-panel" data-theme-probe-primitive="panel" {...stylex.props(...themePrimitiveProbeStyles.panel, uiThemeProbeStyles.surface)} />
                          <button data-testid="theme-probe-button" data-theme-probe-primitive="button" type="button" tabIndex={-1} {...stylex.props(...themePrimitiveProbeStyles.button, uiThemeProbeStyles.button)}>
                            Theme probe
                          </button>
                          <input data-testid="theme-probe-input" data-theme-probe-primitive="input" tabIndex={-1} readOnly value="Theme probe" {...stylex.props(...themePrimitiveProbeStyles.input)} />
                          <div data-testid="theme-probe-overlay" data-theme-probe-primitive="overlayPanelNarrow" {...stylex.props(...themePrimitiveProbeStyles.overlayPanelNarrow, uiThemeProbeStyles.overlay)} />
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
