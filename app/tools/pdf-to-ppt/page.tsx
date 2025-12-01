import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PDF to PowerPoint Converter — Convert PDF to PPTX | PixelPDF",
  description:
    "Convert PDF slides into editable PowerPoint (PPTX) instantly. Free, accurate, and secure online converter.",
  alternates: { canonical: "https://pixelpdf.in/tools/pdf-to-ppt" },
  keywords: [
    "pdf to ppt",
    "convert pdf to powerpoint",
    "pdf to pptx",
    "pdf converter",
  ],
};

export const dynamic = "force-dynamic";

export default function PDFToPPT() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to PowerPoint" tool="pdf-to-ppt">
        <FileUploader tool="pdf-to-ppt" />

        <ToolSEO
          title="PDF to PowerPoint Converter Online"
          description="Convert your PDF files into editable PowerPoint (PPTX) slides instantly. Free & accurate."
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
                  name: "Does PDF to PowerPoint keep slide design?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the converter preserves layout, images, and formatting as closely as possible.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PDF to PPT conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF offers free and secure PDF to PowerPoint conversion.",
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
