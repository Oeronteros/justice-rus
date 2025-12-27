import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Cult Game Community — Justice Mobile",
  description: "Guild Portal - Justice Mobile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          href="https://cdn.quilljs.com/1.3.7/quill.snow.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;800&family=EB+Garamond:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-occult">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 occult-backdrop"></div>
          <div className="absolute inset-0 occult-noise"></div>
          <div className="absolute inset-0 occult-smoke"></div>
          <div className="absolute inset-0 occult-sigil-grid opacity-40"></div>
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full occult-glow"></div>
          <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full occult-portal"></div>
          <div className="absolute top-[18%] left-[-120px] h-[360px] w-[360px] rounded-full occult-ember"></div>
        </div>

        <div className="relative z-10">
          {children}
        </div>

        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
        <Script src="https://cdn.quilljs.com/1.3.7/quill.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
