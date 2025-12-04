/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import HeaderFooterControls from "./HeaderFooterControls";
import PdfPreview from "@/components/PdfPreview";

export default function HeaderFooterClient() {
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<any>({});

  async function generatePreview(pdfFile: File, opts: any) {
    const req1 = await fetch(`${API}/upload/create-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: "hf_preview_" + pdfFile.name }),
    });

    const up = await req1.json();

    await fetch(up.url, { method: "PUT", body: pdfFile });

    const req2 = await fetch(`${API}/header-footer/preview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pdfUrl: up.file_url,
        options: opts,
      }),
    });

    const data = await req2.json();
    if (data.preview_url) setPreviewUrl(data.preview_url + "?t=" + Date.now());
  }

  useEffect(() => {
    const handler = (e: any) => {
      const f = e.detail;
      if (!f) return;
      setFile(f);
      generatePreview(f, options);
    };
    window.addEventListener("pdf-selected", handler);
    return () => window.removeEventListener("pdf-selected", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-6 mt-6">
      <HeaderFooterControls
        onChange={(opts: any) => {
          setOptions(opts);
          if (file) generatePreview(file, opts);
        }}
      />

      {previewUrl && <PdfPreview url={previewUrl} />}
    </div>
  );
}
