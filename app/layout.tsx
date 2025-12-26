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
      </head>
      <body className="bg-gray-900 text-gray-100">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0 opacity-50 hidden md:block"
          id="backgroundVideo"
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="fixed inset-0 bg-black/70 z-10"></div>
        
        {children}
        
        <Script src="https://cdn.jsdelivr.net/npm/chart.js" strategy="afterInteractive" />
        <Script src="https://cdn.quilljs.com/1.3.7/quill.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}

