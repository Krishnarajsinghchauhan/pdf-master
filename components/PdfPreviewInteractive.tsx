"use client";

import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";
import Image from "next/image";

import * as pdfjsLib from "pdfjs-dist/build/pdf";

import "react-resizable/css/styles.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.min.js`;

interface WatermarkOptions {
  type: string;
  text?: string;
  imageUrl?: string;
  opacity?: string;
  fontSize?: string;
  color?: string;
  angle?: string;
  position?: string;
  scale?: string;
  repeat?: string;
}

interface PdfPreviewProps {
  file: File | null;
  options: WatermarkOptions;
}

export default function PdfPreviewInteractive({
  file,
  options,
}: PdfPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pageImage, setPageImage] = useState<string | null>(null);

  const [wmSize, setWmSize] = useState({ width: 200, height: 80 });

  useEffect(() => {
    if (!file) return;

    const renderPDF = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      setPageImage(canvas.toDataURL("image/png"));
    };

    renderPDF();
  }, [file]);

  return (
    <div className="relative w-full max-w-3xl mx-auto select-none">
      {/* Hidden rendering canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {pageImage && (
        <div className="relative">
          {/* PDF Page */}
          <Image
            src={pageImage}
            alt="PDF Preview"
            width={1200}
            height={1600}
            className="rounded shadow w-full"
          />

          {/* Watermark overlay */}
          <Draggable bounds="parent">
            <Resizable
              width={wmSize.width}
              height={wmSize.height}
              onResize={(e, { size }) => setWmSize(size)}
            >
              <div
                style={{
                  width: wmSize.width,
                  height: wmSize.height,
                  opacity: parseFloat(options.opacity || "0.3"),
                  transform: `rotate(${options.angle || 0}deg)`,
                  color: options.color || "#000000",
                }}
                className="absolute top-10 left-10 border border-gray-300 flex items-center justify-center bg-transparent"
              >
                {/* TEXT WATERMARK */}
                {options.type === "text" ? (
                  <span
                    style={{
                      fontSize: `${options.fontSize || 40}px`,
                      fontWeight: "bold",
                    }}
                  >
                    {options.text || "WATERMARK"}
                  </span>
                ) : null}

                {/* IMAGE WATERMARK */}
                {options.type === "image" && options.imageUrl && (
                  <Image
                    src={options.imageUrl}
                    alt="Watermark Image"
                    fill
                    className="object-contain"
                  />
                )}
              </div>
            </Resizable>
          </Draggable>
        </div>
      )}
    </div>
  );
}
