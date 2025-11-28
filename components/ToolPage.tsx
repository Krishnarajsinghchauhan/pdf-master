"use client";

import { useState } from "react";

interface ToolPageProps {
  tool: string;
  children?: React.ReactNode;
}

export default function ToolPage({ tool }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("idle");
  const [downloadUrl, setDownloadUrl] = useState("");

  const API = process.env.NEXT_PUBLIC_API_URL; // http://localhost:8080

  // -----------------------------
  // 1. Upload directly to S3
  // -----------------------------
  async function uploadToS3(file: File) {
    // Ask backend for presigned URL
    const res = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name }),
    });

    const data = await res.json();

    // Upload to S3
    await fetch(data.url, {
      method: "PUT",
      body: file,
    });

    return data.file_url;
  }

  // -----------------------------
  // 2. Create Job (backend)
  // -----------------------------
  async function startProcessing() {
    if (files.length === 0) return alert("Upload at least 1 file");

    setStatus("uploading");

    const uploaded = [];
    for (const f of files) {
      const url = await uploadToS3(f);
      uploaded.push(url);
    }

    setStatus("creating-job");

    // 🔥 FIXED: Call backend, not Next.js
    const res = await fetch(`${API}/job/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool,
        files: uploaded,
        options: {},
      }),
    });

    const data = await res.json();
    pollStatus(data.job_id);
  }

  // -----------------------------
  // 3. Poll job status
  // -----------------------------
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

  // -----------------------------
  // 4. Render UI
  // -----------------------------
  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Upload Section */}
      <div className="border rounded p-4 text-center">
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />

        {files.length > 0 && (
          <div className="mt-4">
            {files.map((f) => (
              <p key={f.name}>{f.name}</p>
            ))}
          </div>
        )}
      </div>

      {/* Process Button */}
      <button
        onClick={startProcessing}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full"
      >
        Start Processing
      </button>

      {/* STATUS UI */}
      <div className="mt-6 text-center">
        {status === "uploading" && <p>Uploading files… 🚀</p>}
        {status === "creating-job" && <p>Creating job… 📝</p>}
        {status === "processing" && <p>Processing… ⚙️</p>}
        {status === "error" && <p className="text-red-500">Error ❌</p>}

        {status === "completed" && (
          <div className="mt-4">
            <a
              href={downloadUrl.replace("s3://", "https://")}
              target="_blank"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Download File
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
