"use client";

import dynamic from "next/dynamic";
import React from "react";

// Load ReorderPageList ONLY in browser (no SSR)
const ReorderPageList = dynamic(() => import("./reorder/ReorderPageList"), {
  ssr: false, // IMPORTANT: prevents DOMMatrix / pdf.js SSR crash
  loading: () =>
    React.createElement(
      "p",
      { className: "text-center text-gray-500 mt-4" },
      "Loading PDF preview…"
    ),
});

export default ReorderPageList;
