"use client";

import { useState } from "react";
import WatermarkControls from "@/components/WatermarkControls";
import FileUploader from "@/components/FileUploader";
import PdfPreviewInteractive from "@/components/PdfPreviewInteractive";
import JobStatus from "@/components/JobStatus";

export default function WatermarkClient() {
  const [file, setFile] = useState<File | null>(null);
  const [options, setOptions] = useState<{ type: string }>({ type: "text" });
  const [jobId, setJobId] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* PREVIEW */}
      {file && <PdfPreviewInteractive file={file} options={options} />}

      {/* CONTROLS */}
      <WatermarkControls onChange={setOptions} />

      {/* FILE UPLOADER */}
      <FileUploader
        tool="watermark"
        options={options}
        onFileSelected={setFile}
        onJobCreated={setJobId}
      />

      {/* JOB STATUS */}
      {jobId && <JobStatus jobId={jobId} />}
    </div>
  );
}
