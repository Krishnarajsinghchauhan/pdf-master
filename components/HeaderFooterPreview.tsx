/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

interface HeaderFooterPreviewProps {
  pdfUrl: string;
  options: {
    color: string;
    fontSize: number;
    align: CanvasTextAlign;
    header?: string;
    footer?: string;
    marginTop: number;
    marginBottom: number;
  };
}

export default function HeaderFooterPreview({
  pdfUrl,
  options,
}: HeaderFooterPreviewProps) {
  const [images, setImages] = useState<string[]>([]);

  async function renderPDF() {
    const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;

    const out: string[] = [];

    for (let p = 1; p <= Math.min(pdf.numPages, 2); p++) {
      const page = await pdf.getPage(p);
      const viewport = page.getViewport({ scale: 1.2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      ctx.fillStyle = options.color;
      ctx.font = `${options.fontSize}px Arial`;
      ctx.textAlign = options.align;

      if (options.header)
        ctx.fillText(options.header, canvas.width / 2, options.marginTop);

      if (options.footer)
        ctx.fillText(
          options.footer,
          canvas.width / 2,
          canvas.height - options.marginBottom
        );

      out.push(canvas.toDataURL());
    }

    setImages(out);
  }

  useEffect(() => {
    if (!pdfUrl) return;

    const runRenderPDF = async () => {
      if ((window as any).PDFJS_LOADED) {
        await renderPDF();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
      script.onload = async () => {
        const pdfjsLib = (window as any)["pdfjs-dist/build/pdf"];
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

        (window as any).PDFJS_LOADED = true;
        await renderPDF();
      };
      document.body.appendChild(script);
    };

    runRenderPDF();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfUrl, options]);

  return (
    <div className="space-y-6">
      {images.map((src, i) => (
        <img key={i} src={src} className="rounded shadow border" />
      ))}
    </div>
  );
}
