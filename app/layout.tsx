import type { Metadata } from "next";
import { Noto_Serif } from 'next/font/google';
import "./globals.css";
import SeasonalClient from "@/components/SeasonalClient";
import PointerEffectsClient from "@/components/PointerEffectsClient";
import BackgroundEffects from "@/components/BackgroundEffects";

const notoSerif = Noto_Serif({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-noto-serif',
});

export const metadata: Metadata = {
  title: "Demonic Cult | Justice Mobile",
  description: "Wuxia guild portal for the Demonic Cult community.",
  keywords: ["wuxia", "justice mobile", "demonic cult", "guild", "clan"],
  authors: [{ name: "Demonic Cult" }],
  openGraph: {
    title: "Demonic Cult | Justice Mobile",
    description: "Wuxia guild portal for the Demonic Cult community.",
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
        <SeasonalClient />
        <PointerEffectsClient />
        <BackgroundEffects />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
