"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ProcessingStatus from "./ProcessingStatus";

interface FileUploaderProps {
  tool: string;
}

export default function FileUploader({ tool }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "creating-job" | "processing" | "completed" | "error"
  >("idle");

  const [downloadUrl, setDownloadUrl] = useState<string>("");

  // Allowed file types per tool
  const allowedTypes: Record<string, string[]> = {
    merge: ["application/pdf"],
    split: ["application/pdf"],
    compress: ["application/pdf"],
    reorder: ["application/pdf"],
    rotate: ["application/pdf"],
    "delete-pages": ["application/pdf"],
    protect: ["application/pdf"],
    unlock: ["application/pdf"],
    "pdf-to-word": ["application/pdf"],
    "pdf-to-excel": ["application/pdf"],
    "pdf-to-ppt": ["application/pdf"],

    "word-to-pdf": [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],

    "excel-to-pdf": [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ],

    "ppt-to-pdf": [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],

    "jpg-to-pdf": ["image/jpeg"],
    "pdf-to-jpg": ["application/pdf"],
    "png-to-pdf": ["image/png"],
    "pdf-to-png": ["application/pdf"],

    edit: ["application/pdf"],
    watermark: ["application/pdf"],
    "page-numbers": ["application/pdf"],
    "header-footer": ["application/pdf"],

    ocr: ["application/pdf"],
    "image-to-text": ["image/jpeg", "image/png"],
    "scanned-enhance": ["application/pdf"],

    esign: ["application/pdf"],
    "fillable-forms": ["application/pdf"],

    combine: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  };

  const maxFileSizeMB = 200;
  const maxFiles = tool === "merge" || tool === "combine" ? 50 : 1;

  // ------------------------------
  // ⭐ FILE DROP
  // ------------------------------
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("");

      const newFiles = [...files];

      for (const file of acceptedFiles) {
        const valid = allowedTypes[tool]?.includes(file.type);

        if (!valid) {
          setError("Unsupported file type for this tool.");
          continue;
        }

        if (file.size / 1024 / 1024 > maxFileSizeMB) {
          setError(`File too large. Maximum size is ${maxFileSizeMB} MB.`);
          continue;
        }

        if (newFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed.`);
          break;
        }

        newFiles.push(file);
      }

      setFiles(newFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files, tool, maxFiles]
  );

  const onRemove = (index: number) => {
    const updated = [...files];
    updated.splice(index, 1);
    setFiles(updated);
  };

  const resetAll = () => {
    setFiles([]);
    setError("");
    setStatus("idle");
    setDownloadUrl("");
  };

  // ---------------------------------------------------------
  // ⭐ STEP 4 — Upload File To S3 Using Presigned URL
  // ---------------------------------------------------------
  const uploadToS3 = async (file: File) => {
    // 1. Ask backend for presigned URL
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/create-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      }
    );

    const data = await res.json();

    // 2. Upload file directly to S3 using PUT
    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

    // 3. Return final S3 URL
    return data.file_url;
  };

  // ---------------------------------------------------------
  // ⭐ STEP 6 — Poll Status From Backend
  // ---------------------------------------------------------
  async function pollStatus(jobID: string) {
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8080/job/status/${jobID}`);
      const data = await res.json();

      if (data.status === "completed") {
        clearInterval(interval);

        // Get final output file URL
        const out = await fetch(`http://localhost:8080/job/result/${jobID}`);
        const resultData = await out.json();

        setDownloadUrl(resultData.file_url);
        setStatus("completed");
      }

      if (data.status === "error") {
        clearInterval(interval);
        setStatus("error");
      }
    }, 1500);
  }

  // ---------------------------------------------------------
  // ⭐ STEP 5 — Process Button (Upload → Create Job → Polling)
  // ---------------------------------------------------------
  const onProcess = async () => {
    setStatus("uploading");

    // Upload all files to S3
    const uploadedURLs = [];
    for (const f of files) {
      const url = await uploadToS3(f);
      uploadedURLs.push(url);
    }

    setStatus("creating-job");

    // Create job request
    const jobRes = await fetch("http://localhost:8080/job/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool,
        files: uploadedURLs,
        options: {},
      }),
    });

    const jobData = await jobRes.json();
    const jobID = jobData.job_id;

    setStatus("processing");

    // Start polling
    pollStatus(jobID);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: maxFiles > 1,
  });

  // ------------------------------
  // ⭐ Show processing UI
  // ------------------------------
  if (status !== "idle") {
    return (
      <ProcessingStatus
        status={status}
        message={
          status === "uploading"
            ? "Uploading your files to cloud storage…"
            : status === "creating-job"
            ? "Preparing your job request…"
            : status === "processing"
            ? "Processing your file with optimized servers…"
            : status === "completed"
            ? "Your file has been successfully processed!"
            : "Unexpected error occurred"
        }
        downloadUrl={downloadUrl}
        onReset={resetAll}
      />
    );
  }

  // ------------------------------
  // ⭐ Normal UI
  // ------------------------------
  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-10 text-center transition
        ${
          isDragActive
            ? "bg-blue-50 border-blue-400"
            : "bg-gray-50 border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600 text-lg">
          {isDragActive
            ? "Drop your files…"
            : "Drag & drop files or click to upload"}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Allowed: {allowedTypes[tool]?.map((t) => t.split("/")[1]).join(", ")}
        </p>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

      {/* Preview List */}
      {files.length > 0 && (
        <div className="mt-5 space-y-3">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-white shadow p-3 rounded"
            >
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

              <button
                onClick={() => onRemove(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Process Button */}
      <button
        onClick={onProcess}
        disabled={files.length === 0}
        className={`mt-6 w-full py-3 rounded text-white font-semibold transition 
          ${
            files.length === 0 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        Start Processing
      </button>
    </div>
  );
}
