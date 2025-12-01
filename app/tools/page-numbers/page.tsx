import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Add Page Numbers to PDF — Free Online Tool | PixelPDF",
  description:
    "Add professional page numbering to your PDF documents in seconds. Free, fast, and secure.",
  alternates: { canonical: "https://pixelpdf.in/tools/page-numbers" },
  keywords: ["add page numbers pdf", "pdf page numbering", "number pages pdf"],
};

export const dynamic = "force-dynamic";

export default function PageNumbers() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Add Page Numbers" tool="page-numbers">
        <FileUploader tool="page-numbers" />

        <ToolSEO
          title="Add Page Numbers to PDF"
          description="Add custom page numbering to your PDF online easily and for free."
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
                  name: "Can I choose the starting number?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can choose any starting number and customize the position of the page numbers.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is this tool free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, adding page numbers to PDFs on PixelPDF is completely free.",
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
