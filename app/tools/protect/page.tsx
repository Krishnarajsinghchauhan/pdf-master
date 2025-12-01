import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Protect PDF with Password — Encrypt PDF Online | PixelPDF",
  description:
    "Secure your PDF files with a strong password. Encrypt PDFs online instantly for free.",
  alternates: { canonical: "https://pixelpdf.in/tools/protect" },
  keywords: [
    "protect pdf",
    "password protect pdf",
    "encrypt pdf",
    "secure pdf",
    "pdf lock tool",
  ],
};

export const dynamic = "force-dynamic";

export default function Protect() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Protect PDF" tool="protect">
        <FileUploader tool="protect" />

        <ToolSEO
          title="Protect PDF Online"
          description="Encrypt your PDF with a password instantly and securely."
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
                  name: "Is the password protection strong?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, PixelPDF uses strong 256-bit encryption to secure your documents.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Is my PDF safe after uploading?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "All files are encrypted in transfer and deleted automatically after processing.",
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
