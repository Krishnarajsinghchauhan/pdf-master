// app/layout.tsx
import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "PixelPDF – Free Online PDF Tools",
  description:
    "Convert, compress, merge, split, edit, and protect PDFs online. Free PDF tools like PDF to Word, JPG to PDF, OCR PDF, PDF Editor, eSign PDF and more.",
  metadataBase: new URL("https://pixelpdf.in"),
  openGraph: {
    title: "PixelPDF – Free Online PDF Tools",
    description:
      "Use 28+ free PDF tools: merge, compress, convert to Word, JPG, Excel, PPT, OCR, eSign, and more.",
    url: "https://pixelpdf.in",
    siteName: "PixelPDF",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handlehome = () => {
    window.location.href = "/";
  };
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/232070245-removebg-preview.png" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4065099840146867"
          crossOrigin="anonymous"
        ></script>

        {/* JSON-LD STRUCTURED DATA FOR SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "PixelPDF",
              url: "https://pixelpdf.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://pixelpdf.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="bg-gray-100">
        <header className="w-full bg-white p-4 shadow flex items-center">
          <div
            style={{ overflow: "hidden", height: 36 }}
            onClick={handlehome}
            className="cursor-pointer"
          >
            <Image
              src="/232070245-removebg-preview.png"
              alt="hello"
              width={200}
              height={40}
              style={{
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
                height: 40,
                marginTop: -2,
                marginBottom: -2,
              }}
              priority
            />
          </div>
        </header>

        <main className="max-w-6xl mx-auto p-4">{children}</main>

        <footer className="py-6 text-center text-gray-600">
          © {new Date().getFullYear()} PixelPDF — All Rights Reserved
        </footer>
      </body>
    </html>
  );
}
