/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import HeaderFooterControls from "./HeaderFooterControls";
import HeaderFooterPreview from "./HeaderFooterPreview";

export default function HeaderFooterClient() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    const handler = (e: any) => {
      const f = e.detail;
      if (!f) return;

      const pdfBlobUrl = URL.createObjectURL(f);
      setFileUrl(pdfBlobUrl);
    };

    window.addEventListener("pdf-selected", handler);
    return () => window.removeEventListener("pdf-selected", handler);
  }, []);

  return (
    <div className="space-y-6 mt-6">
      <HeaderFooterControls onChange={setOptions} />
      {fileUrl && <HeaderFooterPreview pdfUrl={fileUrl} options={options} />}
    </div>
  );
}
