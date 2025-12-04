/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import HeaderFooterControls from "./HeaderFooterControls";
import HeaderFooterPreview from "./HeaderFooterPreview";

export default function HeaderFooterClient() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<any>({});
  const [processing, setProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  // -------------------------------
  // Handle PDF selection from FileUploader
  // -------------------------------
  useEffect(() => {
    const handler = (e: any) => {
      const f = e.detail;
      if (!f) return;

      setFile(f);
      const url = URL.createObjectURL(f);
      setFileUrl(url);
    };

    window.addEventListener("pdf-selected", handler);
    return () => window.removeEventListener("pdf-selected", handler);
  }, []);

  // -------------------------------
  // Start Backend Processing
  // -------------------------------
  async function startProcessing() {
    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    setProcessing(true);
    setResultUrl(null);

    // 1. Create upload URL for final processing
    const req1 = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: "header_footer_" + file.name,
      }),
    });

    const upload = await req1.json();

    // 2. Upload the original file to S3
    await fetch(upload.url, {
      method: "PUT",
      body: file,
    });

    // 3. Create job WITH OPTIONS (THIS WAS THE MISSING PART)
    const req2 = await fetch(`${API}/job/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "header-footer",
        files: [upload.file_url],
        options: {
          header: options.header || "",
          footer: options.footer || "",
          fontSize: String(options.fontSize || 28),
          color: options.color || "#000000",
          align: options.align || "center",
          marginTop: String(options.marginTop || 40),
          marginBottom: String(options.marginBottom || 40),
        },
      }),
    });

    const job = await req2.json();

    // 4. Poll worker until completed
    const jobId = job.job_id;

    async function pollStatus() {
      const st = await fetch(`${API}/job/status/${jobId}`);
      const stJson = await st.json();

      if (stJson.status === "completed") {
        const resultReq = await fetch(`${API}/job/result/${jobId}`);
        const resultJson = await resultReq.json();
        setResultUrl(resultJson.url);
        setProcessing(false);
      } else if (stJson.status === "error") {
        setProcessing(false);
        alert("Something went wrong during processing.");
      } else {
        setTimeout(pollStatus, 1500);
      }
    }

    pollStatus();
  }

  return (
    <div className="space-y-6 mt-6">
      {/* CONTROLS */}
      <HeaderFooterControls onChange={setOptions} />

      {/* PREVIEW */}
      {fileUrl && <HeaderFooterPreview pdfUrl={fileUrl} options={options} />}

      {/* PROCESSING BUTTON */}
      {fileUrl && (
        <button
          onClick={startProcessing}
          className="px-6 py-3 bg-blue-600 text-white rounded font-semibold shadow hover:bg-blue-700"
          disabled={processing}
        >
          {processing ? "Processing..." : "Start Processing"}
        </button>
      )}

      {/* DOWNLOAD RESULT */}
      {resultUrl && (
        <a
          href={resultUrl}
          target="_blank"
          className="block text-center text-green-600 font-semibold underline"
        >
          Download Processed PDF
        </a>
      )}
    </div>
  );
}
