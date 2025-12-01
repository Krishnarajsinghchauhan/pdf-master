import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Unlock PDF — Remove Password from PDF Online | PixelPDF",
  description:
    "Remove passwords and restrictions from secured PDF files. Fast, safe, and free PDF unlocker.",
  alternates: { canonical: "https://pixelpdf.in/tools/unlock" },
  keywords: [
    "unlock pdf",
    "remove pdf password",
    "pdf unlocker",
    "decrypt pdf",
    "open locked pdf",
  ],
};

export default function Unlock() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Unlock PDF" tool="unlock">
        <FileUploader tool="unlock" />

        <ToolSEO
          title="Unlock PDF Online"
          description="Remove passwords and restrictions from PDF files securely."
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
                  name: "Can PixelPDF unlock any PDF?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "PixelPDF can unlock PDFs where you know the password. It cannot crack unknown passwords.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Are files kept private?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, files are auto-deleted and not stored anywhere.",
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
