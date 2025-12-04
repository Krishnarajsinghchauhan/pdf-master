import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Fix "canvas" required by pdfjs
    if (isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }

    // Force pdfjs to use browser build
    config.resolve.alias = {
      ...config.resolve.alias,
      "pdfjs-dist": "pdfjs-dist/build/pdf",
      "pdfjs-dist/build/pdf": "pdfjs-dist/build/pdf.js",
      "pdfjs-dist/legacy/build/pdf": "pdfjs-dist/legacy/build/pdf.js",
    };

    return config;
  },
};

export default nextConfig;
