import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

export const metadata = {
  title: "Combine PDF & Files — Merge Any Document",
  description:
    "Combine multiple PDF files into one instantly. Free, secure, unlimited online PDF Combine. No signup required.",
  alternates: { canonical: "https://pixelpdf.in/tools/merge" },
  keywords: [
    "merge pdf",
    "combine pdf",
    "pdf merger",
    "online pdf merge",
    "free pdf merge",
  ],
};

export const dynamic = "force-dynamic";

export default function Combine() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF Combine (All File Types)" tool="combine">
        <FileUploader tool="combine" />
        <ToolSEO
          title="Combine PDF Online — Free PDF Combine"
          description="Easily combine multiple PDF files into one using PixelPDF. Fast, secure, and 100% free with no signup required."
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
                  name: "Is PixelPDF’s PDF Combine tool free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF offers completely free PDF Combine with no limits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it safe to Combine PDF files?",
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
