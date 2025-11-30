"use client";

import { useEffect, useRef } from "react";

export default function AdsterraNative() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adRef.current) return;

    // Clean previous injected scripts
    adRef.current.innerHTML = `
      <div id="container-19e526aef838b60dc6ab9d598eb7123a"></div>
    `;

    // Create script tag
    const script = document.createElement("script");
    script.src =
      "//pl28162896.effectivegatecpm.com/19e526aef838b60dc6ab9d598eb7123a/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    // Append to wrapper
    adRef.current.appendChild(script);
  }, []);

  return <div ref={adRef} className="w-full flex justify-center my-4"></div>;
}
