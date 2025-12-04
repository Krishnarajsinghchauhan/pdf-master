"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import "pdfjs-dist/legacy/build/pdf.worker";

// Use CDN worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

export default function HeaderFooterPreview({ url }: { url: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!url || !canvasRef.current) return;

    const load = async () => {
      const pdf = await pdfjsLib.getDocument(url).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.2 });
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: ctx, viewport }).promise;
    };

    load();
  }, [url]);

  return (
    <div className="border p-3 bg-white rounded shadow">
      <canvas ref={canvasRef} className="w-full"></canvas>
    </div>
  );
}
