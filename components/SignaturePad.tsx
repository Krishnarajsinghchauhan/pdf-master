/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useState } from "react";

export default function SignaturePad({
  onComplete,
}: {
  onComplete: (dataUrl: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [penColor, setPenColor] = useState("#000000");
  const [penSize, setPenSize] = useState(3);

  const start = (e: any) => {
    setDrawing(true);
    draw(e);
  };

  const end = () => {
    setDrawing(false);
    const url = canvasRef.current!.toDataURL("image/png");
    onComplete(url);
  };

  const draw = (e: any) => {
    if (!drawing) return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const rect = canvas.getBoundingClientRect();

    ctx.lineWidth = penSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = penColor;

    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    onComplete("");
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Draw Your Signature</h3>

      <div className="flex gap-3">
        <label>Color:</label>
        <input
          type="color"
          value={penColor}
          onChange={(e) => setPenColor(e.target.value)}
        />

        <label>Size:</label>
        <input
          type="range"
          min="1"
          max="10"
          value={penSize}
          onChange={(e) => setPenSize(Number(e.target.value))}
        />
      </div>

      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        className="border rounded bg-white shadow"
        onMouseDown={start}
        onMouseUp={end}
        onMouseMove={draw}
      />

      <button
        className="px-4 py-2 bg-red-600 text-white rounded"
        onClick={clear}
      >
        Clear
      </button>
    </div>
  );
}
