import AdsterraNative from "@/app/ads/AdsterraNative";

import HeaderFooterClient from "@/components/HeaderFooterClient";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Add Header & Footer to PDF — Free Online Tool | PixelPDF",
  description:
    "Add custom headers and footers to your PDF documents. Perfect for business, school, or official use.",
  alternates: { canonical: "https://pixelpdf.in/tools/header-footer" },
  keywords: [
    "add header pdf",
    "add footer pdf",
    "pdf header footer",
    "edit pdf header",
    "insert footer pdf",
  ],
};

export default function HeaderFooter() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Header & Footer Editor" tool="header-footer">
        <HeaderFooterClient />

        <ToolSEO
          title="Add Header & Footer to PDF"
          description="Insert headers and footers into your PDF documents easily and for free."
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Can I add both header and footer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can add both a header and a footer with custom text, font size, and alignment.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this tool free to use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF provides free tools to add headers and footers to PDFs.",
                  },
                },
              ],
            }),
          }}
        />
      </ToolPage>
    </>
  );
}
