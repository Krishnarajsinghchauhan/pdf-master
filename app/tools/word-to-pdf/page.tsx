import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

export const metadata = {
  title: "Word to PDF — Convert DOCX to PDF Online | PixelPDF",
  description:
    "Convert Word documents to professional-quality PDF. Free, fast, and secure DOCX to PDF converter.",
  alternates: { canonical: "https://pixelpdf.in/tools/word-to-pdf" },
};

export default function WordToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Word to PDF" tool="word-to-pdf">
        <FileUploader tool="word-to-pdf" />
        <ToolSEO
          title="Word to PDF Converter Online"
          description="Convert DOC or DOCX to PDF in one click. High-quality output, free forever."
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
