import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "PNG to PDF Converter — Convert PNG Images to PDF | PixelPDF",
  description:
    "Convert PNG images into PDF documents instantly. Free and high-quality PNG to PDF converter.",
  alternates: { canonical: "https://pixelpdf.in/tools/png-to-pdf" },
  keywords: [
    "png to pdf",
    "convert png to pdf",
    "image to pdf",
    "png converter",
  ],
};

export const dynamic = "force-dynamic";

export default function PNGToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="PNG to PDF" tool="png-to-pdf">
        <FileUploader tool="png-to-pdf" />

        <ToolSEO
          title="PNG to PDF Converter Online"
          description="Convert PNG images into PDF instantly. Free, easy, and high-quality."
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
                  name: "Can I convert multiple PNGs into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, upload multiple PNG files and combine them into a single PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is PNG to PDF free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, the PNG to PDF converter is completely free and secure.",
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
