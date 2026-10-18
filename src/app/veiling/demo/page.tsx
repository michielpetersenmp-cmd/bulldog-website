"use client";

import { useState } from "react";
import Link from "next/link";

type Lot = { id: number; title: string; current: number; bids: number; sponsor: string };
const initialLots: Lot[] = [
  { id: 1, title: "Luxe hondensnackpakket", current: 15, bids: 0, sponsor: "Sponsor volgt" },
  { id: 2, title: "Verwenmand voor je hond", current: 30, bids: 0, sponsor: "Sponsor volgt" },
  { id: 3, title: "Bulldog kerstornament", current: 10, bids: 0, sponsor: "Sponsor volgt" },
  { id: 4, title: "Zachte hondendeken", current: 12, bids: 0, sponsor: "Sponsor volgt" },
  { id: 5, title: "Hondenlijn en halsband", current: 18, bids: 0, sponsor: "Sponsor volgt" },
];
const euros = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

export default function VeilingDemoPage() {
  const [lots, setLots] = useState<Lot[]>(initialLots);
  const [selected, setSelected] = useState<number | null>(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const lot = lots.find(item => item.id === selected);

  function choose(item: Lot) {
    setSelected(item.id);
    setAmount(String(item.current + 1));
    setMessage("");
  }

  function bid() {
    if (!lot) return;
    const n = Number(amount);
    if (!Number.isFinite(n) || !Number.isInteger(n) || n < lot.current + 1) {
      setMessage("Vul een heel bedrag in, minimaal €1 boven het hoogste bod.");
      return;
    }
    setLots(prev => prev.map(item => item.id === lot.id ? { ...item, current: n, bids: item.bids + 1 } : item));
    setSelected(null);
    setMessage(`Testbod van ${euros(n)} op kavel ${String(lot.id).padStart(3, "0")} verwerkt. Alleen zichtbaar in deze browser.`);
  }

  return (
    <main className="min-h-screen bg-[#f8f8f6] px-5 pt-32 pb-16 text-[#1a3a5c]">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-xl bg-amber-100 border border-amber-300 text-amber-950 p-4 text-sm mb-6">
          <strong>Afgeschermde ontwikkelversie, nog geen echte veiling.</strong> Alle biedingen zijn tijdelijk en alleen op jouw scherm zichtbaar. Er worden geen gegevens opgeslagen of e-mails verstuurd.
        </div>
        <Link href="/veiling" className="underline text-sm">← Naar het veilingoverzicht</Link>
        <h1 className="font-display text-4xl font-bold mt-6">Oefenen met bieden</h1>
        <p className="mt-3 mb-8 text-slate-600">Probeer de biedknoppen uit. Gebruik geen echte persoonsgegevens. Alles is uitsluitend een demonstratie.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lots.map(item => (
            <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold text-amber-700">KAVEL {String(item.id).padStart(3, "0")}</p>
              <h2 className="text-lg font-bold mt-2">{item.title}</h2>
              <p className="text-sm text-slate-500">{item.sponsor}</p>
              <p className="text-xs text-slate-500 mt-5">{item.bids ? "Hoogste testbod" : "Voorbeeldstartbod"}</p>
              <p className="text-2xl font-extrabold">{euros(item.current)}</p>
              <p className="text-xs text-slate-500 mt-1">{item.bids} testbiedingen</p>
              <button onClick={() => choose(item)} className="w-full bg-[#1a3a5c] text-white font-bold rounded-lg p-3 mt-4">Testbod plaatsen</button>
            </article>
          ))}
        </div>
        {message && <p role="status" className="rounded-xl border border-green-300 bg-green-50 text-green-950 p-4 mt-6">{message}</p>}
        <button className="underline mt-7 text-sm" onClick={() => { setLots(initialLots); setSelected(null); setMessage("Alle testbiedingen op dit scherm zijn gewist."); }}>Testbiedingen wissen en opnieuw beginnen</button>
      </div>
      {lot && (
        <div className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center p-4" role="presentation" onClick={() => setSelected(null)}>
          <div className="w-full max-w-md bg-white rounded-2xl p-6 text-[#1a3a5c]" role="dialog" aria-modal="true" aria-label="Testbod plaatsen" onClick={e => e.stopPropagation()}>
            <h2 className="font-display font-bold text-2xl">{lot.title}</h2>
            <p className="text-sm mt-2">Hoogste testbod: <strong>{euros(lot.current)}</strong></p>
            <label htmlFor="offer" className="block font-semibold mt-5 mb-2">Jouw testbod in euro's</label>
            <input id="offer" type="number" inputMode="numeric" min={lot.current + 1} step="1" value={amount} onChange={e => setAmount(e.target.value)} className="w-full border border-slate-400 p-3 rounded-lg" />
            <p className="text-xs text-slate-500 mt-2">Minimaal {euros(lot.current + 1)}. Geen echt bod, geen betalingsverplichting.</p>
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="border rounded-lg p-3" onClick={() => setSelected(null)}>Annuleren</button>
              <button className="bg-[#1a3a5c] text-white font-bold rounded-lg p-3" onClick={bid}>Testbod plaatsen</button>
            </div>
            {message && <p role="alert" className="text-sm text-red-600 mt-3">{message}</p>}
          </div>
        </div>
      )}
    </main>
  );
}
