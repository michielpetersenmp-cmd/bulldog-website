"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Photo = { path: string; url: string };
type Lot = {
  id: number; lot_number: number; title: string; category: string; sponsor: string | null;
  sponsor_website: string | null; sponsor_facebook: string | null; sponsor_instagram: string | null;
  description: string | null; start_bid: number; retail_value: number | null; current_bid: number; bid_count: number;
  active: boolean; closes_at: string; photos: Photo[];
};

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
function retailEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(value);
}

export default function VeilingPubliek({ lots, loggedIn, biddingEnabled: initialBiddingEnabled }: {
  lots: Lot[]; loggedIn: boolean; biddingEnabled: boolean;
}) {
  const [liveLots, setLiveLots] = useState(lots);
  const [biddingEnabled, setBiddingEnabled] = useState(initialBiddingEnabled);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Alle categorieën");
  const [selected, setSelected] = useState<Lot | null>(null);
  const [heroPhoto, setHeroPhoto] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidSending, setBidSending] = useState(false);
  const [bidResult, setBidResult] = useState<{ type: "ok" | "error"; text: string } | null>(null);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(liveLots.filter(lot => lot.active).map(lot => lot.category || "Overig"))).sort((a, b) => a.localeCompare(b, "nl")),
    [liveLots]
  );
  const visibleLots = useMemo(
    () => liveLots.filter(lot =>
      lot.active &&
      (category === "Alle categorieën" || (lot.category || "Overig") === category) &&
      [lot.title, lot.category || "", lot.sponsor || "", lot.description || ""].join(" ").toLowerCase().includes(search.toLowerCase())
    ),
    [liveLots, search, category]
  );

  useEffect(() => {
    if (!biddingEnabled) return;
    let active = true;
    async function refreshBids() {
      try {
        const response = await fetch("/api/veiling/bieden", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok || !active) return;
        setBiddingEnabled(Boolean(data.biddingEnabled));
        const states = new Map<number, { current_bid: number; bid_count: number }>((data.states || []).map((state: { lot_id: number; current_bid: number; bid_count: number }) => [Number(state.lot_id), state]));
        setLiveLots(current => current.map(lot => {
          const state = states.get(lot.id);
          return state ? { ...lot, current_bid: state.current_bid, bid_count: state.bid_count } : lot;
        }));
        setSelected(current => {
          if (!current) return current;
          const state = states.get(current.id);
          return state ? { ...current, current_bid: state.current_bid, bid_count: state.bid_count } : current;
        });
      } catch {}
    }
    void refreshBids();
    const interval = window.setInterval(() => void refreshBids(), 5000);
    return () => { active = false; window.clearInterval(interval); };
  }, [biddingEnabled]);

  function openLot(lot: Lot) {
    setSelected(lot);
    setHeroPhoto(lot.photos[0]?.url || "");
    setBidAmount(String(lot.current_bid + 1));
    setBidResult(null);
  }

  async function register(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true);
    setResult(null);
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/veiling/aanmelden", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), website: form.get("website") }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Aanmelden is niet gelukt.");
      setResult({ type: "ok", text: data.alreadyConfirmed ? "Dit e-mailadres is al bevestigd. Je kunt inloggen bij Mijn veiling." : data.testMode ? "Testaanmelding opgeslagen. De bevestigingsmail is naar de mailbox van de stichting gestuurd." : "Gelukt! Open de bevestigingsmail die we je zojuist hebben gestuurd." });
      formElement.reset();
    } catch (error) {
      setResult({ type: "error", text: error instanceof Error ? error.message : "Aanmelden is niet gelukt." });
    } finally { setSending(false); }
  }

  async function placeBid(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setBidSending(true);
    setBidResult(null);
    try {
      const response = await fetch("/api/veiling/bieden", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lotId: selected.id, amount: Number(bidAmount) }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Bod opslaan is niet gelukt.");
      const nextAmount = Number(data.amount);
      setLiveLots(current => current.map(lot => lot.id === selected.id ? { ...lot, current_bid: nextAmount, bid_count: Number(data.bid_count) } : lot));
      setSelected(current => current ? { ...current, current_bid: nextAmount, bid_count: Number(data.bid_count) } : current);
      setBidAmount(String(Number(data.minimum_next_bid)));
      setBidResult({ type: "ok", text: "Je proefbod is opgeslagen. Je hebt nu het hoogste bod." });
    } catch (error) {
      setBidResult({ type: "error", text: error instanceof Error ? error.message : "Bod opslaan is niet gelukt." });
    } finally { setBidSending(false); }
  }

  return (
    <div className="bg-[#f6f4ef] pt-16 md:pt-20">
      <section className="bg-[#183651] px-5 py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[.18em] text-amber-300 sm:text-sm">Stichting Bulldog Steunfonds Nederland</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">{biddingEnabled ? "Test nu het bieden op de Bulldogveiling" : "De Bulldogveiling komt eraan"}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">{biddingEnabled ? "De afgeschermde proefbiedingen staan aan. Plaats een bod vanuit je bevestigde deelnemersaccount en controleer de volledige werking." : "Bekijk nu alvast de kavels en ontdek wat onze sponsors beschikbaar hebben gesteld. Meld je aan, dan ontvang je bericht zodra je kunt bieden."}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#kavels" className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-[#183651]">Bekijk de kavels</a>
              {loggedIn ? <a href="/veiling/mijn-account" className="rounded-xl border border-white/50 px-6 py-3 font-extrabold text-white">Mijn veiling</a> : <a href="/veiling/inloggen" className="rounded-xl border border-white/50 px-6 py-3 font-extrabold text-white">Inloggen</a>}
            </div>
            <p className="mt-5 text-sm text-blue-100">{biddingEnabled ? "TESTMODUS · proefbiedingen tellen niet mee en er worden geen deelnemersmails verstuurd" : "Geplande start: 15 november 2026 · bieden is nu nog gesloten"}</p>
          </div>
          <form id="aanmelden" onSubmit={register} className="rounded-3xl bg-white p-6 text-slate-800 shadow-xl sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Blijf op de hoogte</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#183651]">Meld je alvast aan</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Je krijgt een bevestigingsmail en een bericht wanneer de veiling begint.</p>
            <label className="mt-5 block text-sm font-bold text-[#183651]">Naam<input name="name" required minLength={2} maxLength={180} autoComplete="name" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" /></label>
            <label className="mt-4 block text-sm font-bold text-[#183651]">E-mailadres<input name="email" required type="email" maxLength={254} autoComplete="email" className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal text-slate-900" /></label>
            <label className="hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <button disabled={sending} className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651] disabled:opacity-60">{sending ? "Aanmelden..." : "Aanmelden voor de veiling"}</button>
            {result && <p role="status" className={"mt-4 rounded-xl p-3 text-sm font-semibold " + (result.type === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>{result.text}</p>}
            <p className="mt-4 text-xs leading-relaxed text-slate-500">We gebruiken je gegevens alleen voor deelname en berichten over deze veiling.</p>
          </form>
        </div>
      </section>

      <section id="kavels" className="mx-auto max-w-7xl px-3 py-10 sm:px-5 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-widest text-amber-700 sm:text-sm">{biddingEnabled ? "Proefbieden actief" : "Alvast rondkijken"}</p><h2 className="mt-2 text-3xl font-extrabold text-[#183651]">Kavels in deze veiling</h2><p className="mt-2 text-sm text-slate-600">{biddingEnabled ? "Open een kavel om een proefbod te plaatsen. Minimaal € 1 hoger dan het huidige bod." : "Je kunt de kavels bekijken. Bieden wordt actief zodra de veiling begint."}</p></div>
          <div className="grid w-full gap-3 sm:w-auto sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#183651]">Categorie<select value={category} onChange={event => setCategory(event.target.value)} className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"><option>Alle categorieën</option>{categories.map(item => <option key={item}>{item}</option>)}</select></label>
            <label className="block text-sm font-semibold text-[#183651]">Zoek een kavel<input value={search} onChange={event => setSearch(event.target.value)} placeholder="Naam of sponsor..." className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 sm:min-w-[240px]" /></label>
          </div>
        </div>
        {!biddingEnabled && <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-4 text-sm font-semibold text-[#183651]">
          🐾 De komende weken worden nog veel meer kavels toegevoegd. Kom daarom regelmatig terug om te zien wat er nieuw bij is.
        </div>}
        <div className={`${biddingEnabled ? "mt-6" : "mt-3"} rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950`}>
          Verzendkosten binnen Nederland: € 6,95 boven op je winnende bod. Voor verzending naar België zijn de verzendkosten € 10,00. Win je meerdere kavels, dan betaal je de verzendkosten maar één keer.
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleLots.map(lot => <article key={lot.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
            {lot.photos[0]?.url ? <img src={lot.photos[0].url} alt={lot.title} className="h-28 w-full object-cover sm:h-48" /> : <div className="flex h-28 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50 text-center text-xs font-bold text-[#183651] sm:h-48 sm:text-sm">🐾<br />Foto volgt</div>}
            <div className="p-3 sm:p-5">
              <div className="flex flex-wrap items-center gap-1"><p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 sm:text-xs">Kavel {String(lot.lot_number).padStart(3, "0")}</p><span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800 sm:text-[10px]">{lot.category || "Overig"}</span></div>
              <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-extrabold leading-snug text-[#183651] sm:mt-2 sm:min-h-14 sm:text-lg">{lot.title}</h3>
              {lot.sponsor && <p className="mt-1 line-clamp-2 text-[10px] text-slate-500 sm:text-sm">Mogelijk gemaakt door <strong>{lot.sponsor}</strong></p>}
              <div className="mt-3 border-t border-slate-100 pt-3 sm:mt-4">{lot.retail_value !== null && <p className="mb-1 text-[9px] font-bold text-slate-500 sm:text-xs">Winkelwaarde {retailEuro(lot.retail_value)}</p>}<p className="text-[10px] text-slate-500 sm:text-xs">{biddingEnabled && lot.bid_count > 0 ? "Hoogste proefbod" : "Startbod"}</p><p className="text-lg font-extrabold text-[#183651] sm:text-2xl">{euro(biddingEnabled ? lot.current_bid : lot.start_bid)}</p><p className="mt-1 text-[9px] font-semibold text-slate-500 sm:text-xs">+ verzending: NL € 6,95 · België € 10,00</p><button onClick={() => openLot(lot)} className="mt-2 w-full rounded-lg bg-[#183651] px-2 py-2 text-xs font-extrabold text-white sm:mt-4 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">{biddingEnabled ? "Bekijk en bied" : "Bekijk kavel"}</button></div>
            </div>
          </article>)}
        </div>
      </section>

      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5" onClick={() => setSelected(null)}>
        <div role="dialog" aria-modal="true" aria-label={selected.title} className="my-3 max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={event => event.stopPropagation()}>
          <div className="flex items-center justify-between border-b px-5 py-3 sm:px-7"><div className="flex flex-wrap items-center gap-2"><p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Kavel {String(selected.lot_number).padStart(3, "0")}</p><span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-800">{selected.category || "Overig"}</span></div><button aria-label="Sluiten" onClick={() => setSelected(null)} className="rounded-full border px-3 py-1 text-xl">×</button></div>
          <div className="grid md:grid-cols-2">
            <div className="bg-slate-100 p-2 sm:p-4">
              {heroPhoto ? <img src={heroPhoto} alt={selected.title} className="h-64 w-full rounded-2xl object-cover sm:h-96" /> : <div className="flex h-64 items-center justify-center rounded-2xl bg-amber-50 text-slate-500 sm:h-96">Foto volgt</div>}
              {selected.photos.length > 1 && <div className="mt-2 grid grid-cols-5 gap-2">{selected.photos.map(photo => <button key={photo.path} onClick={() => setHeroPhoto(photo.url)} className={"overflow-hidden rounded-lg border-2 " + (heroPhoto === photo.url ? "border-amber-500" : "border-transparent")}><img src={photo.url} alt="Productfoto" className="h-14 w-full object-cover" /></button>)}</div>}
            </div>
            <div className="p-5 sm:p-7">
              <h2 className="text-2xl font-extrabold leading-tight text-[#183651] sm:text-3xl">{selected.title}</h2>
              {selected.sponsor && <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-slate-700">Beschikbaar gesteld door <strong className="text-[#183651]">{selected.sponsor}</strong></div>}
              {(selected.sponsor_website || selected.sponsor_facebook || selected.sponsor_instagram) && <div className="mt-3 flex flex-wrap gap-2">{selected.sponsor_website && <a href={selected.sponsor_website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-[#183651] shadow-sm">🌐 Website</a>}{selected.sponsor_facebook && <a href={selected.sponsor_facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-3 py-2 text-sm font-bold text-white shadow-sm"><span aria-hidden="true">f</span> Facebook</a>}{selected.sponsor_instagram && <a href={selected.sponsor_instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-orange-500 px-3 py-2 text-sm font-bold text-white shadow-sm">◎ Instagram</a>}</div>}
              <div className="mt-6 rounded-2xl bg-[#f6f4ef] p-4">
                {selected.retail_value !== null && <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-white px-3 py-2"><span className="text-sm font-semibold text-slate-600">Oorspronkelijke winkelwaarde</span><strong className="text-lg text-[#183651]">{retailEuro(selected.retail_value)}</strong></div>}
                <p className="text-sm text-slate-500">{biddingEnabled && selected.bid_count > 0 ? "Hoogste proefbod" : "Startbod"}</p>
                <p className="text-3xl font-extrabold text-[#183651]">{euro(biddingEnabled ? selected.current_bid : selected.start_bid)}</p>
                <p className="mt-2 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-950">Binnen Nederland komt € 6,95 verzendkosten boven op het eindbod. Voor België zijn de verzendkosten € 10,00. Win je meerdere kavels, dan betaal je de verzendkosten maar één keer.</p>
                {biddingEnabled ? loggedIn ? <form onSubmit={placeBid} className="mt-4">
                  <label className="block text-sm font-bold text-[#183651]">Jouw bod in hele euro’s<input type="number" required min={selected.current_bid + 1} step={1} value={bidAmount} onChange={event => setBidAmount(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-bold text-slate-900" /></label>
                  <p className="mt-2 text-xs text-slate-500">Minimaal {euro(selected.current_bid + 1)}. Dit is een proefbod en telt niet mee bij de echte veiling.</p>
                  <button disabled={bidSending} className="mt-3 w-full rounded-xl bg-amber-400 px-5 py-4 font-extrabold text-[#183651] disabled:opacity-60">{bidSending ? "Bod opslaan..." : "Plaats proefbod"}</button>
                  {bidResult && <p role="status" className={"mt-3 rounded-xl p-3 text-sm font-semibold " + (bidResult.type === "ok" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800")}>{bidResult.text}</p>}
                </form> : <div className="mt-4"><a href="/veiling/inloggen" className="block w-full rounded-xl bg-amber-400 px-5 py-4 text-center font-extrabold text-[#183651]">Log in om proef te bieden</a><p className="mt-2 text-center text-xs text-slate-500">Je hebt een bevestigd deelnemersaccount nodig.</p></div> : <div className="mt-4"><a href="#aanmelden" onClick={() => setSelected(null)} className="block w-full rounded-xl bg-amber-400 px-5 py-4 text-center font-extrabold text-[#183651]">Meld mij aan voor de start</a><p className="mt-3 text-center text-xs text-slate-500">Bieden is mogelijk zodra de veiling is begonnen.</p></div>}
              </div>
              <div className="mt-6 border-t pt-5"><h3 className="font-extrabold text-[#183651]">Beschrijving</h3><div className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-700">{selected.description || "Meer informatie over dit kavel volgt."}</div></div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}
