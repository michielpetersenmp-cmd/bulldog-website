"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Save, Trash2, Upload, ArrowLeft, Eye, ChevronUp, ChevronDown } from "lucide-react";

type Donateur = {
  slug: string;
  naam: string;
  korteOmschrijving: string;
  verhaal: string[];
  logo?: string;
  afbeelding?: string;
  website?: string;
  facebook?: string;
  plaats?: string;
  bijdrage?: string;
};

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function AdminDonateursPage() {
  const [donateurs, setDonateurs] = useState<Donateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/donateurs", { cache: "no-store" });
    const data = await res.json();
    setDonateurs(data.donateurs || []);
    setLoading(false);
  }

  function update(index: number, field: keyof Donateur, value: any) {
    setDonateurs((prev) =>
      prev.map((d, i) => {
        if (i !== index) return d;
        const next = { ...d, [field]: value };
        if (field === "naam" && !d.slug) next.slug = makeSlug(value);
        return next;
      })
    );
  }

  function addDonateur() {
    setDonateurs((prev) => [
      ...prev,
      {
        slug: "",
        naam: "",
        korteOmschrijving: "",
        verhaal: [""],
        bijdrage: "",
        plaats: "",
        website: "",
        facebook: "",
      },
    ]);
  }

  function removeDonateur(index: number) {
    if (!confirm("Deze bedrijfsvriend verwijderen uit het overzicht?")) return;
    setDonateurs((prev) => prev.filter((_, i) => i !== index));
  }

  function moveDonateur(index: number, direction: "up" | "down") {
    setDonateurs((prev) => {
      const next = [...prev];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setMessage("Volgorde aangepast. Klik op ‘Alles opslaan’ om deze volgorde op de website te bewaren.");
  }

  function addParagraph(index: number) {
    const current = donateurs[index].verhaal || [];
    update(index, "verhaal", [...current, ""]);
  }

  function updateParagraph(index: number, pIndex: number, value: string) {
    const current = [...(donateurs[index].verhaal || [])];
    current[pIndex] = value;
    update(index, "verhaal", current);
  }

  function removeParagraph(index: number, pIndex: number) {
    const current = (donateurs[index].verhaal || []).filter((_, i) => i !== pIndex);
    update(index, "verhaal", current.length ? current : [""]);
  }

  async function uploadImage(index: number, kind: "logo" | "afbeelding", file: File) {
    setUploading(`${index}-${kind}`);
    setMessage("");
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload mislukt");

      const next = donateurs.map((d, i) =>
        i === index ? { ...d, [kind]: data.url } : d
      );
      setDonateurs(next);

      const normalized = next.map((d) => ({
        ...d,
        slug: d.slug || makeSlug(d.naam),
        verhaal: (d.verhaal || []).map((v) => v.trim()).filter(Boolean),
      }));

      const saveRes = await fetch("/api/admin/donateurs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donateurs: normalized }),
      });
      const saved = await saveRes.json();
      if (!saveRes.ok) throw new Error(saved.error || "Afbeelding opslaan mislukt");

      setDonateurs(saved.donateurs);
      setMessage("Afbeelding bijgewerkt en direct opgeslagen.");
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setUploading("");
    }
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const normalized = donateurs.map((d) => ({
        ...d,
        slug: d.slug || makeSlug(d.naam),
        verhaal: (d.verhaal || []).map((v) => v.trim()).filter(Boolean),
      }));

      const res = await fetch("/api/admin/donateurs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ donateurs: normalized }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Opslaan mislukt");
      setDonateurs(data.donateurs);
      setMessage("Opgeslagen. De website wordt binnen ongeveer een minuut bijgewerkt.");
    } catch (e: any) {
      setMessage(e.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-primary text-white px-4 py-4 shadow-lg sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-white/70 hover:text-white flex items-center gap-1 text-sm">
              <ArrowLeft size={15} /> Dashboard
            </Link>
            <span className="text-white/30">|</span>
            <span className="font-semibold">Donateurs & bedrijfsvrienden</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/donateurs" target="_blank" className="bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg text-sm inline-flex items-center gap-2">
              <Eye size={14} /> Bekijk
            </Link>
            <button onClick={save} disabled={saving} className="btn-primary text-sm disabled:opacity-50">
              <Save size={14} /> {saving ? "Opslaan..." : "Alles opslaan"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">Bedrijfsvrienden beheren</h1>
            <p className="text-sm text-gray-500">Teksten, logo, foto en links kunt u hier zelf aanpassen.</p>
          </div>
          <button onClick={addDonateur} className="btn-secondary text-sm">
            <Plus size={14} /> Bedrijfsvriend toevoegen
          </button>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-400">Laden...</div>
        ) : (
          <div className="space-y-6">
            {donateurs.map((d, index) => (
              <section key={`${d.slug}-${index}`} className="bg-white rounded-3xl shadow-card overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <h2 className="font-display font-bold text-primary text-xl">{d.naam || "Nieuwe bedrijfsvriend"}</h2>
                    <p className="text-xs text-gray-400">/{d.slug || "slug"}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveDonateur(index, "up")}
                      disabled={index === 0}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed"
                      title="Omhoog"
                      aria-label="Omhoog"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      onClick={() => moveDonateur(index, "down")}
                      disabled={index === donateurs.length - 1}
                      className="p-2 text-gray-500 hover:text-primary hover:bg-gray-50 rounded-lg disabled:opacity-25 disabled:cursor-not-allowed"
                      title="Omlaag"
                      aria-label="Omlaag"
                    >
                      <ChevronDown size={18} />
                    </button>
                    <button onClick={() => removeDonateur(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg" title="Verwijderen">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>

                <div className="p-6 grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Naam" value={d.naam} onChange={(v) => update(index, "naam", v)} />
                      <Field label="Slug" value={d.slug} onChange={(v) => update(index, "slug", makeSlug(v))} />
                      <Field label="Plaats" value={d.plaats || ""} onChange={(v) => update(index, "plaats", v)} />
                      <Field label="Website" value={d.website || ""} onChange={(v) => update(index, "website", v)} placeholder="https://..." />
                      <Field label="Facebook" value={d.facebook || ""} onChange={(v) => update(index, "facebook", v)} placeholder="https://..." />
                    </div>

                    <TextArea
                      label="Korte omschrijving"
                      value={d.korteOmschrijving}
                      onChange={(v) => update(index, "korteOmschrijving", v)}
                      rows={3}
                    />

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700">Verhaal over het bedrijf</label>
                        <button onClick={() => addParagraph(index)} className="text-xs font-semibold text-primary">
                          + Alinea toevoegen
                        </button>
                      </div>
                      <div className="space-y-3">
                        {(d.verhaal || [""]).map((p, pIndex) => (
                          <div key={pIndex} className="flex gap-2">
                            <textarea
                              value={p}
                              onChange={(e) => updateParagraph(index, pIndex, e.target.value)}
                              rows={4}
                              className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-y"
                              placeholder="Vertel iets over het bedrijf, de werkzaamheden en de betrokkenheid..."
                            />
                            <button onClick={() => removeParagraph(index, pIndex)} className="self-start p-2 text-gray-400 hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <TextArea
                      label="Hun steun aan de stichting"
                      value={d.bijdrage || ""}
                      onChange={(v) => update(index, "bijdrage", v)}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-5">
                    <ImageUpload
                      label="Logo"
                      value={d.logo || ""}
                      loading={uploading === `${index}-logo`}
                      onUpload={(file) => uploadImage(index, "logo", file)}
                      onUrl={(v) => update(index, "logo", v)}
                      onRemove={() => update(index, "logo", "")}
                      contain
                    />
                    <ImageUpload
                      label="Bedrijfs- of projectfoto"
                      value={d.afbeelding || ""}
                      loading={uploading === `${index}-afbeelding`}
                      onUpload={(file) => uploadImage(index, "afbeelding", file)}
                      onUrl={(v) => update(index, "afbeelding", v)}
                      onRemove={() => update(index, "afbeelding", "")}
                    />
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows }: { label: string; value: string; onChange: (v: string) => void; rows: number }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-y"
      />
    </div>
  );
}

function ImageUpload({
  label,
  value,
  loading,
  onUpload,
  onUrl,
  onRemove,
  contain = false,
}: {
  label: string;
  value: string;
  loading: boolean;
  onUpload: (file: File) => void;
  onUrl: (value: string) => void;
  onRemove: () => void;
  contain?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
      {value ? (
        <div className="space-y-2">
          <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <Image src={value} alt={label} fill className={contain ? "object-contain p-4" : "object-cover"} />
          </div>
          <button onClick={onRemove} className="text-xs text-red-500 font-semibold">Afbeelding verwijderen</button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-200 rounded-2xl h-36 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40">
          <Upload size={22} className="text-gray-300 mb-2" />
          <span className="text-xs font-semibold text-gray-500">{loading ? "Uploaden..." : "Afbeelding kiezen"}</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            disabled={loading}
            onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
          />
        </label>
      )}
      <input
        value={value}
        onChange={(e) => onUrl(e.target.value)}
        placeholder="Of plak een afbeeldings-URL"
        className="mt-2 w-full text-xs border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
