/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";

export default function GoogleAdBanner() {
  useEffect(() => {
    try {
      (window as any).adsbygoogle?.push({});
    } catch (e) {}
  }, []);

  return (
    <div className="w-[728px] h-[90px] bg-gray-200 rounded flex items-center justify-center">
      <span className="text-gray-500">Google Ad Banner (728×90)</span>
    </div>
  );
}
