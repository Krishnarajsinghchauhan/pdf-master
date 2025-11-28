// app/page.tsx
import Link from "next/link";
import GoogleAdBanner from "./ads/GoogleAdBanner"; // <-- client component

const tools = [
  { name: "Merge PDF", path: "/tools/merge" },
  { name: "Split PDF", path: "/tools/split" },
  { name: "Compress PDF", path: "/tools/compress" },
  { name: "Reorder Pages", path: "/tools/reorder" },
  { name: "Rotate Pages", path: "/tools/rotate" },
  { name: "Delete Pages", path: "/tools/delete-pages" },

  { name: "PDF to Word", path: "/tools/pdf-to-word" },
  { name: "Word to PDF", path: "/tools/word-to-pdf" },
  { name: "PDF to Excel", path: "/tools/pdf-to-excel" },
  { name: "Excel to PDF", path: "/tools/excel-to-pdf" },
  { name: "PDF to PowerPoint", path: "/tools/pdf-to-ppt" },
  { name: "PowerPoint to PDF", path: "/tools/ppt-to-pdf" },

  { name: "JPG to PDF", path: "/tools/jpg-to-pdf" },
  { name: "PDF to JPG", path: "/tools/pdf-to-jpg" },
  { name: "PNG to PDF", path: "/tools/png-to-pdf" },
  { name: "PDF to PNG", path: "/tools/pdf-to-png" },

  { name: "Edit PDF", path: "/tools/edit" },
  { name: "Add Watermark", path: "/tools/watermark" },
  { name: "Add Page Numbers", path: "/tools/page-numbers" },
  { name: "Header & Footer", path: "/tools/header-footer" },

  { name: "Protect PDF", path: "/tools/protect" },
  { name: "Unlock PDF", path: "/tools/unlock" },

  { name: "OCR PDF", path: "/tools/ocr" },
  { name: "Image to Text", path: "/tools/image-to-text" },
  { name: "Scanned PDF Enhancer", path: "/tools/scanned-enhance" },

  { name: "eSign PDF", path: "/tools/esign" },
  { name: "Create Fillable Forms", path: "/tools/fillable-forms" },

  { name: "PDF Combine", path: "/tools/combine" },
];

export default function Home() {
  return (
    <>
      {/* ⭐ Top Ad */}
      <div className="flex justify-center mb-6">
        <GoogleAdBanner />
      </div>

      {/* Main Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.path}
            className="bg-white p-6 rounded shadow hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold">{tool.name}</h3>
            <p className="text-gray-500 mt-1">Open tool</p>
          </Link>
        ))}
      </div>

      {/* ⭐ Bottom Ad */}
      <div className="flex justify-center mt-8">
        <GoogleAdBanner />
      </div>
    </>
  );
}
