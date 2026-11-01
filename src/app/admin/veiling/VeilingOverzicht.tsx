type Bidder = { id: string; name: string; email: string; created_at: string };
type Bid = { id: number; lot_id: number; bidder_id: string; amount: number; created_at: string };
type Lot = { id: number; lot_number: number; title: string; current_bid: number; current_bidder_id: string | null; closes_at: string };
type OutboxItem = { id: number; event_type: string; bidder_id: string | null; lot_id: number | null; delivered: boolean; created_at: string };
type Props = { bidders: Bidder[]; bids: Bid[]; lots: Lot[]; outbox: OutboxItem[] };

function dateTime(value: string) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}
function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function VeilingOverzicht({ bidders, bids, lots, outbox }: Props) {
  const bidderById = new Map(bidders.map(bidder => [bidder.id, bidder]));
  const lotById = new Map(lots.map(lot => [lot.id, lot]));
  const closedLots = lots.filter(lot => new Date(lot.closes_at).getTime() <= Date.now());
  return (
    <section className="mt-10 space-y-8">
      <div>
        <div><h2 className="text-2xl font-extrabold text-primary">Deelnemers, biedingen en uitslag</h2><p className="mt-1 text-sm text-slate-600">Alle gegevens hieronder zijn testgegevens. E-mailmeldingen worden niet verzonden.</p></div>
        <div className="mt-4 grid gap-6 xl:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Testdeelnemers ({bidders.length})</h3></div>
            {bidders.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Naam</th><th className="px-4 py-3">E-mailadres</th><th className="px-4 py-3">Aangemeld</th></tr></thead><tbody>{bidders.map(bidder => <tr key={bidder.id} className="border-t"><td className="px-4 py-3 font-semibold">{bidder.name}</td><td className="px-4 py-3">{bidder.email}</td><td className="px-4 py-3">{dateTime(bidder.created_at)}</td></tr>)}</tbody></table></div> : <p className="px-5 py-6 text-sm text-slate-500">Er zijn nog geen testdeelnemers.</p>}
          </div>
          <div className="overflow-hidden rounded-2xl border bg-white">
            <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Recente testbiedingen ({bids.length})</h3></div>
            {bids.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Kavel</th><th className="px-4 py-3">Deelnemer</th><th className="px-4 py-3">Bod</th><th className="px-4 py-3">Tijd</th></tr></thead><tbody>{bids.map(bid => <tr key={bid.id} className="border-t"><td className="px-4 py-3">{lotById.get(bid.lot_id)?.title || "Kavel"}</td><td className="px-4 py-3">{bidderById.get(bid.bidder_id)?.name || "Deelnemer"}</td><td className="px-4 py-3 font-bold">{money(bid.amount)}</td><td className="px-4 py-3">{dateTime(bid.created_at)}</td></tr>)}</tbody></table></div> : <p className="px-5 py-6 text-sm text-slate-500">Er zijn nog geen testbiedingen.</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Winnaars</h3><p className="mt-1 text-xs text-slate-500">Een kavel krijgt pas een winnaar na de sluitingstijd.</p></div>
          {closedLots.length ? <div className="divide-y">{closedLots.map(lot => { const winner = lot.current_bidder_id ? bidderById.get(lot.current_bidder_id) : null; return <div key={lot.id} className="flex items-center justify-between gap-4 px-5 py-4 text-sm"><div><p className="font-bold text-primary">Kavel {String(lot.lot_number).padStart(3, "0")} · {lot.title}</p><p className="mt-1 text-slate-600">{winner ? winner.name + " · " + winner.email : "Geen winnaar geregistreerd"}</p></div><strong>{money(lot.current_bid)}</strong></div>; })}</div> : <p className="px-5 py-6 text-sm text-slate-500">Nog geen kavels gesloten.</p>}
        </div>
        <div className="overflow-hidden rounded-2xl border bg-white">
          <div className="border-b px-5 py-4"><h3 className="font-extrabold text-primary">Meldingenwachtrij ({outbox.length})</h3><p className="mt-1 text-xs text-slate-500">Testmeldingen blijven hier staan; er wordt geen e-mail verstuurd.</p></div>
          {outbox.length ? <div className="divide-y">{outbox.map(item => { const bidder = item.bidder_id ? bidderById.get(item.bidder_id) : null; const lot = item.lot_id ? lotById.get(item.lot_id) : null; return <div key={item.id} className="flex items-center justify-between gap-4 px-5 py-4 text-sm"><div><p className="font-bold text-primary">{item.event_type === "outbid" ? "Overboden" : item.event_type}</p><p className="mt-1 text-slate-600">{bidder?.email || "Geen deelnemer"}{lot ? " · kavel " + String(lot.lot_number).padStart(3, "0") : ""}</p><p className="mt-1 text-xs text-slate-500">{dateTime(item.created_at)}</p></div><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">{item.delivered ? "Test verwerkt" : "Niet verzonden"}</span></div>; })}</div> : <p className="px-5 py-6 text-sm text-slate-500">Er staan nog geen testmeldingen klaar.</p>}
        </div>
      </div>
    </section>
  );
}
