/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import PdfPreview from "@/components/PdfPreview";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const [options, setOptions] = useState({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  // 🔥 Listen for the PDF uploaded inside ToolPage
  useEffect(() => {
    const input = document.getElementById("fileInput") as HTMLInputElement;

    if (!input) return;

    const handler = () => {
      const file = input.files?.[0];
      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    };

    input.addEventListener("change", handler);

    return () => input.removeEventListener("change", handler);
  }, []);

  // 🔥 Listen for job created (ToolPage creates job)
  useEffect(() => {
    const handle = (e: any) => setJobId(e.detail.jobId);
    window.addEventListener("job-created", handle);
    return () => window.removeEventListener("job-created", handle);
  }, []);

  return (
    <div className="space-y-6 mt-6">
      {/* Watermark Controls (Always visible) */}
      <WatermarkControls onChange={setOptions} />

      {/* PDF Preview */}
      {previewUrl && <PdfPreview url={previewUrl} />}

      {/* Show Job Status */}
      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
