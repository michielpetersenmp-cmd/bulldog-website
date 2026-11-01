"use client";

import { useEffect, useMemo, useState } from "react";

type Registration = { id: string; name: string; email: string };
type Lot = { id: number; lot_number: number; title: string };
type Bid = { id: number; lot_id: number; participant_id: string; amount: number; created_at: string };
type State = { lot_id: number; current_bidder_id: string | null; current_bid: number };
type OutboxItem = { id: number; participant_id: string; lot_id: number; created_at: string };

function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
function dateTime(value: string) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default function Deelnemersbiedingen({ initialRegistrations, initialLots, initialBids, initialStates, initialOutbox }: {
  initialRegistrations: Registration[];
  initialLots: Lot[];
  initialBids: Bid[];
  initialStates: State[];
  initialOutbox: OutboxItem[];
}) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [lots, setLots] = useState(initialLots);
  const [bids, setBids] = useState(initialBids);
  const [states, setStates] = useState(initialStates);
  const [outbox, setOutbox] = useState(initialOutbox);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function refresh() {
      try {
        const response = await fetch("/api/admin/veiling-participant-test/overview", { cache: "no-store" });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Overzicht vernieuwen is niet gelukt.");
        if (!active) return;
        setRegistrations(result.registrations || []);
        setLots(result.lots || []);
        setBids(result.bids || []);
        setStates(result.states || []);
        setOutbox(result.outbox || []);
        setError("");
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Overzicht vernieuwen is niet gelukt.");
      }
    }
    void refresh();
    const interval = window.setInterval(() => void refresh(), 5000);
    return () => { active = false; window.clearInterval(interval); };
  }, []);

  const participantById = useMemo(() => new Map(registrations.map(item => [item.id, item])), [registrations]);
  const lotById = useMemo(() => new Map(lots.map(item => [Number(item.id), item])), [lots]);
  const leaderByLot = useMemo(() => new Map(states.map(item => [Number(item.lot_id), item.current_bidder_id])), [states]);

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-extrabold text-primary">Biedingen vanuit deelnemersaccounts</h2>
      <p className="mt-1 text-sm text-slate-600">Dit zijn aparte proefbiedingen. Ze worden iedere 5 seconden bijgewerkt en gaan niet mee naar de echte veiling.</p>
      {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
      <div className="mt-4 grid gap-6 xl:grid-cols-[1.3fr_.7fr]">
        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Recente proefbiedingen ({bids.length})</h3></div>
          {bids.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Kavel</th><th className="px-4 py-3">Deelnemer</th><th className="px-4 py-3">Bod</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Tijd</th></tr></thead>
            <tbody>{bids.map(bid => {
              const participant = participantById.get(bid.participant_id);
              const lot = lotById.get(Number(bid.lot_id));
              const leading = leaderByLot.get(Number(bid.lot_id)) === bid.participant_id && states.find(state => Number(state.lot_id) === Number(bid.lot_id))?.current_bid === bid.amount;
              return <tr key={bid.id} className="border-t"><td className="px-4 py-3">Kavel {String(lot?.lot_number || "").padStart(3, "0")} · {lot?.title || "Onbekend"}</td><td className="px-4 py-3"><strong>{participant?.name || "Onbekend"}</strong><br /><span className="text-xs text-slate-500">{participant?.email}</span></td><td className="px-4 py-3 font-bold">{money(bid.amount)}</td><td className="px-4 py-3">{leading ? <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-800">Hoogste bod</span> : <span className="text-xs text-slate-500">Overboden</span>}</td><td className="px-4 py-3">{dateTime(bid.created_at)}</td></tr>;
            })}</tbody>
          </table></div> : <p className="px-5 py-6 text-sm text-slate-500">Er zijn nog geen biedingen vanuit een deelnemersaccount.</p>}
        </div>
        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Testmeldingen ({outbox.length})</h3><p className="mt-1 text-xs text-slate-500">Geen van deze meldingen wordt per e-mail verzonden.</p></div>
          {outbox.length ? <div className="divide-y">{outbox.map(item => <div key={item.id} className="px-5 py-4 text-sm"><p className="font-bold text-primary">Overboden</p><p className="mt-1 text-slate-600">{participantById.get(item.participant_id)?.email || "Onbekende deelnemer"} · kavel {String(lotById.get(Number(item.lot_id))?.lot_number || "").padStart(3, "0")}</p><p className="mt-1 text-xs text-slate-500">{dateTime(item.created_at)} · niet verzonden</p></div>)}</div> : <p className="px-5 py-6 text-sm text-slate-500">Nog geen overbodenmeldingen.</p>}
        </div>
      </div>
    </section>
  );
}
