"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudUploadAlt,
  faCloudArrowDown,
  faSpinner,
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

interface ToolPageProps {
  tool: string;
  title: string;
}

export default function ToolPage({ tool, title }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL;

  // ----------------------------
  // Upload to S3
  // ----------------------------
  async function uploadToS3(file: File) {
    const res = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name }),
    });

    const data = await res.json();

    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

    return data.file_url;
  }

  // ----------------------------
  // Start Processing
  // ----------------------------
  async function startProcessing() {
    if (files.length === 0) return alert("Please upload at least 1 file.");

    setStatus("uploading");

    const uploaded: string[] = [];
    for (const f of files) {
      const url = await uploadToS3(f);
      uploaded.push(url);
    }

    setStatus("creating-job");

    const res = await fetch(`${API}/job/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool,
        files: uploaded,
      }),
    });

    const data = await res.json();
    pollStatus(data.job_id);
  }

  // ----------------------------
  // Poll job status
  // ----------------------------
  async function pollStatus(jobID: string) {
    setStatus("processing");

    const interval = setInterval(async () => {
      const res = await fetch(`${API}/job/status/${jobID}`);
      const data = await res.json();

      if (data.status === "completed") {
        clearInterval(interval);

        const result = await fetch(`${API}/job/result/${jobID}`);
        const resultData = await result.json();

        setDownloadUrl(resultData.file_url);
        setStatus("completed");
      }

      if (data.status === "error") {
        clearInterval(interval);
        setStatus("error");
      }
    }, 1500);
  }

  // ----------------------------
  // Main UI
  // ----------------------------
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-center bg-linear-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text drop-shadow mb-8">
        {title}
      </h1>

      {/* Upload Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-xl p-8"
      >
        <label className="block text-center text-gray-700 font-semibold mb-4 text-lg">
          Upload your files
        </label>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            id="fileInput"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />

          <label htmlFor="fileInput" className="cursor-pointer">
            <FontAwesomeIcon
              icon={faCloudUploadAlt}
              className="text-5xl text-blue-600 mb-3"
            />
            <p className="text-gray-600 text-lg">
              Click to upload or drag files here
            </p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            {files.map((file) => (
              <div
                key={file.name}
                className="rounded-lg bg-white shadow p-3 font-medium text-gray-800 flex justify-between"
              >
                <span>{file.name}</span>
                <span className="text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Process Button */}
        <button
          onClick={startProcessing}
          disabled={files.length === 0}
          className={`mt-6 w-full py-4 rounded-xl font-semibold text-white text-lg shadow-md transition ${
            files.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-linear-to-r from-blue-600 to-blue-700 hover:opacity-90"
          }`}
        >
          Start Processing
        </button>
      </motion.div>

      {/* Status Box */}
      <div className="text-center mt-8">
        {status === "uploading" && (
          <StatusIndicator icon={faSpinner} text="Uploading files…" spin />
        )}
        {status === "creating-job" && (
          <StatusIndicator icon={faSpinner} text="Preparing your job…" spin />
        )}
        {status === "processing" && (
          <StatusIndicator icon={faSpinner} text="Processing…" spin />
        )}
        {status === "completed" && (
          <div className="space-y-4">
            <StatusIndicator
              icon={faCircleCheck}
              text="Your file is ready!"
              color="text-green-600"
            />

            <a
              href={downloadUrl}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow hover:bg-green-700"
            >
              <FontAwesomeIcon icon={faCloudArrowDown} />
              Download File
            </a>
          </div>
        )}
        {status === "error" && (
          <StatusIndicator
            icon={faCircleExclamation}
            text="Something went wrong"
            color="text-red-600"
          />
        )}
      </div>
    </div>
  );
}

// -----------------------------------------
// Reusable Status Component
// -----------------------------------------
function StatusIndicator({
  icon,
  text,
  color = "text-blue-600",
  spin = false,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any) {
  return (
    <div className="flex flex-col items-center gap-3">
      <FontAwesomeIcon
        icon={icon}
        className={`${color} ${spin ? "animate-spin" : ""}`}
        size="3x"
      />
      <p className="text-lg font-semibold text-gray-700">{text}</p>
    </div>
  );
}
