// app/layout.tsx
"use client";

import "./globals.css";
import GoogleAdBanner from "./ads/GoogleAdBanner";

export const metadata = {
  title: "PDF Tools Online",
  description: "All PDF tools like merge, split, compress, convert, OCR, etc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4065099840146867"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-gray-100">
        {/* Header */}
        <header className="w-full bg-white p-4 shadow">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-2xl font-bold text-red-600">PDF Master</h1>
          </div>
        </header>

        {/* Top Ad */}
        <div className="flex justify-center mt-4">
          <GoogleAdBanner />
        </div>

        <main className="max-w-6xl mx-auto p-4">{children}</main>

        {/* Bottom Ad */}
        <div className="flex justify-center mt-10">
          <GoogleAdBanner />
        </div>

        <footer className="py-6 text-center text-gray-600">
          © 2025 PDF Master — All Rights Reserved
        </footer>
      </body>
    </html>
  );
}
