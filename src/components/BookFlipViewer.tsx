"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function BookFlipViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [ready, setReady] = useState(false);
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);

  async function loadPdf() {
    if (!window.pdfjsLib || pdf) return;
    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const doc = await window.pdfjsLib.getDocument("/api/boek/pdf").promise;
    setPdf(doc);
    setPages(doc.numPages);
    setReady(true);
  }

  useEffect(() => {
    if (window.pdfjsLib) loadPdf();
  }, []);

  useEffect(() => {
    async function render() {
      if (!pdf || !canvasRef.current) return;
      const current = await pdf.getPage(page);
      const base = current.getViewport({ scale: 1 });
      const maxWidth = Math.min(window.innerWidth - 56, 760);
      const scale = Math.max(0.7, Math.min(1.8, maxWidth / base.width));
      const viewport = current.getViewport({ scale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      canvas.style.width = "100%";
      canvas.style.height = "auto";
      await current.render({ canvasContext: ctx, viewport }).promise;
    }
    render();
  }, [pdf, page]);

  function go(next: number) {
    if (next < 1 || next > pages || turning) return;
    setTurning(next > page ? "next" : "prev");
    window.setTimeout(() => {
      setPage(next);
      setTurning(null);
    }, 220);
  }

  const turnClass =
    turning === "next"
      ? "[transform:rotateY(-10deg)_scale(.985)]"
      : turning === "prev"
        ? "[transform:rotateY(10deg)_scale(.985)]"
        : "[transform:rotateY(0deg)]";

  return (
    <div className="bg-[#efe8da] rounded-3xl p-3 sm:p-6 shadow-card border border-black/5">
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        onLoad={loadPdf}
      />

      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary/60">Flipboek</p>
          <p className="text-sm text-primary font-semibold">
            {ready ? "Pagina " + page + " van " + pages : "Boek laden..."}
          </p>
        </div>
        <a href="/api/boek/pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
          <Maximize2 size={14} /> Groot openen
        </a>
      </div>

      <div className="relative [perspective:1800px]">
        <div className={"mx-auto max-w-[760px] bg-white shadow-2xl rounded-lg overflow-hidden origin-left transition-transform duration-300 " + turnClass}>
          <canvas ref={canvasRef} className="block w-full" />
        </div>

        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page <= 1 || !ready}
          aria-label="Vorige pagina"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-primary disabled:opacity-30"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page >= pages || !ready}
          aria-label="Volgende pagina"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-primary disabled:opacity-30"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button type="button" onClick={() => go(page - 1)} disabled={page <= 1 || !ready} className="btn-secondary text-sm disabled:opacity-40">
          <ChevronLeft size={15} /> Vorige
        </button>
        <button type="button" onClick={() => go(page + 1)} disabled={page >= pages || !ready} className="btn-primary text-sm disabled:opacity-40">
          Volgende <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
