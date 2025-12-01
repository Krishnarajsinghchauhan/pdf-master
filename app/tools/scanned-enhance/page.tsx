import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Enhance Scanned PDF — Improve Clarity & Readability | PixelPDF",
  description:
    "Enhance scanned PDFs by improving brightness, removing noise, and sharpening text. Free scanned PDF enhancer.",
  alternates: { canonical: "https://pixelpdf.in/tools/scanned-enhance" },
  keywords: [
    "scanned pdf enhancer",
    "improve scanned pdf",
    "clean scanned pdf",
    "pdf enhance tool",
    "scan clarity improve",
  ],
};

export const dynamic = "force-dynamic";

export default function EnhanceScan() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Scanned PDF Enhancer" tool="scanned-enhance">
        <FileUploader tool="scanned-enhance" />

        <ToolSEO
          title="Enhance Scanned PDF"
          description="Improve clarity of scanned PDF documents with automatic enhancement."
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
                  name: "What improvements does the enhancer apply?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PixelPDF enhances text clarity, sharpens pages, reduces noise, and adjusts brightness/contrast.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the enhancement automatic?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF automatically enhances your scanned document without manual adjustments.",
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
