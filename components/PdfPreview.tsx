"use client";

export default function PdfPreview({ url }: { url: string }) {
  return (
    <div className="border rounded shadow p-3 bg-white my-4">
      <h3 className="font-semibold mb-2">PDF Preview</h3>
      <iframe src={url} className="w-full h-[600px] border rounded" />
    </div>
  );
}
