import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/QueryProvider";
import { I18nProvider } from "@/lib/i18n/context";

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
    <html lang="ru">
      <body className="theme-wuxia">
        <QueryProvider>
          <I18nProvider>
            <div className="relative z-10">{children}</div>
          </I18nProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
