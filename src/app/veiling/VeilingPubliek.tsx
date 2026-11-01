"use client";

import { FormEvent, useMemo, useState } from "react";

type Photo = { path: string; url: string };
type Lot = {
  id: number;
  lot_number: number;
  title: string;
  sponsor: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
  sponsor_instagram: string | null;
  description: string | null;
  start_bid: number;
  current_bid: number;
  bid_count: number;
  active: boolean;
  closes_at: string;
  photos: Photo[];
};

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function VeilingPubliek({ lots }: { lots: Lot[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lot | null>(null);
  const [heroPhoto, setHeroPhoto] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const visibleLots = useMemo(
    () => lots.filter(lot => lot.active && [lot.title, lot.sponsor || "", lot.description || ""].join(" ").toLowerCase().includes(search.toLowerCase())),
    [lots, search]
  );

  function openLot(lot: Lot) {
    setSelected(lot);
    setHeroPhoto(lot.photos[0]?.url || "");
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true);
    setResult(null);
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/veiling/aanmelden", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          website: form.get("website"),
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Aanmelden is niet gelukt.");
      setResult({
        type: "ok",
        text: data.alreadyConfirmed
          ? "Dit e-mailadres is al bevestigd. Je mist de start van de veiling niet."
          : data.testMode
            ? "Testaanmelding opgeslagen. De bevestigingsmail is naar de mailbox van de stichting gestuurd."
            : "Gelukt! Open de bevestigingsmail die we je zojuist hebben gestuurd.",
      });
      formElement.reset();
    } catch (error) {
      setResult({ type: "error", text: error instanceof Error ? error.message : "Aanmelden is niet gelukt." });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-[#f6f4ef] pt-16 md:pt-20">
      <section className="bg-[#183651] px-5 py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-amber-300 sm:text-sm">Stichting Bulldog Steunfonds Nederland</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">De Bulldogveiling komt eraan</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">Bekijk nu alvast de kavels en ontdek wat onze sponsors beschikbaar hebben gesteld. Meld je aan, dan ontvang je bericht zodra je kunt bieden.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#kavels" className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-[#183651]">Bekijk de kavels</a>
              <a href="#aanmelden" className="rounded-xl border border-white/50 px-6 py-3 font-extrabold text-white">Ik wil de start niet missen</a>
            </div>
            <p className="mt-5 text-sm text-blue-100">Geplande start: 15 november 2026 · bieden is nu nog gesloten</p>
          </div>
          <form id="aanmelden" onSubmit={register} className="rounded-3xl bg-white p-6 text-slate-800 shadow-xl sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Blijf op de hoogte</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#183651]">Meld je alvast aan</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Je krijgt een bevestigingsmail en een bericht wanneer de veiling begint.</p>
            <label className="mt-5 block text-sm font-bold text-[#183651]">Naam
              <input name="name" required minLength={2} maxLength={180} autoComplete="name" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" />
            </label>
            <label className="mt-4 block text-sm font-bold text-[#183651]">E-mailadres
              <input name="email" required type="email" maxLength={254} autoComplete="email" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" />
            </label>
            <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <button disabled={sending} className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651] disabled:opacity-60">
              {sending ? "Aanmelden..." : "Aanmelden voor de veiling"}
            </button>
            {result && <p role="status" className={"mt-4 rounded-xl p-3 text-sm font-semibold " + (result.type === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>{result.text}</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">We gebruiken je gegevens alleen voor deelname en berichten over deze veiling.</p>
          </form>
        </div>
      </section>

      <section id="kavels" className="mx-auto max-w-7xl px-3 py-10 sm:px-5 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 sm:text-sm">Alvast rondkijken</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#183651]">Kavels in deze veiling</h2>
            <p className="mt-2 text-sm text-slate-600">Je kunt de kavels bekijken. Bieden wordt actief zodra de veiling begint.</p>
          </div>
          <label className="block w-full text-sm font-semibold text-[#183651] sm:w-auto">Zoek een kavel
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Naam of sponsor..." className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 sm:min-w-[260px]" />
          </label>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleLots.map(lot => (
            <article key={lot.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              {lot.photos[0]?.url
                ? <img src={lot.photos[0].url} alt={lot.title} className="h-28 w-full object-cover sm:h-48" />
                : <div className="flex h-28 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50 text-center text-xs font-bold text-[#183651] sm:h-48 sm:text-sm">🐾<br />Foto volgt</div>}
              <div className="p-3 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 sm:text-xs">Kavel {String(lot.lot_number).padStart(3, "0")}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-extrabold leading-snug text-[#183651] sm:mt-2 sm:min-h-14 sm:text-lg">{lot.title}</h3>
                {lot.sponsor && <p className="mt-1 line-clamp-2 text-[10px] text-slate-500 sm:text-sm">Mogelijk gemaakt door <strong>{lot.sponsor}</strong></p>}
                <div className="mt-3 border-t border-slate-100 pt-3 sm:mt-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">Startbod</p>
                  <p className="text-lg font-extrabold text-[#183651] sm:text-2xl">{euro(lot.start_bid)}</p>
                  <button onClick={() => openLot(lot)} className="mt-2 w-full rounded-lg bg-[#183651] px-2 py-2 text-xs font-extrabold text-white sm:mt-4 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">Bekijk kavel</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleLots.length === 0 && <p className="mt-8 text-sm text-slate-600">Geen zichtbare kavels gevonden.</p>}
      </section>

      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label={selected.title} className="my-3 max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-5 py-3 sm:px-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Kavel {String(selected.lot_number).padStart(3, "0")}</p>
              <button aria-label="Sluiten" onClick={() => setSelected(null)} className="rounded-full border px-3 py-1 text-xl">×</button>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="bg-slate-100 p-2 sm:p-4">
                {heroPhoto ? <img src={heroPhoto} alt={selected.title} className="h-64 w-full rounded-2xl object-cover sm:h-96" /> : <div className="flex h-64 items-center justify-center rounded-2xl bg-amber-50 text-slate-500 sm:h-96">Foto volgt</div>}
                {selected.photos.length > 1 && <div className="mt-2 grid grid-cols-5 gap-2">{selected.photos.map(photo => <button key={photo.path} onClick={() => setHeroPhoto(photo.url)} className={"overflow-hidden rounded-lg border-2 " + (heroPhoto === photo.url ? "border-amber-500" : "border-transparent")}><img src={photo.url} alt="Productfoto" className="h-14 w-full object-cover" /></button>)}</div>}
              </div>
              <div className="p-5 sm:p-7">
                <h2 className="text-2xl font-extrabold leading-tight text-[#183651] sm:text-3xl">{selected.title}</h2>
                {selected.sponsor && <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-slate-700">Beschikbaar gesteld door <strong className="text-[#183651]">{selected.sponsor}</strong></div>}
                <div className="mt-5 whitespace-pre-wrap leading-relaxed text-slate-700">{selected.description || "Meer informatie over dit kavel volgt."}</div>
                <div className="mt-6 rounded-2xl bg-[#f6f4ef] p-4">
                  <p className="text-sm text-slate-500">Startbod</p>
                  <p className="text-3xl font-extrabold text-[#183651]">{euro(selected.start_bid)}</p>
                  <a href="#aanmelden" onClick={() => setSelected(null)} className="mt-4 block w-full rounded-xl bg-amber-400 px-5 py-4 text-center font-extrabold text-[#183651]">Meld mij aan voor de start</a>
                  <p className="mt-3 text-center text-xs text-slate-500">Bieden is mogelijk zodra de veiling is begonnen.</p>
                </div>
                {(selected.sponsor_website || selected.sponsor_facebook || selected.sponsor_instagram) && <div className="mt-5 border-t pt-4">
                  <p className="font-bold text-[#183651]">Meer over de sponsor</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-blue-800">
                    {selected.sponsor_website && <a href={selected.sponsor_website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
                    {selected.sponsor_facebook && <a href={selected.sponsor_facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>}
                    {selected.sponsor_instagram && <a href={selected.sponsor_instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>}
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
