"use client";

import { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePad({
  onComplete,
}: {
  onComplete: (dataUrl: string) => void;
}) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(2);

  const clear = () => {
    sigRef.current?.clear();
    onComplete("");
  };

  const save = () => {
    if (!sigRef.current) return;
    const dataUrl = sigRef.current.getTrimmedCanvas().toDataURL("image/png");
    onComplete(dataUrl);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Draw Your Signature</h3>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <label className="text-sm">Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <label className="text-sm ml-4">Size:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(Number(e.target.value))}
        />
      </div>

      {/* Signature board */}
      <SignatureCanvas
        ref={sigRef}
        penColor={color}
        minWidth={penSize}
        maxWidth={penSize}
        canvasProps={{
          width: 500,
          height: 200,
          className: "border rounded bg-white shadow",
        }}
        onEnd={save}
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={clear}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Clear
        </button>

        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Signature
        </button>
      </div>
    </div>
  );
}
