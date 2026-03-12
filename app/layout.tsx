import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import InputPerformanceMode from "@/components/InputPerformanceMode";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { I18nProvider } from "@/lib/i18n/context";
import { defaultLanguage } from "@/lib/i18n/shared";

const shouldLoadVercelTelemetry = process.env.VERCEL === "1";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLanguage}>
      <body className="theme-wuxia">
        <InputPerformanceMode />
        <QueryProvider>
          <I18nProvider>
            <Suspense fallback={<div className="relative z-10 min-h-screen" />}>
              <div className="relative z-10">{children}</div>
            </Suspense>
          </I18nProvider>
        </QueryProvider>
        {shouldLoadVercelTelemetry ? <Analytics /> : null}
        {shouldLoadVercelTelemetry ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
