"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faFileAlt,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import ProcessingStatus from "./ProcessingStatus";

interface FileUploaderProps {
  tool: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: Record<string, any>; // <- optional now
}

export default function FileUploader({ tool }: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<
    "idle" | "uploading" | "creating-job" | "processing" | "completed" | "error"
  >("idle");

  const [downloadUrl, setDownloadUrl] = useState<string>("");

  // FILE TYPES
  const allowedTypes: Record<string, string[]> = {
    merge: ["application/pdf"],
    split: ["application/pdf"],
    compress: ["application/pdf"],
    reorder: ["application/pdf"],
    rotate: ["application/pdf"],
    "delete-pages": ["application/pdf"],
    protect: ["application/pdf"],
    unlock: ["application/pdf"],

    // Office conversions
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

    // PDF <-> Image
    "jpg-to-pdf": [
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/pjpg",
      "image/jfif",
      "image/heic",
      "image/heif",
      "image/hevc",
    ],
    "pdf-to-jpg": ["application/pdf"],

    "png-to-pdf": [
      "image/png",
      "image/x-png",
      "image/heic",
      "image/heif",
      "image/hevc",
    ],
    "pdf-to-png": ["application/pdf"],

    // Editing
    edit: ["application/pdf"],
    watermark: ["application/pdf"],
    "page-numbers": ["application/pdf"],
    "header-footer": ["application/pdf"],

    // OCR
    ocr: ["application/pdf"],
    "image-to-text": [
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/pjpg",
      "image/jfif",
      "image/png",
      "image/x-png",
      "image/heic",
      "image/heif",
      "image/hevc",
    ],
    "scanned-enhance": ["application/pdf"],

    // eSign & Forms
    esign: ["application/pdf"],
    "fillable-forms": ["application/pdf"],

    // Combine supports EVERYTHING
    combine: [
      "application/pdf",

      // Images
      "image/jpeg",
      "image/jpg",
      "image/pjpeg",
      "image/pjpg",
      "image/jfif",
      "image/png",
      "image/x-png",
      "image/heic",
      "image/heif",
      "image/hevc",

      // Word
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      // Excel
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      // PowerPoint
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
  };

  const maxFileSizeMB = 200;
  const maxFiles = tool === "merge" || tool === "combine" ? 50 : 1;

  // ========================
  // ⭐ FILE DROP HANDLER
  // ========================
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("");
      const newFiles = [...files];

      for (const file of acceptedFiles) {
        const valid = allowedTypes[tool]?.includes(file.type);

        if (!valid) {
          setError("❌ Unsupported file type for this tool.");
          continue;
        }

        if (file.size / 1024 / 1024 > maxFileSizeMB) {
          setError(`❌ File too large. Max size: ${maxFileSizeMB} MB`);
          continue;
        }

        if (newFiles.length >= maxFiles) {
          setError(`❌ Maximum ${maxFiles} files allowed.`);
          break;
        }

        newFiles.push(file);
      }

      setFiles(newFiles);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [files, tool, maxFiles]
  );

  // Remove file
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

  // ------------------------------
  // ⭐ Upload + Job Creation Logic
  // ------------------------------

  async function uploadToS3(file: File) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/create-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name }),
      }
    );

    const data = await res.json();

    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

    return data.file_url;
  }

  async function pollStatus(jobID: string) {
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8080/job/status/${jobID}`);
      const data = await res.json();

      if (data.status === "completed") {
        clearInterval(interval);
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

  const onProcess = async () => {
    setStatus("uploading");

    const uploadedURLs = [];
    for (const f of files) uploadedURLs.push(await uploadToS3(f));

    setStatus("creating-job");

    const jobRes = await fetch("http://localhost:8080/job/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, files: uploadedURLs, options: {} }),
    });

    const jobData = await jobRes.json();
    setStatus("processing");
    pollStatus(jobData.job_id);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: maxFiles > 1,
    accept: allowedTypes[tool]?.reduce((acc, mime) => {
      const ext = mime.split("/")[1];
      acc[mime] = [
        `.${ext.replace("jpeg", "jpg")}`,
        `.${ext.replace("jpg", "jpeg")}`,
      ];
      return acc;
    }, {} as Record<string, string[]>),
  });

  // ------------------------------
  // ⭐ STATUS SCREEN
  // ------------------------------
  if (status !== "idle") {
    return (
      <ProcessingStatus
        status={status}
        message={
          status === "uploading"
            ? "⏳ Uploading your files…"
            : status === "creating-job"
            ? "⚙️ Preparing processing task…"
            : status === "processing"
            ? "🔄 Processing your file…"
            : status === "completed"
            ? "🎉 Your file is ready!"
            : "❌ Something went wrong"
        }
        downloadUrl={downloadUrl}
        onReset={resetAll}
      />
    );
  }

  // ------------------------------
  // ⭐ MAIN PREMIUM UI
  // ------------------------------
  return (
    <div className="mt-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer backdrop-blur-lg shadow-lg
          ${
            isDragActive
              ? "bg-blue-100 border-blue-500"
              : "bg-white/60 border-gray-300"
          }
        `}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl mb-4">
              <FontAwesomeIcon icon={faUpload} size="2x" />
            </div>

            <p className="text-gray-700 text-lg font-semibold">
              {isDragActive
                ? "Drop your files…"
                : "Drag & drop or click to upload"}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Allowed:{" "}
              {allowedTypes[tool]?.map((t) => t.split("/")[1]).join(", ")}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* ❗ Errors */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-600 text-sm mt-3 font-semibold"
        >
          {error}
        </motion.p>
      )}

      {/* 📄 FILE PREVIEWS */}
      {files.length > 0 && (
        <div className="mt-5 space-y-3">
          {files.map((file, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon
                  className="text-gray-500"
                  icon={faFileAlt}
                  size="lg"
                />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={() => onRemove(index)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FontAwesomeIcon icon={faTimesCircle} size="lg" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* 🚀 PROCESS BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onProcess}
        disabled={files.length === 0}
        className={`mt-8 w-full py-4 rounded-xl text-white text-lg font-semibold shadow-lg transition
          ${
            files.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-indigo-600 hover:opacity-90"
          }
        `}
      >
        Start Processing →
      </motion.button>
    </div>
  );
}
