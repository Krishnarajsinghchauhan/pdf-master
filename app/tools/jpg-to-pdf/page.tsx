import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "JPG to PDF Converter — Convert Images to PDF | PixelPDF",
  description:
    "Convert JPG and JPEG images to PDF instantly. Free, high-quality image to PDF converter online.",
  alternates: { canonical: "https://pixelpdf.in/tools/jpg-to-pdf" },
  keywords: ["jpg to pdf", "image to pdf", "jpeg to pdf", "convert jpg to pdf"],
};

export const dynamic = "force-dynamic";

export default function JPGToPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="JPG to PDF" tool="jpg-to-pdf">
        <FileUploader tool="jpg-to-pdf" />

        <ToolSEO
          title="JPG to PDF Converter Online"
          description="Convert JPG images to PDF instantly. Free, fast, and high-quality."
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
                  name: "Can I merge multiple JPGs into one PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can upload multiple JPG images and combine them into a single PDF.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is JPG to PDF conversion free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes. PixelPDF offers unlimited free JPG to PDF conversions.",
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
