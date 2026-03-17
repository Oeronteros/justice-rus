import type { Metadata } from "next";
import { Suspense } from "react";
import { Manrope, Noto_Serif } from 'next/font/google';
import * as stylex from '@stylexjs/stylex';
import "./stylex.css";
import "./globals.css";
import InputPerformanceMode from "@/components/InputPerformanceMode";
import AppTelemetry from "@/components/platform/AppTelemetry";
import { rootLayoutStyles } from '@/app/layout.stylex';
import { wuxiaTheme } from '@/lib/stylex/theme.stylex';
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { shouldEnableTelemetry } from "@/lib/platform/runtime";
import { defaultLanguage } from "@/lib/i18n/shared";
import { mergeStylexProps } from '@/lib/stylex/utils';

export const metadata: Metadata = {
  title: "Silent Moonfall | Guild Portal",
  description: "Official Silent Moonfall guild portal for Justice Mobile players.",
  keywords: ["justice mobile", "silent moonfall", "guild", "guild portal", "mmorpg"],
  authors: [{ name: "Silent Moonfall" }],
  openGraph: {
    title: "Silent Moonfall | Guild Portal",
    description: "Official Silent Moonfall guild portal for Justice Mobile players.",
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport = {
  width: "device-width",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bodyProps = mergeStylexProps(stylex.props(wuxiaTheme, rootLayoutStyles.body), 'theme-wuxia');

  return (
    <html lang={defaultLanguage} className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body {...bodyProps}>
        <InputPerformanceMode />
        <QueryProvider>
          <I18nProvider>
            <Suspense fallback={<div {...stylex.props(rootLayoutStyles.fallback)} />}>
              <div {...stylex.props(rootLayoutStyles.content)}>{children}</div>
            </Suspense>
          </I18nProvider>
        </QueryProvider>
        <AppTelemetry enabled={shouldEnableTelemetry()} />
      </body>
    </html>
  );
}
