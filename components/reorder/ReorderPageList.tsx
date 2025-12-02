/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdfjs/pdf.worker.min.js";

interface Props {
  file: File;
  onOrderChange: (order: string) => void;
}

export default function ReorderPageList({ file, onOrderChange }: Props) {
  const [pages, setPages] = useState<
    { id: string; pageNumber: number; img: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Load PDF ONLY when file changes
  useEffect(() => {
    const loadPdf = async () => {
      setLoading(true);

      const buffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;

      const tmp: { id: string; pageNumber: number; img: string }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 0.5 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: ctx, viewport }).promise;

        tmp.push({
          id: crypto.randomUUID(),
          pageNumber: i,
          img: canvas.toDataURL("image/jpeg"),
        });
      }

      setPages(tmp);
      setLoading(false);

      // initial order
      onOrderChange(tmp.map((p) => p.pageNumber).join(","));
    };

    loadPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]); // FIXED: removed onOrderChange dependency

  // Drag & Drop
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(pages);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    setPages(items);

    // send updated order
    onOrderChange(items.map((p) => p.pageNumber).join(","));
  }

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-6">Generating previews…</p>
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
                  {(drag) => (
                    <div
                      ref={drag.innerRef}
                      {...drag.draggableProps}
                      {...drag.dragHandleProps}
                      className="cursor-move p-2 rounded-lg bg-white shadow hover:shadow-lg"
                    >
                      <img
                        src={p.img}
                        className="w-32 rounded border"
                        alt={`Page ${p.pageNumber}`}
                      />
                      <p className="text-center font-semibold mt-1">
                        Page {p.pageNumber}
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
