import type { Metadata } from "next";
import { Noto_Serif } from 'next/font/google';
import "./globals.css";
import SeasonalClient from "@/components/SeasonalClient";
import PointerEffectsClient from "@/components/PointerEffectsClient";
import BackgroundEffects from "@/components/BackgroundEffects";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { I18nProvider } from "@/lib/i18n/context";

const notoSerif = Noto_Serif({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: "Cult | Game Community",
  description: "Gaming community portal for Justice Mobile players.",
  keywords: ["justice mobile", "cult", "guild", "gaming community", "mmorpg"],
  authors: [{ name: "Cult | Game Community" }],
  openGraph: {
    title: "Cult | Game Community",
    description: "Gaming community portal for Justice Mobile players.",
    type: "website",
    locale: "ru_RU",
  },
  robots: {
    index: true,
    follow: true,
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
    <html lang="ru" className={notoSerif.variable}>
      <body className={`theme-wuxia ${notoSerif.className}`}>
        <QueryProvider>
          <I18nProvider>
            <SeasonalClient />
            <PointerEffectsClient />
            <BackgroundEffects />
            <div className="relative z-10">{children}</div>
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
