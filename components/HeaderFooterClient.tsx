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

  useEffect(() => {
    const handler = (e: any) => {
      const f = e.detail;
      if (!f) return;

      setFile(f);
      setFileUrl(URL.createObjectURL(f));
    };
    window.addEventListener("pdf-selected", handler);
    return () => window.removeEventListener("pdf-selected", handler);
  }, []);

  // ✨ PROCESS PDF BUTTON
  async function startProcessing() {
    if (!file) return alert("Upload a PDF first!");

    console.log("🔵 Sending header/footer options to backend:", options);

    setProcessing(true);
    setResultUrl(null);

    // 1. Create upload URL
    const req1 = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: "header_footer_" + file.name }),
    });

    const upload = await req1.json();

    // 2. Upload original PDF
    await fetch(upload.url, { method: "PUT", body: file });

    // 3. Create job
    const req2 = await fetch(`${API}/job/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tool: "header-footer",
        files: [upload.file_url],
        options: {
          header: options.header,
          footer: options.footer,
          fontSize: String(options.fontSize),
          color: options.color,
          align: options.align,
          marginTop: String(options.marginTop),
          marginBottom: String(options.marginBottom),
        },
      }),
    });

    const job = await req2.json();
    const jobId = job.job_id;

    // 4. Polling
    async function poll() {
      const st = await fetch(`${API}/job/status/${jobId}`).then((r) =>
        r.json()
      );

      console.log("🟡 Worker Status:", st);

      if (st.status === "completed") {
        const res = await fetch(`${API}/job/result/${jobId}`).then((r) =>
          r.json()
        );
        setResultUrl(res.url);
        setProcessing(false);
        return;
      }

      if (st.status === "error") {
        setProcessing(false);
        alert("Processing failed.");
        return;
      }

      setTimeout(poll, 1500);
    }

    poll();
  }

  return (
    <div className="space-y-6 mt-6">
      <HeaderFooterControls onChange={setOptions} />

      {fileUrl && <HeaderFooterPreview pdfUrl={fileUrl} options={options} />}

      {fileUrl && (
        <button
          onClick={startProcessing}
          disabled={processing}
          className="px-5 py-3 bg-blue-600 text-white rounded shadow"
        >
          {processing ? "Processing..." : "Start Processing"}
        </button>
      )}

      {resultUrl && (
        <a
          href={resultUrl}
          target="_blank"
          className="block mt-4 text-center text-green-600 font-bold underline"
        >
          Download Edited PDF
        </a>
      )}
    </div>
  );
}
