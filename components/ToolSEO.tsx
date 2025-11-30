interface ToolSEOProps {
  title: string;
  description: string;
}

export default function ToolSEO({ title, description }: ToolSEOProps) {
  return (
    <div className="mt-8 space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>

      <p className="text-gray-700">{description}</p>

      <h2 className="text-xl font-semibold mt-6">How to use this tool?</h2>
      <ol className="list-decimal ml-6 text-gray-700 space-y-1">
        <li>Upload your file using the upload button.</li>
        <li>Wait for our fast cloud converter to process it.</li>
        <li>Download the output file instantly.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6">Why choose PixelPDF?</h2>
      <ul className="list-disc ml-6 text-gray-700 space-y-1">
        <li>Free and unlimited usage</li>
        <li>No signup required</li>
        <li>Fast cloud servers</li>
        <li>Your files are automatically deleted</li>
        <li>Works on mobile, tablet, and desktop</li>
      </ul>
    </div>
  );
}
