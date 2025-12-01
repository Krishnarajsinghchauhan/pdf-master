import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "OCR PDF — Extract Text from Scanned PDFs | PixelPDF",
  description:
    "Convert scanned PDFs into editable and searchable text with powerful OCR technology. Free online OCR.",
  alternates: { canonical: "https://pixelpdf.in/tools/ocr" },
  keywords: [
    "ocr pdf",
    "extract text pdf",
    "scanned pdf to text",
    "pdf ocr tool",
    "pdf text recognition",
  ],
};

export default function OCR() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="OCR PDF (Scan to Text)" tool="ocr">
        <FileUploader tool="ocr" />

        <ToolSEO
          title="OCR PDF Online"
          description="Extract editable, searchable text from scanned PDF files using free OCR."
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
                  name: "How accurate is the OCR?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PixelPDF’s OCR delivers high accuracy on both clean and scanned documents.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does OCR support multiple languages?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF OCR supports many languages including English, Hindi, French, Spanish and more.",
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
