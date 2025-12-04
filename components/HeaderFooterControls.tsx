/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

export default function HeaderFooterControls({ onChange }: any) {
  const [values, setValues] = useState({
    header: "",
    footer: "",
    fontSize: 28,
    color: "#000000",
    align: "center",
    marginTop: 40,
    marginBottom: 40,
  });

  // 🔥 Push updated values to parent every time ANY setting changes
  useEffect(() => {
    console.log("🔥 Controls -> sending updated values:", values);
    onChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  function update(key: string, value: any) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="font-semibold text-lg mb-4">Header & Footer Settings</h3>

      <label>Header</label>
      <textarea
        className="w-full border p-2 mb-2"
        rows={2}
        value={values.header}
        onChange={(e) => update("header", e.target.value)}
      />

      <label>Footer</label>
      <textarea
        className="w-full border p-2 mb-2"
        rows={2}
        value={values.footer}
        onChange={(e) => update("footer", e.target.value)}
      />

      <label>Font Size ({values.fontSize}px)</label>
      <input
        type="range"
        min="16"
        max="80"
        value={values.fontSize}
        onChange={(e) => update("fontSize", Number(e.target.value))}
      />

      <label>Color</label>
      <input
        type="color"
        value={values.color}
        onChange={(e) => update("color", e.target.value)}
      />

      <label>Alignment</label>
      <select
        value={values.align}
        onChange={(e) => update("align", e.target.value)}
      >
        <option value="center">Center</option>
        <option value="left">Left</option>
        <option value="right">Right</option>
      </select>

      <label>Top Margin ({values.marginTop}px)</label>
      <input
        type="range"
        min="10"
        max="200"
        value={values.marginTop}
        onChange={(e) => update("marginTop", Number(e.target.value))}
      />

      <label>Bottom Margin ({values.marginBottom}px)</label>
      <input
        type="range"
        min="10"
        max="200"
        value={values.marginBottom}
        onChange={(e) => update("marginBottom", Number(e.target.value))}
      />
    </div>
  );
}
