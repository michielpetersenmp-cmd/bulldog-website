"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Upload, X, Save, ArrowLeft, ImageIcon } from "lucide-react";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateSlug(text: string) {
  return text.toLowerCase()
    .replace(/[àáâãäå]/g, "a").replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i").replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u").replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

type VerhaalFormProps = {
  initial?: any;
  isEdit?: boolean;
};

export default function VerhaalForm({ initial, isEdit }: VerhaalFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    hond_naam: initial?.hond_naam ?? "",
    slug: initial?.slug ?? "",
    ras: initial?.ras ?? "",
    leeftijd: initial?.leeftijd ?? "",
    eigenaar_naam: initial?.eigenaar_naam ?? "",
    woonplaats: initial?.woonplaats ?? "",
    excerpt: initial?.excerpt ?? "",
    verhaal: initial?.verhaal ?? "",
    afbeelding_url: initial?.afbeelding_url ?? "",
    status: initial?.status ?? "aangemeld",
    published: initial?.published ?? false,
    featured: initial?.featured ?? false,
    donatie_doel: initial?.donatie_doel ?? "",
    donatie_opgehaald: initial?.donatie_opgehaald ?? 0,
  });

  function update(field: string, value: any) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "hond_naam" && !isEdit) next.slug = generateSlug(value);
      return next;
    });
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const ext = file.name.split(".").pop();
      const filename = `verhalen/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabaseClient.storage
        .from("post-images").upload(filename, file, { contentType: file.type });
      if (uploadError) throw uploadError;
      const { data } = supabaseClient.storage.from("post-images").getPublicUrl(filename);
      update("afbeelding_url", data.publicUrl);
    } catch (e: any) {
      setError(`Upload mislukt: ${e.message}`);
    }
    setUploading(false);
  }

  async function handleSave(published?: boolean) {
    setSaving(true);
    setError("");
    try {
      const payload = {
        hond_naam: form.hond_naam,
        slug: form.slug,
        ras: form.ras || null,
        leeftijd: form.leeftijd || null,
        eigenaar_naam: form.eigenaar_naam || null,
        woonplaats: form.woonplaats || null,
        excerpt: form.excerpt || null,
        verhaal: form.verhaal,
        afbeelding_url: form.afbeelding_url || null,
        status: form.status,
        published: published !== undefined ? published : form.published,
        featured: form.featured,
        donatie_doel: form.donatie_doel ? Number(form.donatie_doel) : null,
        donatie_opgehaald: Number(form.donatie_opgehaald) || 0,
      };

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      if (isEdit) {
        const { error } = await supabase.from("verhalen").update(payload).eq("id", initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("verhalen").insert([payload]);
        if (error) throw error;
      }

      router.push("/admin/verhalen");
    } catch (e: any) {
      setError(e.message);
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-primary text-white px-4 py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/admin/verhalen")} className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors">
              <ArrowLeft size={16} /> Terug
            </button>
            <span className="text-white/30">|</span>
            <span className="font-semibold text-white text-sm">{isEdit ? "Verhaal bewerken" : "Nieuw verhaal"}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleSave(false)} disabled={saving} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50">
              Concept opslaan
            </button>
            <button onClick={() => handleSave(true)} disabled={saving || !form.hond_naam || !form.verhaal} className="btn-primary text-sm disabled:opacity-50">
              <Save size={14} /> {saving ? "Opslaan..." : isEdit ? "Wijzigingen opslaan" : "Publiceren"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Hoofdinhoud */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <input type="text" value={form.hond_naam} onChange={(e) => update("hond_naam", e.target.value)}
                placeholder="Naam van de hond..." className="w-full text-2xl font-display font-bold text-primary placeholder-gray-300 border-none outline-none" />
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-gray-400">Slug:</span>
                <input type="text" value={form.slug} onChange={(e) => update("slug", e.target.value)}
                  className="text-xs text-gray-500 border-b border-dashed border-gray-300 outline-none flex-1 bg-transparent" />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Korte samenvatting</label>
              <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={2}
                placeholder="Korte beschrijving voor de overzichtspagina..."
                className="w-full text-sm text-gray-600 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Verhaal <span className="text-gray-400 font-normal">(Markdown ondersteund)</span></label>
              <textarea value={form.verhaal} onChange={(e) => update("verhaal", e.target.value)} rows={16}
                placeholder={`# Naam heeft onze hulp nodig\n\nVertel het verhaal van de hond...\n\n## De situatie\n\n## Wat wij doen`}
                className="w-full text-sm text-gray-700 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none font-mono leading-relaxed" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Hond info */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Informatie hond</h3>
              <div className="space-y-3">
                {[
                  { field: "ras", label: "Ras", placeholder: "Engelse Bulldog" },
                  { field: "leeftijd", label: "Leeftijd", placeholder: "4 jaar" },
                  { field: "eigenaar_naam", label: "Eigenaar", placeholder: "Familie Jansen" },
                  { field: "woonplaats", label: "Woonplaats", placeholder: "Utrecht" },
                ].map((item) => (
                  <div key={item.field}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{item.label}</label>
                    <input type="text" value={(form as any)[item.field]} onChange={(e) => update(item.field, e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Status & instellingen */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Status & instellingen</h3>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-600 mb-2">Status</label>
                <select value={form.status} onChange={(e) => update("status", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                  <option value="aangemeld">🟡 Aangemeld</option>
                  <option value="in_behandeling">🔵 In behandeling</option>
                  <option value="geholpen">🟢 Geholpen!</option>
                  <option value="gesloten">⚪ Gesloten</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={(e) => update("published", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-sm font-medium text-gray-700">Gepubliceerd</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} className="w-4 h-4 rounded accent-primary" />
                  <span className="text-sm font-medium text-gray-700">⭐ Uitgelicht</span>
                </label>
              </div>
            </div>

            {/* Donatie doel */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Donatie (optioneel)</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Doel bedrag (€)</label>
                  <input type="number" value={form.donatie_doel} onChange={(e) => update("donatie_doel", e.target.value)}
                    placeholder="500" className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Opgehaald (€)</label>
                  <input type="number" value={form.donatie_opgehaald} onChange={(e) => update("donatie_opgehaald", e.target.value)}
                    placeholder="0" className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </div>

            {/* Afbeelding */}
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">Foto van de hond</h3>
              {form.afbeelding_url ? (
                <div className="relative">
                  <div className="relative h-40 rounded-xl overflow-hidden">
                    <Image src={form.afbeelding_url} alt="Preview" fill className="object-cover" />
                  </div>
                  <button onClick={() => update("afbeelding_url", "")} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow">
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-primary/40 transition-colors">
                  <ImageIcon size={28} className="text-gray-300 mx-auto mb-2" />
                  <label className="btn-secondary text-xs cursor-pointer inline-flex items-center gap-2">
                    <Upload size={12} />
                    {uploading ? "Uploaden..." : "Foto uploaden"}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])} disabled={uploading} />
                  </label>
                </div>
              )}
              <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">Of plak een URL</label>
                <input type="url" value={form.afbeelding_url} onChange={(e) => update("afbeelding_url", e.target.value)}
                  placeholder="https://..." className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
