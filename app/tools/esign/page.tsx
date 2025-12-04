"use client";

import { useState } from "react";
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
  const [signature, setSignature] = useState<string>("");
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 350,
    y: 750,
  });

  return (
    <>
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>

      <ToolPage
        title="eSign PDF"
        tool="esign"
        onFileSelected={(file) => setPdfFile(file)}
        esignData={{ signature, position }}
      >
        {/* When PDF is selected, show preview + signature pad */}
        {pdfFile && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <PDFPreviewWithSignature
              file={pdfFile}
              signature={signature}
              onPositionChange={setPosition}
            />

            <SignaturePad onComplete={setSignature} />
          </div>
        )}
      </ToolPage>
    </>
  );
}
