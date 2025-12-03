/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

export default function WatermarkControls({ onChange }: any) {
  const [values, setValues] = useState({
    type: "text",
    text: "WATERMARK",
    imageUrl: "",
    opacity: "0.25",
    fontSize: "60",
    color: "#000000",
    angle: "0",
    position: "center",
    scale: "50",
    repeat: "false",
  });

  const update = (key: any, value: any) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
    onChange(newState);

    // 🔥 expose to ToolPage
    (window as any).watermarkOptions = newState;
  };

  // listen when ToolPage requests watermark options
  useEffect(() => {
    function send() {
      (window as any).watermarkOptions = values;
    }
    window.addEventListener("watermark-options-request", send);
    return () => window.removeEventListener("watermark-options-request", send);
  }, [values]);

  return (
    <div className="border rounded-lg p-4 my-4 bg-white shadow-sm">
      <h3 className="font-semibold mb-3 text-lg">Watermark Type</h3>

      {/* TYPE SWITCH */}
      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            values.type === "text" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => update("type", "text")}
        >
          Text Watermark
        </button>

        <button
          className={`px-4 py-2 rounded ${
            values.type === "image" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => update("type", "image")}
        >
          Image Watermark
        </button>
      </div>

      {/* TEXT WATERMARK */}
      {values.type === "text" && (
        <div className="mb-4">
          <label className="font-medium mb-1 block">Text</label>
          <input
            type="text"
            value={values.text}
            className="w-full border p-2 rounded"
            onChange={(e) => update("text", e.target.value)}
          />
        </div>
      )}

      {/* IMAGE WATERMARK */}
      {values.type === "image" && (
        <div className="mb-4">
          <label className="font-medium block mb-1">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onload = () => update("imageUrl", reader.result);
              reader.readAsDataURL(file);
            }}
          />
        </div>
      )}

      {/* Opacity */}
      <div className="mb-4">
        <label className="font-medium">Opacity: {values.opacity}</label>
        <input
          type="range"
          min="0.05"
          max="1"
          step="0.05"
          value={values.opacity}
          className="w-full"
          onChange={(e) => update("opacity", e.target.value)}
        />
      </div>

      {/* Rotation */}
      <div className="mb-4">
        <label className="font-medium">Rotation Angle: {values.angle}°</label>
        <input
          type="range"
          min="-90"
          max="90"
          value={values.angle}
          className="w-full"
          onChange={(e) => update("angle", e.target.value)}
        />
      </div>

      {/* Font Size */}
      {values.type === "text" && (
        <div className="mb-4">
          <label className="font-medium mb-1 block">
            Font Size: {values.fontSize}
          </label>
          <input
            type="range"
            min="20"
            max="200"
            value={values.fontSize}
            className="w-full"
            onChange={(e) => update("fontSize", e.target.value)}
          />
        </div>
      )}

      {/* Image Scale */}
      {values.type === "image" && (
        <div className="mb-4">
          <label className="font-medium mb-1 block">
            Image Scale: {values.scale}%
          </label>
          <input
            type="range"
            min="10"
            max="200"
            value={values.scale}
            className="w-full"
            onChange={(e) => update("scale", e.target.value)}
          />
        </div>
      )}

      {/* Color */}
      {values.type === "text" && (
        <div className="mb-4">
          <label className="font-medium block mb-1">Color</label>
          <input
            type="color"
            value={values.color}
            onChange={(e) => update("color", e.target.value)}
          />
        </div>
      )}

      {/* POSITION */}
      <div className="mb-4">
        <label className="font-medium block mb-1">Position</label>
        <select
          value={values.position}
          onChange={(e) => update("position", e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="center">Center</option>
          <option value="north">Top</option>
          <option value="south">Bottom</option>
          <option value="west">Left</option>
          <option value="east">Right</option>
          <option value="northwest">Top Left</option>
          <option value="northeast">Top Right</option>
          <option value="southwest">Bottom Left</option>
          <option value="southeast">Bottom Right</option>
        </select>
      </div>

      {/* REPEAT */}
      <div>
        <label className="font-medium block mb-1">
          Repeat / Tile Watermark
        </label>
        <input
          type="checkbox"
          checked={values.repeat === "true"}
          onChange={(e) =>
            update("repeat", e.target.checked ? "true" : "false")
          }
        />
      </div>
    </div>
  );
}
