"use client";

import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PDF to Excel Converter — Convert PDF to XLSX | PixelPDF",
  description:
    "Extract tables and data by converting PDF to Excel (XLSX). Accurate, free and fast online converter.",
  alternates: { canonical: "https://pixelpdf.in/tools/pdf-to-excel" },
  keywords: [
    "pdf to excel",
    "convert pdf to xlsx",
    "pdf to spreadsheet",
    "pdf table extractor",
  ],
};

export const dynamic = "force-dynamic";

export default function PDFToExcel() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to Excel" tool="pdf-to-excel">
        <FileUploader tool="pdf-to-excel" />

        <ToolSEO
          title="PDF to Excel Converter Online"
          description="Convert PDF tables and data to Excel spreadsheets (XLSX) instantly. Free and accurate."
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
                  name: "Does this converter extract tables correctly?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF uses advanced parsing to extract tables into Excel format accurately.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PDF to Excel free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the conversion is completely free and secure.",
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
