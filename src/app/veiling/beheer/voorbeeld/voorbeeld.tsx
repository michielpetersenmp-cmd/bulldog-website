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
      <section className="bg-[#183651] px-5 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-extrabold uppercase tracking-[.18em] text-amber-300">Stichting Bulldog Steunfonds Nederland</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Bied mee voor de bulldogs!</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">Ontdek bijzondere kavels, steun bulldogs die een noodzakelijke operatie nodig hebben en mis jouw favoriet niet.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#kavels" className="rounded-xl bg-amber-400 px-6 py-3 font-extrabold text-[#183651]">Bekijk de kavels</a>
            <span className="rounded-xl border border-white/40 px-6 py-3 font-semibold">Registreren (binnenkort)</span>
          </div>
          <p className="mt-6 text-sm text-blue-100">Veiling gepland van 15 t/m 29 november 2026 · sluiting om 20.00 uur</p>
        </div>
      </section>
      <section id="kavels" className="mx-auto max-w-6xl px-5 py-12">
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(lot => (
            <article key={lot.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex h-44 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50">
                <div className="text-center text-[#183651]">
                  <span className="block text-5xl" aria-hidden="true">🐾</span>
                  <span className="mt-3 block text-sm font-bold">Foto volgt</span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Kavel {String(lot.lot_number).padStart(3,"0")}</p>
                <h3 className="mt-2 min-h-14 text-xl font-extrabold text-[#183651]">{lot.title}</h3>
                <p className="text-sm text-slate-500">Beschikbaar gesteld door {lot.sponsor || "test-sponsor"}</p>
                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">
                  <div>
                    <p className="text-xs text-slate-500">Hoogste bod</p>
                    <p className="text-2xl font-extrabold text-[#183651]">{euro(simulated[lot.id] ?? lot.current_bid)}</p>
                  </div>
                  <p className="text-xs text-slate-500">{lot.bid_count + ((simulated[lot.id] ?? lot.current_bid) - lot.current_bid)} biedingen*</p>
                </div>
                <button onClick={() => {setSelected(lot);setNotice("");}} className="mt-5 w-full rounded-xl bg-[#183651] px-4 py-3 font-extrabold text-white">
                  Bekijk & bied mee
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
            <p className="mt-6 text-sm text-slate-500">Huidig voorbeeldbod</p>
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
