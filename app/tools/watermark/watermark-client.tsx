/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import PdfPreview from "@/components/PdfPreview";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [options, setOptions] = useState<any>({});

  // ----------------------------
  // Generate Preview
  // ----------------------------
  async function generatePreview(file: File, opts: any) {
    const res1 = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "watermark-preview",
        fileName: "preview_" + file.name,
        options: {},
      }),
    });

    const uploadData = await res1.json();

    // upload PDF to S3
    await fetch(uploadData.url, {
      method: "PUT",
      body: file,
    });

    const fileUrl = uploadData.file_url;

    // request preview
    const res2 = await fetch(`${API}/watermark/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pdfUrl: fileUrl,
        options: opts,
      }),
    });

    const data = await res2.json();

    if (data.preview_url) {
      setPreviewUrl(data.preview_url + "?t=" + Date.now());
    }
  }

  // ----------------------------
  // Listen for file from ToolPage
  // ----------------------------
  useEffect(() => {
    const handler = (e: any) => {
      const file = e.detail;
      if (!file) return;

      setSelectedFile(file);
      generatePreview(file, options);
    };

    window.addEventListener("pdf-selected", handler);
    return () => window.removeEventListener("pdf-selected", handler);
  }, []); // <-- FIXED

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="mt-6 space-y-6">
      {/* Watermark Controls */}
      <WatermarkControls
        onChange={(opts: any) => {
          setOptions(opts);

          if (selectedFile) {
            generatePreview(selectedFile, opts);
          }
        }}
      />

      {/* Hidden local input (direct select alternative) */}
      <input
        id="fileInput"
        type="file"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          setSelectedFile(file);
          generatePreview(file, options);
        }}
      />

      {previewUrl && <PdfPreview url={previewUrl} />}

      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
