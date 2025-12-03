"use client";

import { useState } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import FileUploader from "@/components/FileUploader";
import PdfPreview from "@/components/PdfPreview";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [options, setOptions] = useState({});
  const [jobId, setJobId] = useState<string | null>(null);

  // Preview URL is set directly in onFileSelected callback, so no effect needed here.

  return (
    <div className="space-y-6">
      {/* 1) File Upload */}
      <FileUploader
        tool="watermark"
        options={options}
        onFileSelected={(selectedFile: File | null) => {
          setFile(selectedFile);
          if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setPreviewUrl(url);
          } else {
            setPreviewUrl(null);
          }
        }}
        onJobCreated={setJobId}
      />

      {/* 2) PDF PREVIEW */}
      {previewUrl && <PdfPreview url={previewUrl} />}

      {/* 3) Controls */}
      <WatermarkControls onChange={setOptions} />

      {/* 4) Job Status + Download link */}
      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
