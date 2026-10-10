"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function BookFlipViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [ready, setReady] = useState(false);
  const [turning, setTurning] = useState<"next" | "prev" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

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
      const maxWidth = fullscreen
        ? Math.max(320, window.innerWidth - 24)
        : Math.min(window.innerWidth - 56, 760);
      const maxHeight = fullscreen
        ? Math.max(420, window.innerHeight - 96)
        : window.innerHeight;
      const fitScale = fullscreen
        ? Math.min(maxWidth / base.width, maxHeight / base.height)
        : maxWidth / base.width;
      const scale = Math.max(0.7, Math.min(6, fitScale * zoom));
      const viewport = current.getViewport({ scale });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = viewport.width + "px";
      canvas.style.height = viewport.height + "px";

      await current.render({
        canvasContext: ctx,
        viewport,
        transform: [dpr, 0, 0, dpr, 0, 0],
      }).promise;

      if (fullscreen && scrollRef.current) {
        requestAnimationFrame(() => {
          const el = scrollRef.current;
          if (!el) return;
          el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
          el.scrollTop = Math.max(0, (el.scrollHeight - el.clientHeight) / 2);
        });
      }
    }
    render();
  }, [pdf, page, fullscreen, zoom]);

  function go(next: number) {
    if (next < 1 || next > pages || turning) return;
    setTurning(next > page ? "next" : "prev");
    window.setTimeout(() => {
      setPage(next);
      setTurning(null);
    }, 220);
  }

  useEffect(() => {
    document.body.style.overflow = fullscreen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [fullscreen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowLeft") go(page - 1);
      if (event.key === "ArrowRight") go(page + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const turnClass =
    turning === "next"
      ? "[transform:rotateY(-10deg)_scale(.985)]"
      : turning === "prev"
        ? "[transform:rotateY(10deg)_scale(.985)]"
        : "[transform:rotateY(0deg)]";

  return (
    <div className={fullscreen ? "fixed inset-0 z-[100] bg-black p-0 overflow-hidden" : "bg-[#efe8da] rounded-3xl p-3 sm:p-6 shadow-card border border-black/5"}>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
        onLoad={loadPdf}
      />

      <div className={fullscreen ? "absolute top-0 left-0 right-0 z-20 flex items-center justify-between gap-3 p-3 bg-black/55 backdrop-blur-sm" : "flex items-center justify-between gap-3 mb-4 px-1"}>
        <div>
          <p className={fullscreen ? "text-xs font-bold uppercase tracking-wide text-white/70" : "text-xs font-bold uppercase tracking-wide text-primary/60"}>Flipboek</p>
          <p className={fullscreen ? "text-sm text-white font-semibold" : "text-sm text-primary font-semibold"}>
            {ready ? "Pagina " + page + " van " + pages : "Boek laden..."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.25).toFixed(2)))}
            className={fullscreen ? "w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white" : "w-10 h-10 rounded-xl bg-white/90 shadow-sm flex items-center justify-center text-primary"}
            aria-label="Uitzoomen"
            title="Uitzoomen"
          >
            <ZoomOut size={17} />
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(5, +(z + 0.25).toFixed(2)))}
            className={fullscreen ? "w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white" : "w-10 h-10 rounded-xl bg-white/90 shadow-sm flex items-center justify-center text-primary"}
            aria-label="Inzoomen"
            title="Inzoomen"
          >
            <ZoomIn size={17} />
          </button>
          <button
            type="button"
            onClick={() => setFullscreen((value) => !value)}
            className={fullscreen ? "inline-flex items-center gap-2 rounded-xl bg-white text-primary px-3 py-2 text-sm font-semibold" : "btn-secondary text-sm"}
          >
            {fullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            {fullscreen ? "Terug" : "Groot openen"}
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={fullscreen ? "absolute inset-x-0 top-16 bottom-16 overflow-auto overscroll-contain touch-pan-x touch-pan-y" : "relative [perspective:1800px]"}
        style={fullscreen ? { WebkitOverflowScrolling: "touch" } : undefined}
      >
        <div className={fullscreen ? "min-w-max min-h-full p-3 flex items-start justify-start" : ""}>
          <div className={(fullscreen ? "w-max mx-auto max-w-none max-h-none " : "mx-auto max-w-[760px] ") + "bg-white shadow-2xl overflow-hidden origin-left transition-transform duration-300 " + turnClass}>
            <canvas ref={canvasRef} className="block" />
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(page - 1)}
          disabled={page <= 1 || !ready}
          aria-label="Vorige pagina"
          className={fullscreen ? "fixed z-30 left-3 sm:left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/45 border border-white/20 flex items-center justify-center text-white disabled:opacity-30" : "absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-primary disabled:opacity-30"}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          type="button"
          onClick={() => go(page + 1)}
          disabled={page >= pages || !ready}
          aria-label="Volgende pagina"
          className={fullscreen ? "fixed z-30 right-3 sm:right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/45 border border-white/20 flex items-center justify-center text-white disabled:opacity-30" : "absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 shadow-lg flex items-center justify-center text-primary disabled:opacity-30"}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className={fullscreen ? "fixed bottom-3 left-0 right-0 z-30 flex items-center justify-center gap-3 pointer-events-none" : "mt-4 flex items-center justify-center gap-3"}>
        <button type="button" onClick={() => go(page - 1)} disabled={page <= 1 || !ready} className={fullscreen ? "pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-white/95 text-primary px-4 py-2 text-sm font-semibold disabled:opacity-40" : "btn-secondary text-sm disabled:opacity-40"}>
          <ChevronLeft size={15} /> Vorige
        </button>
        <button type="button" onClick={() => go(page + 1)} disabled={page >= pages || !ready} className={fullscreen ? "pointer-events-auto inline-flex items-center gap-2 rounded-xl bg-white text-primary px-4 py-2 text-sm font-semibold disabled:opacity-40" : "btn-primary text-sm disabled:opacity-40"}>
          Volgende <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
