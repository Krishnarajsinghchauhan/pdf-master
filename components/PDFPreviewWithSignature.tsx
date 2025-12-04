/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

export default function PDFPreviewWithSignature({
  file,
  signature,
  onPositionChange,
}: {
  file: File;
  signature: string;
  onPositionChange: (pos: { x: number; y: number }) => void;
}) {
  const [pageWidth, setPageWidth] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [pos, setPos] = useState({ x: 350, y: 750 }); // Bottom-right-ish default

  const drag = (e: any) => {
    const rect = e.target.parentElement.getBoundingClientRect();
    const newX = e.clientX - rect.left - 50;
    const newY = e.clientY - rect.top - 20;

    setPos({ x: newX, y: newY });
    onPositionChange({ x: newX, y: newY });
  };

  return (
    <div className="relative inline-block">
      <Document file={file}>
        <Page
          pageNumber={1}
          width={500}
          onLoadSuccess={(p) => {
            setPageWidth(p.width);
            setPageHeight(p.height);
          }}
        />
      </Document>

      {/* Signature overlay */}
      {signature && (
        <img
          src={signature}
          className="absolute cursor-move"
          draggable="false"
          width={150}
          style={{
            left: pos.x,
            top: pos.y,
          }}
          onMouseDown={(e) => {
            e.preventDefault();
            window.addEventListener("mousemove", drag);
            window.addEventListener(
              "mouseup",
              () => {
                window.removeEventListener("mousemove", drag);
              },
              { once: true }
            );
          }}
        />
      )}
    </div>
  );
}
