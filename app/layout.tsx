import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Demonic Cult | Justice Mobile",
  description: "Wuxia guild portal for the Demonic Cult community.",
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
          href="https://fonts.googleapis.com/css2?family=ZCOOL+XiaoWei&family=Noto+Serif:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="theme-wuxia">
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 wuxia-backdrop"></div>
          <div className="absolute inset-0 wuxia-aurora"></div>
          <div className="absolute inset-0 wuxia-constellation"></div>
          <div className="absolute inset-0 wuxia-noise"></div>
          <div className="absolute inset-0 wuxia-smoke"></div>
          <div className="absolute inset-0 wuxia-scroll-grid opacity-30"></div>
          <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full wuxia-glow"></div>
          <div className="absolute bottom-[-120px] right-[-80px] h-[420px] w-[420px] rounded-full wuxia-moon"></div>
          <div className="absolute top-[18%] left-[-120px] h-[360px] w-[360px] rounded-full wuxia-ink"></div>
        </div>

        <div className="relative z-10">{children}</div>

        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
        <Script src="https://cdn.quilljs.com/1.3.7/quill.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
