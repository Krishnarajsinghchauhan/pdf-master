import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Switch build system from Turbopack → Webpack (necessary for aliasing)
  experimental: {
    webpackBuildWorker: false,
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "pdfjs-dist/build/pdf": "pdfjs-dist/webpack",
      "pdfjs-dist/build/pdf.js": "pdfjs-dist/webpack",
    };
    return config;
  },
};

export default nextConfig;
