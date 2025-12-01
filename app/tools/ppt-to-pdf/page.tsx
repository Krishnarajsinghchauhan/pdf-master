import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PowerPoint to PDF Converter — PPTX to PDF Online | PixelPDF",
  description:
    "Convert PowerPoint presentations (PPT/PPTX) into PDF instantly. Fast, free, and secure online tool.",
  alternates: { canonical: "https://pixelpdf.in/tools/ppt-to-pdf" },
  keywords: [
    "ppt to pdf",
    "convert powerpoint to pdf",
    "pptx to pdf",
    "presentation to pdf",
  ],
};

export default function PPTToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PowerPoint to PDF" tool="ppt-to-pdf">
        <FileUploader tool="ppt-to-pdf" />

        <ToolSEO
          title="PowerPoint to PDF Converter Online"
          description="Convert PPT and PPTX files to PDF instantly. Free, fast, and secure."
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
                  name: "Will animations be preserved?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Animations are removed since PDF is a static format, but layout and content remain intact.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PPT to PDF free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF provides free PowerPoint to PDF conversion with no signup required.",
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
