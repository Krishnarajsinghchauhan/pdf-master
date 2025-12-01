import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO"; // 🔥 make sure this component exists

export const metadata = {
  title: "Delete PDF Pages Online — Remove Pages Free | PixelPDF",
  description:
    "Remove unwanted PDF pages quickly. Free online tool to delete PDF pages instantly.",
  alternates: { canonical: "https://pixelpdf.in/tools/delete-pages" },
};

export default function DeletePages() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Delete PDF Pages" tool="delete-pages">
        <FileUploader tool="delete-pages" />

        <ToolSEO
          title="Delete Pages from PDF Online"
          description="Remove unwanted or blank PDF pages quickly and safely online."
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
                  name: "Is PixelPDF’s PDF Delete Page tool free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF offers completely free PDF Delete with no limits.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is it safe to Delete PDF Pages files?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all uploaded files are encrypted and deleted automatically.",
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
