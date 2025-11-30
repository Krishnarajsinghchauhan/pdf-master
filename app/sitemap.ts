import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pixelpdf.in";

  const tools = [
    "merge",
    "split",
    "compress",
    "reorder",
    "rotate",
    "delete-pages",
    "pdf-to-word",
    "word-to-pdf",
    "pdf-to-excel",
    "excel-to-pdf",
    "pdf-to-ppt",
    "ppt-to-pdf",
    "jpg-to-pdf",
    "pdf-to-jpg",
    "png-to-pdf",
    "pdf-to-png",
    "edit",
    "watermark",
    "page-numbers",
    "header-footer",
    "protect",
    "unlock",
    "ocr",
    "image-to-text",
    "scanned-enhance",
    "esign",
    "fillable-forms",
    "combine",
  ];

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...tools.map((t) => ({
      url: `${base}/tools/${t}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
