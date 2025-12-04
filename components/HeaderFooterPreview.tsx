/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js`;

export default function HeaderFooterPreview({ pdfUrl, options }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pdfUrl) return;

    async function render() {
      const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render base PDF
      await page.render({ canvasContext: ctx, viewport }).promise;

      // Draw header
      ctx.font = `${options.fontSize}px Arial`;
      ctx.fillStyle = options.color;
      ctx.textAlign = options.align;
      ctx.fillText(
        options.header,
        options.align === "left"
          ? 50
          : options.align === "right"
          ? canvas.width - 50
          : canvas.width / 2,
        options.marginTop
      );

      // Draw footer
      ctx.fillText(
        options.footer,
        options.align === "left"
          ? 50
          : options.align === "right"
          ? canvas.width - 50
          : canvas.width / 2,
        canvas.height - options.marginBottom
      );
    }

    render();
  }, [pdfUrl, options]);

  return (
    <div className="border rounded p-4 bg-white shadow">
      <h3 className="font-semibold mb-2">Live Preview</h3>
      <canvas ref={canvasRef} className="w-full rounded" />
    </div>
  );
}
