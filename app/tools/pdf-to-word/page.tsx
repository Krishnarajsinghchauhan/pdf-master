import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

export const metadata = {
  title: "PDF to Word Converter — Free & Accurate | PixelPDF",
  description:
    "Convert PDF to fully editable Word (DOCX) online. 100% free, high accuracy, no signup required.",
  alternates: { canonical: "https://pixelpdf.in/tools/pdf-to-word" },
};

export default function PDFToWord() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to Word" tool="pdf-to-word">
        <FileUploader tool="pdf-to-word" />

        <ToolSEO
          title="PDF to Word Converter Online"
          description="Turn PDFs into editable Word documents (DOCX) instantly with our free online converter."
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
                  name: "Is PixelPDF’s PDF merge tool free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF offers completely free PDF merging with no limits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it safe to merge PDF files?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all uploaded files are encrypted and deleted automatically.",
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
