"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { BookOpen, Upload, ExternalLink, CheckCircle2, Save } from "lucide-react";
import AdminNav from "@/components/AdminNav";
import { supabase } from "@/lib/supabase";

type BoekConfig = {
  titel: string;
  subtitel: string;
  auteur: string;
  jaar: string;
  cover: string;
  intro: string[];
  doelgroep: string;
  homepageTekst: string;
};

export default function AdminBoekPage() {
  const searchParams = useSearchParams();
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [boek, setBoek] = useState<BoekConfig | null>(null);

  async function checkStatus() {
    const res = await fetch("/api/admin/boek/status", { cache: "no-store" });
    const data = await res.json();
    setPublished(Boolean(data.published));
  }

  async function loadConfig() {
    const res = await fetch("/api/admin/boek/config", { cache: "no-store" });
    const data = await res.json();
    setBoek(data.boek);
  }

  useEffect(() => {
    checkStatus();
    loadConfig();
    if (searchParams.get("saved") === "1") {
      setMessage("Boekpagina en homepage zijn bijgewerkt.");
    } else if (searchParams.get("save_error") === "1") {
      setMessage(searchParams.get("message") || "Opslaan mislukt.");
    }
  }, [searchParams]);

  async function upload(file: File) {
    setUploading(true);
    setMessage("");
    try {
      if (file.type && file.type !== "application/pdf") throw new Error("Kies een PDF-bestand.");
      if (file.size > 20 * 1024 * 1024) throw new Error("De PDF mag maximaal 20 MB zijn.");

      const linkRes = await fetch("/api/admin/boek/upload-link", { method: "POST" });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error || "Uploadlink kon niet worden gemaakt.");

      const { error } = await supabase.storage
        .from("post-images")
        .uploadToSignedUrl(linkData.path, linkData.token, file, {
          contentType: "application/pdf",
          upsert: true,
        });
      if (error) throw error;

      await checkStatus();
      setPublished(true);
      setMessage("Het boek staat nu op de website.");
    } catch (e: any) {
      setMessage(e?.message || "Upload mislukt.");
    } finally {
      setUploading(false);
    }
  }

  async function uploadCover(file: File) {
    setCoverUploading(true);
    setMessage("");
    try {
      if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
        throw new Error("Kies een JPG, PNG of WebP-afbeelding.");
      }
      if (file.size > 8 * 1024 * 1024) throw new Error("De cover mag maximaal 8 MB zijn.");

      const linkRes = await fetch("/api/admin/boek/cover-upload-link", { method: "POST" });
      const linkData = await linkRes.json();
      if (!linkRes.ok) throw new Error(linkData.error || "Uploadlink kon niet worden gemaakt.");

      const { error } = await supabase.storage
        .from("post-images")
        .uploadToSignedUrl(linkData.path, linkData.token, file, {
          contentType: file.type || "image/jpeg",
          upsert: true,
        });
      if (error) throw error;

      const { data } = supabase.storage.from("post-images").getPublicUrl(linkData.path);
      const freshUrl = `${data.publicUrl}?v=${Date.now()}`;
      setBoek((prev) => prev ? { ...prev, cover: freshUrl } : prev);
      setMessage("Nieuwe cover geüpload. Klik nog op ‘Alles opslaan’.");
    } catch (e: any) {
      setMessage(e?.message || "Cover uploaden mislukt.");
    } finally {
      setCoverUploading(false);
    }
  }

  async function save() {
    if (!boek) return;
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/boek/config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boek }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Opslaan mislukt.");
      setBoek(data.boek);
      setMessage("Boekpagina en homepage zijn bijgewerkt.");
    } catch (e: any) {
      setMessage(e?.message || "Opslaan mislukt.");
    } finally {
      setSaving(false);
    }
  }

  function setField<K extends keyof BoekConfig>(key: K, value: BoekConfig[K]) {
    setBoek((prev) => prev ? { ...prev, [key]: value } : prev);
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-primary mb-2">Boek beheren</h1>
        <p className="text-sm text-gray-500 mb-7">
          Hier beheer je de PDF, omslag en teksten van <strong>Leven met een Bulldog</strong>.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="bg-white rounded-3xl shadow-card p-6 md:p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-primary shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="font-display font-bold text-primary text-xl">PDF van het boek</h2>
                <div className="mt-2 text-sm font-semibold">
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
              <span className="font-semibold text-primary">{uploading ? "PDF uploaden..." : published ? "Nieuwe PDF kiezen" : "PDF kiezen"}</span>
              <span className="text-xs text-gray-400 mt-1">PDF, maximaal 20 MB</span>
              <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={uploading} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </label>
          </section>

          <section className="bg-white rounded-3xl shadow-card p-6 md:p-8">
            <h2 className="font-display font-bold text-primary text-xl mb-4">Omslag</h2>
            {boek?.cover && (
              <div className="relative w-40 aspect-[2/3] rounded-2xl overflow-hidden shadow-card mb-4 bg-gray-50">
                <Image src={boek.cover} alt="Boekomslag" fill className="object-cover" unoptimized />
              </div>
            )}
            <label className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors">
              <Upload size={24} className="text-gray-300 mb-2" />
              <span className="font-semibold text-primary">{coverUploading ? "Cover uploaden..." : "Andere cover kiezen"}</span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG of WebP</span>
              <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={coverUploading} onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])} />
            </label>
          </section>
        </div>

        {boek && (
          <form action="/api/admin/boek/config-form" method="post" className="bg-white rounded-3xl shadow-card p-6 md:p-8 mt-6">
            <h2 className="font-display font-bold text-primary text-xl mb-6">Teksten van de boekpagina</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <Field name="titel" label="Titel" value={boek.titel} onChange={(v) => setField("titel", v)} />
              <Field name="auteur" label="Auteur" value={boek.auteur} onChange={(v) => setField("auteur", v)} />
              <Field name="jaar" label="Jaar" value={boek.jaar} onChange={(v) => setField("jaar", v)} />
              <div className="md:col-span-2"><Area name="subtitel" label="Subtitel" value={boek.subtitel} onChange={(v) => setField("subtitel", v)} rows={3} /></div>
              <div className="md:col-span-2"><Area name="intro1" label="Intro tekst 1" value={boek.intro[0] || ""} onChange={(v) => setField("intro", [v, boek.intro[1] || "", boek.intro[2] || ""])} rows={4} /></div>
              <div className="md:col-span-2"><Area name="intro2" label="Intro tekst 2" value={boek.intro[1] || ""} onChange={(v) => setField("intro", [boek.intro[0] || "", v, boek.intro[2] || ""])} rows={4} /></div>
              <div className="md:col-span-2"><Area name="intro3" label="Intro tekst 3" value={boek.intro[2] || ""} onChange={(v) => setField("intro", [boek.intro[0] || "", boek.intro[1] || "", v])} rows={4} /></div>
              <div className="md:col-span-2"><Area name="doelgroep" label="Voor wie is het boek?" value={boek.doelgroep} onChange={(v) => setField("doelgroep", v)} rows={5} /></div>
              <div className="md:col-span-2"><Area name="homepageTekst" label="Korte tekst op homepage" value={boek.homepageTekst} onChange={(v) => setField("homepageTekst", v)} rows={4} /></div>
            </div>

            <input type="hidden" name="cover" value={boek.cover} />
            <button type="submit" className="btn-primary mt-7 w-full justify-center">
              <Save size={16} /> Alles opslaan
            </button>
          </form>
        )}

        {message && <div className="mt-5 p-4 rounded-xl bg-white border border-gray-100 shadow-card text-sm text-gray-700">{message}</div>}

        <a href="/boek" target="_blank" rel="noopener noreferrer" className="btn-secondary mt-6 w-full justify-center">
          Bekijk boekpagina <ExternalLink size={15} />
        </a>
      </main>
    </div>
  );
}

function Field({ name, label, value, onChange }: { name: string; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-700 mb-2">{label}</span>
      <input name={name} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary" />
    </label>
  );
}

function Area({ name, label, value, onChange, rows = 4 }: { name: string; label: string; value: string; onChange: (value: string) => void; rows?: number }) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-gray-700 mb-2">{label}</span>
      <textarea name={name} value={value} onChange={(e) => onChange(e.target.value)} rows={rows} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-primary resize-y" />
    </label>
  );
}
