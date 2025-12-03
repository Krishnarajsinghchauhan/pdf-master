"use client";

import AdsterraNative from "@/app/ads/AdsterraNative";
import FileUploader from "@/components/FileUploader";
import ToolPage from "@/components/ToolPage";
import ToolSEO from "@/components/ToolSEO";
import WatermarkControls from "@/components/WatermarkControls";
import { useState } from "react";

export const metadata = {
  title: "Add Watermark to PDF — Text & Image Watermarks | PixelPDF",
  description:
    "Add custom text or image watermarks to your PDF instantly. Free online PDF watermarking tool.",
  alternates: { canonical: "https://pixelpdf.in/tools/watermark" },
  keywords: [
    "add watermark pdf",
    "pdf watermark tool",
    "text watermark",
    "image watermark",
  ],
};

export default function Watermark() {
  const [options, setOptions] = useState({});
  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>
      <ToolPage title="Add Watermark" tool="watermark">
        <WatermarkControls onChange={setOptions} />
        <FileUploader tool="watermark" />

        <ToolSEO
          title="Add Watermark to PDF"
          description="Add text or image watermarks to your PDF online for free."
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
                  name: "Can I add image watermarks?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, you can upload any PNG or JPG image as a watermark.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Does watermarking reduce PDF quality?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No, PixelPDF keeps the original PDF quality intact during processing.",
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
