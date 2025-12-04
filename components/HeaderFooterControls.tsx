/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";

export default function HeaderFooterControls({ onChange }: any) {
  const [values, setValues] = useState({
    header: "",
    footer: "",
    fontSize: "40",
    color: "#000000",
    align: "center",
    marginTop: "80",
    marginBottom: "80",
  });

  const update = (k: string, v: any) => {
    const obj = { ...values, [k]: v };
    setValues(obj);
    onChange(obj);
    (window as any).headerFooterOptions = obj;
  };

  useEffect(() => {
    function handler() {
      (window as any).headerFooterOptions = values;
    }
    window.addEventListener("hf-options-request", handler);
    return () => window.removeEventListener("hf-options-request", handler);
  }, [values]);

  return (
    <div className="bg-white border rounded p-4">
      <h3 className="font-semibold text-lg mb-4">Header & Footer Settings</h3>

      <label>Header Text</label>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows={2}
        value={values.header}
        onChange={(e) => update("header", e.target.value)}
      />

      <label>Footer Text</label>
      <textarea
        className="w-full border p-2 rounded mb-3"
        rows={2}
        value={values.footer}
        onChange={(e) => update("footer", e.target.value)}
      />

      <label>Font Size</label>
      <input
        type="range"
        min="20"
        max="120"
        value={values.fontSize}
        onChange={(e) => update("fontSize", e.target.value)}
        className="w-full mb-3"
      />

      <label>Color</label>
      <input
        type="color"
        value={values.color}
        onChange={(e) => update("color", e.target.value)}
        className="mb-3 block"
      />

      <label>Alignment</label>
      <select
        value={values.align}
        className="border p-2 rounded w-full mb-3"
        onChange={(e) => update("align", e.target.value)}
      >
        <option value="north">Top</option>
        <option value="south">Bottom</option>
        <option value="center">Center</option>
      </select>

      <label>Top Margin</label>
      <input
        type="range"
        min="20"
        max="300"
        value={values.marginTop}
        onChange={(e) => update("marginTop", e.target.value)}
        className="w-full mb-3"
      />

      <label>Bottom Margin</label>
      <input
        type="range"
        min="20"
        max="300"
        value={values.marginBottom}
        onChange={(e) => update("marginBottom", e.target.value)}
        className="w-full"
      />
    </div>
  );
}
