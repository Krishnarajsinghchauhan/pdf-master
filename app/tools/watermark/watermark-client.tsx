"use client";

import { useState } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import FileUploader from "@/components/FileUploader";
import PdfPreview from "@/components/PdfPreview";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const [options, setOptions] = useState({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Always show watermark controls */}
      <WatermarkControls onChange={setOptions} />

      {/* File uploader */}
      <FileUploader
        tool="watermark"
        options={options}
        onFileSelected={(file) => {
          if (file) {
            setPreviewUrl(URL.createObjectURL(file));
          } else {
            setPreviewUrl(null);
          }
        }}
        onJobCreated={setJobId}
      />

      {/* PDF Preview */}
      {previewUrl && <PdfPreview url={previewUrl} />}

      {/* Job Status */}
      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
