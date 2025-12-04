"use client";

import { Document, Page } from "react-pdf";

export default function HeaderFooterPreview({ url }: { url: string }) {
  return (
    <div className="border p-3 bg-white rounded shadow">
      <Document
        file={url}
        loading={<p className="text-center p-4">Loading preview...</p>}
        error={<p className="text-red-600 p-4">Failed to load PDF preview</p>}
      >
        {/* Render ONLY first page */}
        <Page
          pageNumber={1}
          width={600}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
}
