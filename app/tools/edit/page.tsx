import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Edit PDF Online — Add Text, Images & Shapes | PixelPDF",
  description:
    "Edit PDF files online by adding text, images, drawings, highlights, and shapes. Free and secure PDF editor.",
  alternates: { canonical: "https://pixelpdf.in/tools/edit" },
  keywords: [
    "edit pdf",
    "online pdf editor",
    "add text to pdf",
    "modify pdf",
    "edit pdf free",
  ],
};

export default function EditPDF() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Edit PDF" tool="edit">
        <FileUploader tool="edit" />

        <ToolSEO
          title="Edit PDF Online"
          description="Add text, images, drawings, and annotations to PDF files. Free online editor."
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
                  name: "Can I edit text inside PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "You can annotate, add new text, highlight, draw, and add shapes, but editing existing text depends on the file structure.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is editing PDFs free on PixelPDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF provides free online PDF editing with secure processing.",
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
