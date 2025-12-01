import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PDF to JPG Converter — Convert PDF Pages to Images | PixelPDF",
  description:
    "Convert PDF pages into high-quality JPG images. Free, fast, and secure PDF to JPG converter online.",
  alternates: { canonical: "https://pixelpdf.in/tools/pdf-to-jpg" },
  keywords: [
    "pdf to jpg",
    "convert pdf to image",
    "pdf to jpeg",
    "extract pdf images",
  ],
};

export const dynamic = "force-dynamic";

export default function PDFToJPG() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PDF to JPG" tool="pdf-to-jpg">
        <FileUploader tool="pdf-to-jpg" />

        <ToolSEO
          title="PDF to JPG Converter Online"
          description="Convert your PDF pages into JPG images instantly. High-quality and free."
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
                  name: "Does PDF to JPG support multiple pages?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, each PDF page will be converted into a separate high-quality JPG image.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF provides free PDF to JPG conversions.",
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
