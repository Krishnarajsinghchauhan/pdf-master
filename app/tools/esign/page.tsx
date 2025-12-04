/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import AdsterraNative from "@/app/ads/AdsterraNative";
import ToolPage from "@/components/ToolPage";
import SignaturePad from "@/components/SignaturePad";
import dynamic from "next/dynamic";

// PDF preview MUST be client-only
const PDFPreviewWithSignature = dynamic(
  () => import("@/components/PDFPreviewWithSignature"),
  { ssr: false }
);

export default function ESign() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  // ⭐ MULTIPLE SIGNATURE SYSTEM
  const [signatures, setSignatures] = useState<any[]>([]);

  // When user draws a signature in SignaturePad → add to the document
  useEffect(() => {
    function handleDrawnSignature(e: any) {
      const image = e.detail; // base64 PNG from pad
      if (!image) return;

      setSignatures((prev) => [
        ...prev,
        {
          id: Date.now(),
          image,
          x: 100,
          y: 100,
          size: 150,
          rotation: 0,
          type: "signature",
        },
      ]);
    }

    window.addEventListener("signature-created", handleDrawnSignature);
    return () =>
      window.removeEventListener("signature-created", handleDrawnSignature);
  }, []);

  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>

      <ToolPage
        title="eSign PDF"
        tool="esign"
        onFileSelected={(file) => setPdfFile(file)}
        esignData={{ signatures }} // <-- backend receives full signature array
      >
        {pdfFile && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: PDF PREVIEW */}
            <PDFPreviewWithSignature
              file={pdfFile}
              signatures={signatures}
              setSignatures={setSignatures}
            />

            {/* RIGHT: SIGNATURE PAD */}
            <SignaturePad
              onComplete={(img: string) => {
                if (!img) return;
                window.dispatchEvent(
                  new CustomEvent("signature-created", { detail: img })
                );
              }}
            />
          </div>
        )}
      </ToolPage>
    </>
  );
}
