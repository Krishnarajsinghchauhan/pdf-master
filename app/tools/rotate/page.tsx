import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";

export const metadata = {
  title: "Rotate PDF Pages Online — Turn Pages Left/Right | PixelPDF",
  description:
    "Rotate individual PDF pages clockwise or counterclockwise. Free, fast and secure online PDF rotation tool.",
  alternates: { canonical: "https://pixelpdf.in/tools/rotate" },
  keywords: ["rotate pdf", "rotate pdf pages", "turn pdf page"],
};

export const dynamic = "force-dynamic";

export default function Rotate() {
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Rotate PDF Pages" tool="rotate">
        <FileUploader tool="rotate" />

        <ToolSEO
          title="Rotate PDF Pages Online — Free Tool"
          description="Rotate PDF pages left or right and save instantly. Simple, fast and secure."
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
                  name: "Can I rotate only selected pages?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, choose any page and rotate it left or right.",
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
