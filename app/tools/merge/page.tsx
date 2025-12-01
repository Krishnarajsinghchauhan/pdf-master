import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import AdsterraNative from "@/app/ads/AdsterraNative";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

// ==============================
// 📌 SEO METADATA
// ==============================
export const metadata = {
  title: "Merge PDF Online — Free & Fast PDF Merger | PixelPDF",
  description:
    "Merge multiple PDF files into one instantly. Free, secure, unlimited online PDF merger. No signup required.",
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

// ==============================
// 📌 MAIN PAGE
// ==============================
export default function MergePDF() {
  return (
    <>
      {/* ⭐ Top Ad */}
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>

      {/* ⭐ Main Tool Section */}
      <ToolPage title="Merge PDF" tool="merge">
        <FileUploader tool="merge" />

        {/* ⭐ SEO CONTENT */}
        <ToolSEO
          title="Merge PDF Online — Free PDF Merger"
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

      {/* ⭐ Bottom Ad */}
      <div className="flex justify-center mt-10">
        <AdsterraNative />
      </div>
    </>
  );
}
