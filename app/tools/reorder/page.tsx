import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Reorder PDF Pages — Drag & Drop Page Organizer | PixelPDF",
  description:
    "Rearrange PDF pages in any order using a drag-and-drop interface. Free and secure online page organizer.",
  alternates: { canonical: "https://pixelpdf.in/tools/reorder" },
  keywords: ["reorder pdf", "arrange pdf pages", "organize pdf pages"],
};

export const dynamic = "force-dynamic";

export default function Reorder() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Reorder Pages" tool="reorder">
        <FileUploader tool="reorder" />
        <ToolSEO
          title="Reorder PDF Pages Online — Drag & Drop Editor"
          description="Visually rearrange your PDF pages with a simple drag-and-drop editor. Free and fast."
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
                  name: "Can I reorder pages by drag and drop?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, simply drag pages to rearrange the PDF.",
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
