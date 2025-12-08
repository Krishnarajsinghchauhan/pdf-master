"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePdf,
  faFileWord,
  faFileExcel,
  faImages,
  faSignature,
  faWrench,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import AdsterraNative from "./ads/AdsterraNative";

const tools = [
  // CORE PDF
  {
    name: "Merge PDF",
    path: "/tools/merge",
    icon: faFilePdf,
    color: "from-pink-500 to-red-500",
  },
  {
    name: "Split PDF",
    path: "/tools/split",
    icon: faFilePdf,
    color: "from-rose-400 to-red-500",
  },
  {
    name: "Compress PDF",
    path: "/tools/compress",
    icon: faFilePdf,
    color: "from-purple-500 to-indigo-500",
  },
  {
    name: "Reorder Pages",
    path: "/tools/reorder",
    icon: faWrench,
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Rotate Pages",
    path: "/tools/rotate",
    icon: faWrench,
    color: "from-sky-400 to-indigo-600",
  },
  {
    name: "Delete Pages",
    path: "/tools/delete-pages",
    icon: faWrench,
    color: "from-red-500 to-orange-500",
  },

  // OFFICE CONVERSIONS
  {
    name: "PDF to Word",
    path: "/tools/pdf-to-word",
    icon: faFileWord,
    color: "from-blue-500 to-blue-700",
  },
  {
    name: "Word to PDF",
    path: "/tools/word-to-pdf",
    icon: faFileWord,
    color: "from-indigo-500 to-blue-600",
  },
  {
    name: "PDF to Excel",
    path: "/tools/pdf-to-excel",
    icon: faFileExcel,
    color: "from-green-400 to-emerald-600",
  },
  {
    name: "Excel to PDF",
    path: "/tools/excel-to-pdf",
    icon: faFileExcel,
    color: "from-emerald-500 to-green-600",
  },
  {
    name: "PDF to PowerPoint",
    path: "/tools/pdf-to-ppt",
    icon: faFilePdf,
    color: "from-purple-600 to-fuchsia-600",
  },
  {
    name: "PowerPoint to PDF",
    path: "/tools/ppt-to-pdf",
    icon: faFilePdf,
    color: "from-fuchsia-600 to-purple-600",
  },

  // IMAGE <-> PDF
  {
    name: "PDF to JPG",
    path: "/tools/pdf-to-jpg",
    icon: faImages,
    color: "from-yellow-400 to-orange-500",
  },
  {
    name: "JPG to PDF",
    path: "/tools/jpg-to-pdf",
    icon: faImages,
    color: "from-orange-400 to-orange-600",
  },
  {
    name: "PDF to PNG",
    path: "/tools/pdf-to-png",
    icon: faImages,
    color: "from-green-400 to-green-700",
  },
  {
    name: "PNG to PDF",
    path: "/tools/png-to-pdf",
    icon: faImages,
    color: "from-teal-400 to-teal-700",
  },

  // PDF EDITING

  {
    name: "Add Watermark",
    path: "/tools/watermark",
    icon: faWrench,
    color: "from-blue-500 to-cyan-600",
  },
  {
    name: "Add Page Numbers",
    path: "/tools/page-numbers",
    icon: faWrench,
    color: "from-amber-500 to-orange-600",
  },
  {
    name: "Header & Footer",
    path: "/tools/header-footer",
    icon: faWrench,
    color: "from-gray-500 to-gray-700",
  },

  // SECURITY

  // OCR / AI
  {
    name: "OCR PDF",
    path: "/tools/ocr",
    icon: faFilePdf,
    color: "from-lime-500 to-green-700",
  },
  {
    name: "Image to Text",
    path: "/tools/image-to-text",
    icon: faImages,
    color: "from-lime-600 to-emerald-700",
  },
  {
    name: "Enhance Scan",
    path: "/tools/scanned-enhance",
    icon: faFilePdf,
    color: "from-yellow-600 to-red-600",
  },

  // eSIGN & FORMS
  {
    name: "eSign PDF",
    path: "/tools/esign",
    icon: faSignature,
    color: "from-teal-500 to-cyan-600",
  },
  {
    name: "Fillable Forms",
    path: "/tools/fillable-forms",
    icon: faCogs,
    color: "from-violet-500 to-purple-600",
  },

  // SMART COMBINE
];

export default function Home() {
  return (
    <div className="pb-10">
      {/* ⭐ Top Ad */}
      <div className="flex justify-center mb-6">
        <AdsterraNative />
      </div>

      <h1 className="text-3xl font-extrabold text-center mb-6 bg-linear-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text drop-shadow-md">
        PDF Tools Dashboard
      </h1>

      {/* Tool Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-2">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={tool.path}
              className="group block rounded-xl p-px bg-linear-to-br shadow-lg hover:shadow-2xl transition-all"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
              }}
            >
              <div
                className={`rounded-xl bg-white/80 backdrop-blur-md p-5 h-full transition-all group-hover:bg-white`}
              >
                {/* ICON */}
                <div
                  className={`w-14 h-14 flex items-center justify-center rounded-lg bg-linear-to-br ${tool.color} text-white shadow-lg group-hover:scale-110 transition`}
                >
                  <FontAwesomeIcon icon={tool.icon} size="2x" />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-lg font-bold text-gray-800 group-hover:text-black">
                  {tool.name}
                </h3>

                <p className="text-gray-500 text-sm mt-1 group-hover:text-gray-700">
                  Open tool →
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Bottom Ad */}
      <div className="flex justify-center mt-10">
        <AdsterraNative />
      </div>
    </div>
  );
}
