import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

export const metadata = {
  title: "Compress PDF Online — Reduce File Size | PixelPDF",
  description:
    "Compress PDF files to reduce size while keeping high quality. Fast, secure, and free PDF compressor online.",
  alternates: { canonical: "https://pixelpdf.in/tools/compress" },
  keywords: ["compress pdf", "reduce pdf size", "pdf compressor", "shrink pdf"],
};

export const dynamic = "force-dynamic";

export default function Compress() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Compress PDF" tool="compress">
        <FileUploader tool="compress" />

        <ToolSEO
          title="Compress PDF Online — Reduce PDF Size"
          description="Reduce the size of your PDF without losing quality. Free online PDF compressor powered by fast cloud servers."
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
                  name: "Is PixelPDF’s PDF Compress tool free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF offers completely free PDF Compressing with no limits.",
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
