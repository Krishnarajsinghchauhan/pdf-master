"use client";

import { useRef, useState, useMemo } from "react";

type SignatureItem = {
  id: number;
  image: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  type: string;
};

type Props = {
  file: File | null;
  signatures: SignatureItem[];
  setSignatures: (items: SignatureItem[]) => void;
};

export default function PDFPreviewWithSignature({
  file,
  signatures,
  setSignatures,
}: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // For storing current drag offset reference (no stale state)
  const dragRef = useRef({
    id: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const [activeId, setActiveId] = useState<number | null>(null);

  const pdfUrl = useMemo(() => (file ? URL.createObjectURL(file) : ""), [file]);
  if (!file) return <p>No PDF selected.</p>;

  /* -------------------------------
      SAFE UPDATE SIGNATURE
  ------------------------------- */
  function updateSignature(id: number, update: Partial<SignatureItem>) {
    const updatedSignatures = signatures.map((s: SignatureItem) =>
      s.id === id ? { ...s, ...update } : s
    );
    setSignatures(updatedSignatures);
  }

  /* -------------------------------
        ON DRAG START
  ------------------------------- */
  function startDrag(sig: SignatureItem, clientX: number, clientY: number) {
    setActiveId(sig.id);

    const rect = overlayRef.current!.getBoundingClientRect();

    // IMPORTANT:
    // Offset is from POINTER → SIGNATURE TOP-LEFT
    dragRef.current = {
      id: sig.id,
      offsetX: clientX - rect.left - sig.x,
      offsetY: clientY - rect.top - sig.y,
    };

    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", stopDrag);

    window.addEventListener("touchmove", onDragMove, { passive: false });
    window.addEventListener("touchend", stopDrag);
  }

  /* -------------------------------
        DRAG MOVE (smooth + safe)
  ------------------------------- */
  function onDragMove(ev: MouseEvent | TouchEvent) {
    let x, y;

    if (ev instanceof MouseEvent) {
      x = ev.clientX;
      y = ev.clientY;
    } else {
      x = ev.touches[0].clientX;
      y = ev.touches[0].clientY;
      ev.preventDefault();
    }

    const rect = overlayRef.current!.getBoundingClientRect();

    const sig = signatures.find((s) => s.id === dragRef.current.id);
    if (!sig) return;

    // New top-left position = pointer - offset
    let newX = x - rect.left - dragRef.current.offsetX;
    let newY = y - rect.top - dragRef.current.offsetY;

    // Clamp inside container
    const maxX = rect.width - sig.size;
    const maxY = rect.height - sig.size;

    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(0, Math.min(newY, maxY));

    updateSignature(sig.id, { x: newX, y: newY });
  }

  /* -------------------------------
        STOP DRAG
  ------------------------------- */
  function stopDrag() {
    window.removeEventListener("mousemove", onDragMove);
    window.removeEventListener("mouseup", stopDrag);

    window.removeEventListener("touchmove", onDragMove);
    window.removeEventListener("touchend", stopDrag);
  }

  /* -------------------------------
        APPLY SIZE CHANGE 
        Without Jumping
  ------------------------------- */
  function changeSize(sig: SignatureItem, newSize: number) {
    const centerX = sig.x + sig.size / 2;
    const centerY = sig.y + sig.size / 2;

    const newX = centerX - newSize / 2;
    const newY = centerY - newSize / 2;

    updateSignature(sig.id, {
      size: newSize,
      x: newX,
      y: newY,
    });
  }

  /* -------------------------------
        SMOOTH ROTATION (no jump)
  ------------------------------- */
  function changeRotation(sig: SignatureItem, rot: number) {
    updateSignature(sig.id, { rotation: rot });
  }

  /* -------------------------------
        UI
  ------------------------------- */
  return (
    <div className="w-full flex flex-col items-center gap-6 mt-6">
      <div className="relative w-full max-w-[850px] h-[80vh] overflow-auto border rounded-xl shadow bg-gray-100">
        <embed
          src={pdfUrl}
          type="application/pdf"
          className="w-full min-h-[1200px] pointer-events-none"
        />

        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ pointerEvents: "none" }}
        >
          {signatures.map((sig) => (
            <div
              key={sig.id}
              className="absolute"
              style={{
                left: sig.x,
                top: sig.y,
                transform: `rotate(${sig.rotation}deg)`,
                transformOrigin: "center center",
                pointerEvents: "auto",
                zIndex: activeId === sig.id ? 200 : 50,
              }}
              onMouseDown={(e) => startDrag(sig, e.clientX, e.clientY)}
              onTouchStart={(e) =>
                startDrag(sig, e.touches[0].clientX, e.touches[0].clientY)
              }
            >
              <img
                src={sig.image}
                width={sig.size}
                className="pointer-events-none select-none"
                draggable={false}
              />

              {/* Controls */}
              {activeId === sig.id && (
                <div className="mt-2 p-3 bg-white border rounded shadow flex flex-col gap-2">
                  {/* SIZE */}
                  <label className="text-xs font-semibold">Size</label>
                  <input
                    type="range"
                    min={40}
                    max={300}
                    value={sig.size}
                    onChange={(e) => changeSize(sig, Number(e.target.value))}
                  />

                  {/* ROTATION */}
                  <label className="text-xs font-semibold">Rotation</label>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    value={sig.rotation}
                    onChange={(e) =>
                      changeRotation(sig, Number(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
