/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

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

  function update(key: string, value: any) {
    const newObj = { ...values, [key]: value };
    setValues(newObj);
    onChange(newObj);
  }

  return (
    <div className="bg-white border rounded p-4 shadow">
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

      <label>Font Size ({values.fontSize}px)</label>
      <input
        type="range"
        min={10}
        max={100}
        value={values.fontSize}
        onChange={(e) => update("fontSize", Number(e.target.value))}
        className="w-full mb-3"
      />

      <label>Color</label>
      <input
        type="color"
        className="mb-3 block"
        value={values.color}
        onChange={(e) => update("color", e.target.value)}
      />

      <label>Align</label>
      <select
        className="border p-2 rounded w-full mb-3"
        value={values.align}
        onChange={(e) => update("align", e.target.value)}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <label>Top Margin ({values.marginTop}px)</label>
      <input
        type="range"
        min={10}
        max={200}
        value={values.marginTop}
        onChange={(e) => update("marginTop", Number(e.target.value))}
        className="w-full mb-3"
      />

      <label>Bottom Margin ({values.marginBottom}px)</label>
      <input
        type="range"
        min={10}
        max={200}
        value={values.marginBottom}
        onChange={(e) => update("marginBottom", Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}
