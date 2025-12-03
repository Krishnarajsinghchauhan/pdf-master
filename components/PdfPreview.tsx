"use client";

export default function PdfPreview({ url }: { url: string }) {
  return (
    <div className="border rounded shadow p-3 bg-white my-4">
      <h3 className="font-semibold mb-2">PDF Preview</h3>

      {/* Now showing first page PNG preview */}
      <img src={url} className="w-full rounded" alt="Preview" />
    </div>
  );
}
