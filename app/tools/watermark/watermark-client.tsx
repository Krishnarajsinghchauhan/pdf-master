/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import PdfPreview from "@/components/PdfPreview";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const [options, setOptions] = useState({});
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  // -------------------------------
  // Detect file chosen in ToolPage
  // -------------------------------
  useEffect(() => {
    const input = document.getElementById("fileInput") as HTMLInputElement;

    if (!input) return;

    input.addEventListener("change", () => {
      const file = input.files?.[0];
      if (!file) return;

      const blobUrl = URL.createObjectURL(file);
      setPdfBlobUrl(blobUrl);
    });
  }, []);

  // --------------------------------------
  // AUTO-GENERATE PREVIEW ON OPTION CHANGE
  // --------------------------------------
  useEffect(() => {
    if (!pdfBlobUrl) return;

    async function generatePreview() {
      const res = await fetch(`${API}/watermark/preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfUrl: pdfBlobUrl, // Local blob URL (backend must support this)
          options,
        }),
      });

      const data = await res.json();
      setPreviewUrl(data.preview_url);
    }

    generatePreview();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  // -------------------------------
  // Listen for job created by ToolPage
  // -------------------------------
  useEffect(() => {
    const handler = (e: any) => {
      setJobId(e.detail.jobId);
    };

    window.addEventListener("job-created", handler);
    return () => window.removeEventListener("job-created", handler);
  }, []);

  return (
    <div className="space-y-6 mt-6">
      <WatermarkControls onChange={setOptions} />

      {previewUrl && <PdfPreview url={previewUrl} />}

      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
