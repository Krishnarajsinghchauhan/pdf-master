import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PDF to PNG Converter — Convert PDF Pages to PNG | PixelPDF",
  description:
    "Convert PDF pages into high-resolution PNG images instantly. Free and fast PDF to PNG converter online.",
  alternates: { canonical: "https://pixelpdf.in/tools/pdf-to-png" },
  keywords: [
    "pdf to png",
    "convert pdf to png",
    "pdf to image",
    "extract pdf images",
  ],
};

export const dynamic = "force-dynamic";

export default function PDFToPNG() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to PNG" tool="pdf-to-png">
        <FileUploader tool="pdf-to-png" />

        <ToolSEO
          title="PDF to PNG Converter Online"
          description="Convert PDF pages to high-quality PNG images for free."
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
                  name: "Are PNG images high quality?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PDF pages are converted to high-resolution PNG images suitable for editing and printing.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PDF to PNG converter free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all PixelPDF tools including PDF to PNG are completely free.",
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
