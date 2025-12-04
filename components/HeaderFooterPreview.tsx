/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function HeaderFooterPreview({
  pdfUrl,
  options,
}: {
  pdfUrl: string;
  options: any;
}) {
  const [images, setImages] = useState<string[]>([]);

  async function renderPDF() {
    const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];

    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const renderedPages: string[] = [];

    for (let p = 1; p <= Math.min(pdf.numPages, 2); p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 1.2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // Render page → canvas
      await page.render({ canvasContext: ctx, viewport }).promise;

      // Draw header & footer
      drawHeaderFooter(canvas, ctx);

      renderedPages.push(canvas.toDataURL("image/png"));
    }

    setImages(renderedPages);
  }

  function drawHeaderFooter(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const { header, footer, color, fontSize, align, marginTop, marginBottom } =
      options;

    ctx.fillStyle = color || "#000";
    ctx.font = `${fontSize || 28}px Arial`;

    ctx.textAlign = align || "center";

    // Header
    if (header) {
      ctx.fillText(header, canvas.width / 2, marginTop || 40);
    }

    // Footer
    if (footer) {
      ctx.fillText(
        footer,
        canvas.width / 2,
        canvas.height - (marginBottom || 40)
      );
    }
  }

  // Load script + render
  useEffect(() => {
    // Already loaded?
    if (window && (window as any).PDFJS_LOADED) {
      const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setTimeout(() => {
        renderPDF();
      }, 0);
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      (window as any).PDFJS_LOADED = true;
      const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      renderPDF();
    };
    document.body.appendChild(script);
  }, [pdfUrl, options]);

  return (
    <div className="space-y-6">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          className="shadow rounded border w-full max-w-3xl mx-auto"
        />
      ))}
    </div>
  );
}
