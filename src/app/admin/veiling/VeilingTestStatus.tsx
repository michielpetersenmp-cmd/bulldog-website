"use client";

import { useState } from "react";

type Winner = {
  lot_id: number; lot_number: number; title: string; participant_name: string;
  participant_email: string; amount: number; notified: boolean;
};

function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function VeilingTestStatus({ initialEnabled, initialClosedAt, initialWinners }: {
  initialEnabled: boolean; initialClosedAt: string | null; initialWinners: Winner[];
}) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [closedAt, setClosedAt] = useState(initialClosedAt);
  const [winners, setWinners] = useState(initialWinners);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function change(action: "open" | "close") {
    if (action === "close" && !window.confirm("Proefveiling afsluiten? Daarna kunnen geen proefbiedingen meer worden geplaatst en worden de testwinnaar-mails naar de mailbox van de stichting gestuurd.")) return;
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/veiling-participant-test/status", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Wijzigen is niet gelukt.");
      setEnabled(Boolean(result.biddingEnabled));
      setWinners(result.items || []);
      setClosedAt(action === "close" ? new Date().toISOString() : null);
      setMessage(action === "close"
        ? `Proefveiling afgesloten. ${result.winnerCount} winnaar(s) vastgelegd en ${result.sentCount} testmail(s) verstuurd.`
        : "Proefveiling opnieuw geopend. De eerdere testuitslag is gewist; proefbiedingen zijn behouden.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Wijzigen is niet gelukt.");
    } finally { setBusy(false); }
  }

  return <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div><p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Proefveiling</p><h2 className="mt-1 text-2xl font-extrabold text-primary">{enabled ? "Proefbieden staat open" : "Proefveiling is afgesloten"}</h2><p className="mt-1 text-sm text-slate-600">{enabled ? "Deelnemersaccounts kunnen nu proefbiedingen plaatsen." : `Bieden is geblokkeerd${closedAt ? " sinds " + new Date(closedAt).toLocaleString("nl-NL") : ""}.`}</p></div>
      {enabled
        ? <button disabled={busy} onClick={() => change("close")} className="rounded-xl bg-red-700 px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Afsluiten..." : "Proefveiling afsluiten"}</button>
        : <button disabled={busy} onClick={() => change("open")} className="rounded-xl bg-green-700 px-5 py-3 font-bold text-white disabled:opacity-60">{busy ? "Openen..." : "Proefveiling opnieuw openen"}</button>}
    </div>
    {message && <p className="mt-4 rounded-xl bg-slate-100 p-4 text-sm font-semibold text-slate-800">{message}</p>}
    {winners.length > 0 && <div className="mt-5 overflow-hidden rounded-2xl border"><div className="border-b bg-slate-50 px-4 py-3 font-bold text-primary">Vastgelegde testwinnaars</div><div className="divide-y">{winners.map(winner => <div key={winner.lot_id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm"><div><strong>Kavel {String(winner.lot_number).padStart(3, "0")} · {winner.title}</strong><p className="text-slate-600">{winner.participant_name} · {winner.participant_email}</p></div><div className="text-right"><strong>{money(winner.amount)}</strong><p className={"text-xs font-bold " + (winner.notified ? "text-green-700" : "text-amber-700")}>{winner.notified ? "Testmail verzonden" : "Testmail niet verzonden"}</p></div></div>)}</div></div>}
  </section>;
}
