"use client";

import { useMemo, useState } from "react";

type Lot = {
  id: number;
  lot_number: number;
  title: string;
  sponsor: string | null;
  description: string | null;
  start_bid: number;
  current_bid: number;
  bid_count: number;
  active: boolean;
  closes_at: string;
  image_url: string | null;
  image_preview_url?: string | null;
  sponsor_website: string | null;
  sponsor_facebook: string | null;
};

function euro(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function VeilingVoorbeeld({ lots }: { lots: Lot[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lot | null>(null);
  const [simulated, setSimulated] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => lots.filter(l =>
    [l.title, l.sponsor || "", l.description || ""].join(" ").toLowerCase().includes(search.toLowerCase())
  ), [lots, search]);
  function tryBid(lot: Lot) {
    const current = simulated[lot.id] ?? lot.current_bid;
    setSimulated(prev => ({ ...prev, [lot.id]: current + 1 }));
    setNotice("Voorbeeldbod geplaatst! Alleen op dit scherm, niets opgeslagen of verstuurd.");
  }

  return (
    <>
      <section className="bg-gradient-to-br from-[#102c45] via-[#183651] to-[#304b60] px-5 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-amber-300">Stichting Bulldog Steunfonds Nederland</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">Bied mee voor de bulldogs!</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">Ontdek bijzondere kavels, steun bulldogs die een noodzakelijke operatie nodig hebben en mis jouw favoriet niet.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#kavels" className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-[#183651]">Bekijk de kavels</a>
            <span className="rounded-xl border border-white/40 px-6 py-3 font-semibold">Registreren (binnenkort)</span>
          </div>
          <p className="mt-6 text-sm text-blue-100">Veiling gepland van 15 t/m 29 november 2026 · sluiting om 20.00 uur</p>
        </div>
      </section>
      <section id="kavels" className="mx-auto max-w-6xl px-3 py-9 sm:px-5 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Bekijk wat er te winnen valt</p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#183651]">Veilingkavels</h2>
            <p className="mt-2 text-slate-600">Dit zijn vijf voorbeeldkavels. De echte foto's, sponsors en producten volgen later.</p>
          </div>
          <label className="block text-sm font-semibold text-[#183651]">Zoek een kavel
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Zoek op naam of sponsor..."
              className="mt-2 block w-full min-w-[250px] rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900"/>
          </label>
        </div>
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {filtered.map(lot => (
            <article key={lot.id} className="overflow-hidden rounded-2xl border border-[#e5dfd3] bg-white shadow-[0_5px_22px_rgba(24,54,81,0.08)] transition-shadow hover:shadow-lg">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#f2e9d7] via-[#faf7ef] to-[#dce7e8]">
                {lot.image_preview_url ? <img src={lot.image_preview_url} alt={lot.title} className="h-full w-full object-cover" /> : <div className="text-center text-[#183651]">
                  <span className="block text-3xl sm:text-5xl" aria-hidden="true">🐾</span>
                  <span className="mt-2 block text-[10px] font-bold uppercase tracking-wider sm:text-xs">Foto volgt</span>
                </div>}
              </div>
              <div className="p-3 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-[#a47c38] sm:text-xs">Kavel {String(lot.lot_number).padStart(3,"0")}</p>
                <h3 className="mt-2 min-h-12 text-sm font-extrabold leading-snug sm:min-h-14 sm:text-lg text-[#183651]">{lot.title}</h3>
                <p className="mt-1 line-clamp-2 min-h-8 text-[11px] leading-snug text-slate-500 sm:text-sm">Beschikbaar gesteld door {lot.sponsor || "test-sponsor"}</p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-1 border-t border-[#eee8dc] pt-3 sm:mt-5 sm:pt-4">
                  <div>
                    <p className="text-[10px] text-slate-500 sm:text-xs">Hoogste bod</p>
                    <p className="text-lg font-extrabold text-[#183651] sm:text-2xl">{euro(simulated[lot.id] ?? lot.current_bid)}</p>
                  </div>
                  <p className="text-[10px] text-slate-500 sm:text-xs">{lot.bid_count + ((simulated[lot.id] ?? lot.current_bid) - lot.current_bid)} biedingen*</p>
                </div>
                <button onClick={() => {setSelected(lot);setNotice("");}} className="mt-3 w-full rounded-lg bg-[#183651] px-2 py-2.5 text-xs font-extrabold text-white sm:mt-5 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">
                  Bekijk kavel & bied
                </button>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && <p className="mt-8 text-slate-600">Geen kavels gevonden.</p>}
        <p className="mt-8 text-sm text-slate-500">* Testgegevens en schermsimulatie. Biedingen worden hier niet opgeslagen en er worden geen mails verstuurd.</p>
      </section>
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label="Voorbeeld bieden" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-bold text-amber-700">Kavel {String(selected.lot_number).padStart(3,"0")}</p>
              <button aria-label="Sluiten" onClick={() => setSelected(null)} className="rounded-full border px-3 py-1 text-xl">×</button>
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-[#183651]">{selected.title}</h2>
            <p className="mt-3 text-slate-600">{selected.description || "Voorbeeldproduct voor de veiling."}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">{selected.sponsor_website && <a href={selected.sponsor_website} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Website sponsor</a>}{selected.sponsor_facebook && <a href={selected.sponsor_facebook} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">Facebook sponsor</a>}</div><p className="mt-6 text-sm text-slate-500">Huidig voorbeeldbod</p>
            <p className="text-3xl font-extrabold text-[#183651]">{euro(simulated[selected.id] ?? selected.current_bid)}</p>
            <button onClick={() => tryBid(selected)} className="mt-6 w-full rounded-xl bg-amber-400 px-5 py-4 font-extrabold text-[#183651]">
              Testbod: {euro((simulated[selected.id] ?? selected.current_bid) + 1)}
            </button>
            {notice && <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800">{notice}</p>}
            <p className="mt-4 text-xs text-slate-500">Dit is een klikbaar ontwerpvoorbeeld, geen echte registratie of bieding.</p>
          </div>
        </div>
      )}
    </>
  );
}
