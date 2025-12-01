import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Image to Text (OCR) — Extract Text from Images | PixelPDF",
  description:
    "Convert images (JPG, PNG, scanned photos) into editable text using fast OCR. Free and secure.",
  alternates: { canonical: "https://pixelpdf.in/tools/image-to-text" },
  keywords: [
    "image to text",
    "ocr image",
    "extract text from image",
    "photo to text",
    "jpg to text",
  ],
};

export const dynamic = "force-dynamic";

export default function ImageToText() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Image to Text (OCR)" tool="image-to-text">
        <FileUploader tool="image-to-text" />

        <ToolSEO
          title="Image to Text Converter"
          description="Extract text from images using fast and accurate OCR."
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
                  name: "Does Image to Text work on handwritten text?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "It works best on printed text. Handwriting recognition accuracy varies depending on clarity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is the image data stored?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, all images are auto-deleted after processing.",
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
