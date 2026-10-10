"use client";

import { useEffect, useState } from "react";
import { BookOpen, Upload, ExternalLink, CheckCircle2 } from "lucide-react";
import AdminNav from "@/components/AdminNav";

export default function AdminBoekPage() {
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function checkStatus() {
    const res = await fetch("/api/admin/boek/status", { cache: "no-store" });
    const data = await res.json();
    setPublished(Boolean(data.published));
  }

  useEffect(() => { checkStatus(); }, []);

  async function upload(file: File) {
    setUploading(true);
    setMessage("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/boek/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload mislukt.");
      setPublished(true);
      setMessage("Het boek staat nu op de website.");
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-primary mb-2">Boek beheren</h1>
        <p className="text-sm text-gray-500 mb-7">
          Hier beheer je de PDF van <strong>Leven met een Bulldog</strong>. Een nieuwe upload vervangt automatisch de vorige versie.
        </p>

        <section className="bg-white rounded-3xl shadow-card p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-primary shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="font-display font-bold text-primary text-xl">Leven met een Bulldog</h2>
              <p className="text-sm text-gray-500 mt-1">
                Een eerlijke en persoonlijke gids over karakter, verzorging, gezondheid en het leven samen.
              </p>
              <div className="mt-3 text-sm font-semibold">
                {published ? (
                  <span className="inline-flex items-center gap-2 text-green-700"><CheckCircle2 size={16} /> Gepubliceerd</span>
                ) : (
                  <span className="text-amber-700">Nog geen PDF gepubliceerd</span>
                )}
              </div>
            </div>
          </div>

          <label className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
            <Upload size={28} className="text-gray-300 mb-3" />
            <span className="font-semibold text-primary">
              {uploading ? "PDF uploaden..." : published ? "Nieuwe versie kiezen" : "PDF kiezen"}
            </span>
            <span className="text-xs text-gray-400 mt-1">PDF, maximaal 20 MB</span>
            <input
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
            />
          </label>

          {message && <div className="mt-5 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700">{message}</div>}

          {published && (
            <a href="/boek" target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 w-full justify-center">
              Bekijk boek op website <ExternalLink size={15} />
            </a>
          )}
        </section>
      </main>
    </div>
  );
}
