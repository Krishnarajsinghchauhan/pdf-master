/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";

// ✔ Browser-only version (no canvas)
import * as pdfjsLib from "pdfjs-dist/webpack";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js`;

export default function HeaderFooterPreview({ pdfUrl, options }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    async function render() {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });

      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // render page
      await page.render({ canvasContext: ctx, viewport }).promise;

      // draw header/footer
      ctx.font = `${options.fontSize}px Arial`;
      ctx.fillStyle = options.color;
      ctx.textAlign = "center";

      ctx.fillText(options.header, canvas.width / 2, Number(options.marginTop));
      ctx.fillText(
        options.footer,
        canvas.width / 2,
        canvas.height - Number(options.marginBottom)
      );
    }

    render();
  }, [pdfUrl, options]);

  return (
    <div className="border rounded p-4 bg-white shadow mt-4">
      <h3 className="font-semibold mb-2">Preview</h3>
      <canvas ref={canvasRef} className="w-full rounded" />
    </div>
  );
}
