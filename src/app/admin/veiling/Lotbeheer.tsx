"use client";

import { useState, type FormEvent } from "react";

type Photo = { path: string; url: string };
type Lot = {
  id: number;
  lot_number: number;
  title: string;
  description: string | null;
  sponsor: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
  sponsor_instagram: string | null;
  start_bid: number;
  current_bid: number;
  bid_count: number;
  active: boolean;
  image_url: string | null;
  image_urls: string[];
  photos: Photo[];
};

type Form = Omit<Lot, "id" | "current_bid" | "bid_count" | "photos"> & { id?: number; photos: Photo[] };
const blank = (lots: Lot[]): Form => ({
  lot_number: Math.max(0, ...lots.map(lot => lot.lot_number)) + 1,
  title: "", description: "", sponsor: "", sponsor_website: "", sponsor_facebook: "", sponsor_instagram: "",
  start_bid: 1, active: true, image_url: null, image_urls: [], photos: [],
});

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function Lotbeheer({ initialLots }: { initialLots: Lot[] }) {
  const [lots, setLots] = useState(initialLots);
  const [form, setForm] = useState<Form>(() => blank(initialLots));
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<Lot | Form | null>(null);

  function edit(lot: Lot) {
    setForm({
      id: lot.id, lot_number: lot.lot_number, title: lot.title, description: lot.description || "",
      sponsor: lot.sponsor || "", sponsor_website: lot.sponsor_website || "",
      sponsor_facebook: lot.sponsor_facebook || "", sponsor_instagram: lot.sponsor_instagram || "",
      start_bid: lot.start_bid, active: lot.active, image_url: lot.image_url,
      image_urls: lot.image_urls || [], photos: lot.photos || [],
    });
    setMessage("");
    document.getElementById("kavel-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setBusy(true);
    setMessage("");
    try {
      const added: Photo[] = [];
      for (const file of Array.from(files)) {
        const data = new FormData();
        data.set("foto", file);
        const response = await fetch("/api/admin/veiling-foto", { method: "POST", body: data });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Foto uploaden is niet gelukt.");
        added.push({ path: result.image_url, url: result.image_preview_url });
      }
      setForm(current => {
        const photos = [...current.photos, ...added];
        return { ...current, photos, image_urls: photos.map(photo => photo.path), image_url: photos[0]?.path || null };
      });
      setMessage(added.length + " foto('s) toegevoegd. Kies eventueel een andere hoofdfoto.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Foto uploaden is niet gelukt.");
    } finally {
      setBusy(false);
    }
  }

  function chooseMain(path: string) {
    setForm(current => {
      const photos = [...current.photos].sort((a, b) => a.path === path ? -1 : b.path === path ? 1 : 0);
      return { ...current, photos, image_url: path, image_urls: photos.map(photo => photo.path) };
    });
  }

  function removePhoto(path: string) {
    setForm(current => {
      const photos = current.photos.filter(photo => photo.path !== path);
      return { ...current, photos, image_url: photos[0]?.path || null, image_urls: photos.map(photo => photo.path) };
    });
    setMessage("Foto is van deze kavel verwijderd. Het bestand blijft in de privéopslag bewaard.");
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/veiling-test/lots", {
        method: form.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form, image_url: form.photos[0]?.path || null,
          image_urls: form.photos.map(photo => photo.path),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Kavel opslaan is niet gelukt.");
      setMessage("Kavel opgeslagen. Het beheer wordt vernieuwd.");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Kavel opslaan is niet gelukt.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(lot: Lot) {
    const body = {
      id: lot.id, lot_number: lot.lot_number, title: lot.title, description: lot.description,
      sponsor: lot.sponsor, sponsor_website: lot.sponsor_website, sponsor_facebook: lot.sponsor_facebook,
      sponsor_instagram: lot.sponsor_instagram, start_bid: lot.start_bid, active: !lot.active,
      image_url: lot.image_url, image_urls: lot.image_urls || [],
    };
    const response = await fetch("/api/admin/veiling-test/lots", {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) { setMessage(result.error || "Status aanpassen is niet gelukt."); return; }
    setLots(current => current.map(item => item.id === lot.id ? { ...item, active: !item.active } : item));
  }

  return (
    <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(340px,.8fr)]">
      <section>
        <div className="flex items-end justify-between gap-3">
          <div><h2 className="text-2xl font-extrabold text-primary">Kavels beheren</h2><p className="mt-1 text-sm text-gray-600">Alle wijzigingen blijven in de testveiling.</p></div>
          <button type="button" onClick={() => { setForm(blank(lots)); setMessage(""); }} className="rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">+ Nieuwe kavel</button>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {lots.map(lot => (
            <article key={lot.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              {lot.photos?.[0]?.url ? <img src={lot.photos[0].url} alt="" className="h-32 w-full object-cover" /> : <div className="flex h-32 items-center justify-center bg-amber-50 text-sm font-bold text-amber-800">Foto ontbreekt</div>}
              <div className="p-4">
                <div className="flex items-center justify-between gap-2"><span className="text-xs font-extrabold uppercase tracking-wide text-amber-700">Kavel {String(lot.lot_number).padStart(3, "0")}</span><span className={lot.active ? "rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800" : "rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600"}>{lot.active ? "Zichtbaar" : "Verborgen"}</span></div>
                <h3 className="mt-2 line-clamp-2 min-h-12 font-extrabold text-primary">{lot.title}</h3>
                <p className="mt-1 truncate text-xs text-slate-500">{lot.sponsor || "Geen sponsor ingevuld"}</p>
                <p className="mt-3 text-lg font-extrabold text-primary">{euro(lot.current_bid)}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={() => edit(lot)} className="rounded-lg border px-3 py-2 text-xs font-bold text-primary">Aanpassen</button>
                  <button type="button" onClick={() => toggleActive(lot)} className="rounded-lg border px-3 py-2 text-xs font-bold text-primary">{lot.active ? "Verbergen" : "Activeren"}</button>
                  <button type="button" onClick={() => setPreview(lot)} className="rounded-lg border px-3 py-2 text-xs font-bold text-primary">Bezoekersbeeld</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="kavel-form" className="self-start rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-extrabold text-primary">{form.id ? "Kavel aanpassen" : "Nieuwe kavel"}</h2>
        <p className="mt-1 text-sm text-slate-500">Foto’s blijven privé. Alleen ingelogde beheerders kunnen dit scherm bekijken.</p>
        <form onSubmit={save} className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-bold text-slate-700">Kavelnummer<input required type="number" min="1" value={form.lot_number} onChange={e => setForm({ ...form, lot_number: Number(e.target.value) })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
            <label className="text-sm font-bold text-slate-700">Startbod (€)<input required type="number" min="0" step="1" value={form.start_bid} onChange={e => setForm({ ...form, start_bid: Number(e.target.value) })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          </div>
          <label className="block text-sm font-bold text-slate-700">Producttitel<input required maxLength={180} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          <label className="block text-sm font-bold text-slate-700">Uitgebreide beschrijving<textarea rows={6} maxLength={12000} value={form.description || ""} onChange={e => setForm({ ...form, description: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          <label className="block text-sm font-bold text-slate-700">Naam sponsor<input maxLength={180} value={form.sponsor || ""} onChange={e => setForm({ ...form, sponsor: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          <label className="block text-sm font-bold text-slate-700">Website sponsor<input type="text" placeholder="https://..." value={form.sponsor_website || ""} onChange={e => setForm({ ...form, sponsor_website: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          <label className="block text-sm font-bold text-slate-700">Facebookpagina<input type="url" placeholder="https://facebook.com/..." value={form.sponsor_facebook || ""} onChange={e => setForm({ ...form, sponsor_facebook: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
          <label className="block text-sm font-bold text-slate-700">Instagram<input type="url" placeholder="https://instagram.com/..." value={form.sponsor_instagram || ""} onChange={e => setForm({ ...form, sponsor_instagram: e.target.value })} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>

          <div>
            <div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-700">Foto’s</p><span className="text-xs text-slate-500">{form.photos.length} toegevoegd</span></div>
            <label className="mt-2 flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center text-sm font-bold text-primary hover:bg-amber-50">
              {busy ? "Bezig…" : "＋ Kies foto’s vanaf telefoon of computer"}
              <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" disabled={busy} onChange={e => { void upload(e.target.files); e.currentTarget.value = ""; }} />
            </label>
            <p className="mt-1 text-xs text-slate-500">JPG, PNG of WebP · maximaal 5 MB per foto. De eerste foto is de hoofdfoto.</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {form.photos.map((photo, index) => (
                <div key={photo.path} className="relative overflow-hidden rounded-xl border">
                  <img src={photo.url} alt="" className="h-28 w-full object-cover" />
                  <div className="flex items-center justify-between gap-1 p-2">
                    <label className="flex items-center gap-1 text-xs font-bold"><input type="radio" checked={index === 0} onChange={() => chooseMain(photo.path)} /> Hoofdfoto</label>
                    <button type="button" onClick={() => removePhoto(photo.path)} className="text-xs font-bold text-red-700">Uit kavel halen</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700"><input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /> Zichtbaar in bezoekersvoorbeeld</label>
          {message && <p role="status" className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">{message}</p>}
          <div className="flex gap-2">
            <button disabled={busy} className="flex-1 rounded-xl bg-primary px-4 py-3 font-extrabold text-white disabled:opacity-50">{busy ? "Bezig…" : "Kavel opslaan"}</button>
            <button type="button" onClick={() => setPreview(form)} className="rounded-xl border px-4 py-3 font-bold text-primary">Voorbeeld</button>
          </div>
        </form>
      </section>

      {preview && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3" onClick={() => setPreview(null)}>
        <div role="dialog" aria-modal="true" aria-label="Kavel bezoekersvoorbeeld" onClick={event => event.stopPropagation()} className="my-4 max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
          <button type="button" onClick={() => setPreview(null)} className="sticky top-0 float-right z-10 m-3 rounded-full bg-white px-3 py-1 text-2xl shadow" aria-label="Sluiten">×</button>
          <div className="grid md:grid-cols-2">
            <div className="bg-slate-100">{preview.photos?.[0]?.url ? <img src={preview.photos[0].url} alt={preview.title} className="h-72 w-full object-cover md:h-full" /> : <div className="flex h-72 items-center justify-center text-slate-500">Foto volgt</div>}
              <div className="grid grid-cols-4 gap-1 p-2">{preview.photos?.slice(1).map(photo => <img key={photo.path} src={photo.url} alt="" className="h-16 w-full rounded object-cover" />)}</div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Kavel {String(preview.lot_number).padStart(3, "0")}</p>
              <h2 className="mt-2 text-3xl font-extrabold text-primary">{preview.title || "Producttitel"}</h2>
              {preview.sponsor && <p className="mt-3 text-sm text-slate-600">Mogelijk gemaakt door <strong>{preview.sponsor}</strong></p>}
              <div className="mt-6 whitespace-pre-wrap leading-relaxed text-slate-700">{preview.description || "De uitgebreide productomschrijving komt hier te staan."}</div>
              <div className="mt-6 rounded-2xl bg-amber-50 p-4"><p className="text-sm text-slate-600">Hoogste bod</p><p className="text-3xl font-extrabold text-primary">{"current_bid" in preview ? euro(preview.current_bid) : euro(preview.start_bid)}</p><button type="button" className="mt-3 w-full rounded-xl bg-amber-400 px-4 py-3 font-extrabold text-primary">Bied mee</button></div>
              {(preview.sponsor_website || preview.sponsor_facebook || preview.sponsor_instagram) && <div className="mt-5 border-t pt-4"><p className="font-bold text-primary">Meer over de sponsor</p><div className="mt-2 flex flex-wrap gap-3 text-sm font-semibold text-blue-800">{preview.sponsor_website && <a href={preview.sponsor_website} target="_blank" rel="noreferrer">Website</a>}{preview.sponsor_facebook && <a href={preview.sponsor_facebook} target="_blank" rel="noreferrer">Facebook</a>}{preview.sponsor_instagram && <a href={preview.sponsor_instagram} target="_blank" rel="noreferrer">Instagram</a>}</div></div>}
              <p className="mt-5 text-xs text-slate-500">Bezoekersvoorbeeld · testmodus · er wordt geen bod opgeslagen.</p>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
