// app/tools/split/page.tsx
import ToolPage from "@/components/ToolPage";
import FileUploader from "@/components/FileUploader";
import AdsterraNative from "@/app/ads/AdsterraNative";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Split PDF Online — Extract Pages or Separate PDF | PixelPDF",
  description:
    "Extract pages or split PDF into multiple files. Free, fast and secure PDF splitter online.",
  alternates: { canonical: "https://pixelpdf.in/tools/split" },
  keywords: ["split pdf", "pdf splitter", "extract pdf pages", "separate pdf"],
};

export const dynamic = "force-dynamic";

export default function Split() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Split PDF" tool="split">
        <FileUploader tool="split" />

        <ToolSEO
          title="Split PDF Online — Free PDF Splitter"
          description="Extract pages or split your PDF into multiple files easily with our free online PDF splitter."
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
                  name: "Can I split specific pages?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, select page ranges or extract single pages easily.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the splitter free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF Split PDF is completely free.",
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
