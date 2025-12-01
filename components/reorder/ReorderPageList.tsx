/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Required for PDFJS worker
// IMPORTANT: This path works in Next.js
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface Props {
  file: File;
  onOrderChange: (order: string) => void;
}

export default function ReorderPageList({ file, onOrderChange }: Props) {
  const [pages, setPages] = useState<{ id: string; img: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // Load PDF thumbnails
  // ----------------------------
  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tempPages: any[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: ctx, canvas, viewport }).promise;

        tempPages.push({
          id: String(i),
          img: canvas.toDataURL("image/jpeg"),
        });
      }

      setPages(tempPages);
      setLoading(false);

      // initial order
      onOrderChange(tempPages.map((p) => p.id).join(","));
    };

    loadPdf();
  }, [file, onOrderChange]);

  // ----------------------------
  // Drag & Drop Handler
  // ----------------------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(pages);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setPages(items);

    // update order string
    onOrderChange(items.map((p) => p.id).join(","));
  }

  // ----------------------------
  // UI
  // ----------------------------
  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-6">
        Generating page previews…
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-3">Drag pages to reorder</h2>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="pdf-pages" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-4 overflow-x-auto pb-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {pages.map((p, index) => (
                <Draggable key={p.id} draggableId={p.id} index={index}>
                  {(draggableProvided) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      className="cursor-move p-2 rounded-lg bg-white shadow hover:shadow-lg transition"
                    >
                      <img
                        src={p.img}
                        className="w-32 h-auto rounded border"
                        alt={`Page ${p.id}`}
                      />
                      <p className="text-center font-semibold mt-1">
                        Page {p.id}
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
