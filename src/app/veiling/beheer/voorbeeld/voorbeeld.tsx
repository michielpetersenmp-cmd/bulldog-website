"use client";

import { useMemo, useState } from "react";

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

export default function VeilingVoorbeeld({ lots }: { lots: Lot[] }) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Lot | null>(null);
  const [heroPhoto, setHeroPhoto] = useState("");
  const [simulated, setSimulated] = useState<Record<number, number>>({});
  const [notice, setNotice] = useState("");
  const visibleLots = useMemo(() => lots.filter(l => l.active && [l.title, l.sponsor || "", l.description || ""].join(" ").toLowerCase().includes(search.toLowerCase())), [lots, search]);

  function openLot(lot: Lot) {
    setSelected(lot);
    setHeroPhoto(lot.photos[0]?.url || "");
    setNotice("");
  }
  function tryBid(lot: Lot) {
    const current = simulated[lot.id] ?? lot.current_bid;
    setSimulated(prev => ({ ...prev, [lot.id]: current + 1 }));
    setNotice("Voorbeeldbod geplaatst! Alleen op dit scherm, niets opgeslagen of verstuurd.");
  }

  return (
    <>
      <section className="bg-[#183651] px-5 py-12 text-white sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold uppercase tracking-[.18em] text-amber-300 sm:text-sm">Stichting Bulldog Steunfonds Nederland</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">Bied mee voor de bulldogs!</h1>
          <p className="mt-4 max-w-2xl text-base text-blue-100 sm:text-lg">Ontdek bijzondere kavels, steun bulldogs die een noodzakelijke operatie nodig hebben en mis jouw favoriet niet.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#kavels" className="rounded-xl bg-amber-400 px-5 py-3 text-sm font-extrabold text-[#183651] sm:px-6 sm:text-base">Bekijk de kavels</a>
            <span className="rounded-xl border border-white/40 px-5 py-3 text-sm font-semibold sm:px-6 sm:text-base">Registreren (binnenkort)</span>
          </div>
          <p className="mt-5 text-xs text-blue-100 sm:text-sm">Veiling gepland van 15 t/m 29 november 2026 · sluiting om 20.00 uur</p>
        </div>
      </section>

      <section id="kavels" className="mx-auto max-w-7xl px-3 py-9 sm:px-5 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700 sm:text-sm">Bekijk wat er te winnen valt</p>
            <h2 className="mt-2 text-2xl font-extrabold text-[#183651] sm:text-3xl">Veilingkavels</h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">Dit is een afgeschermd testvoorbeeld. Biedingen worden niet bewaard.</p>
          </div>
          <label className="block w-full text-xs font-semibold text-[#183651] sm:w-auto sm:text-sm">Zoek een kavel
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Zoek op naam of sponsor..."
              className="mt-1 block w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 sm:min-w-[250px] sm:px-4 sm:py-3" />
          </label>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {visibleLots.map(lot => (
            <article key={lot.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:rounded-3xl">
              {lot.photos[0]?.url
                ? <img src={lot.photos[0].url} alt={lot.title} className="h-28 w-full object-cover sm:h-48" />
                : <div className="flex h-28 items-center justify-center bg-gradient-to-br from-amber-100 to-orange-50 text-center text-xs font-bold text-[#183651] sm:h-48 sm:text-sm"><span>🐾<br />Foto volgt</span></div>}
              <div className="p-3 sm:p-5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 sm:text-xs sm:tracking-widest">Kavel {String(lot.lot_number).padStart(3, "0")}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-extrabold leading-snug text-[#183651] sm:mt-2 sm:min-h-14 sm:text-lg">{lot.title}</h3>
                {lot.sponsor && <p className="mt-1 line-clamp-1 text-[10px] text-slate-500 sm:text-sm">Mogelijk gemaakt door <strong>{lot.sponsor}</strong></p>}
                <div className="mt-3 border-t border-slate-100 pt-2 sm:mt-4 sm:pt-4">
                  <p className="text-[10px] text-slate-500 sm:text-xs">Hoogste bod</p>
                  <p className="text-lg font-extrabold text-[#183651] sm:text-2xl">{euro(simulated[lot.id] ?? lot.current_bid)}</p>
                  <button onClick={() => openLot(lot)} className="mt-2 w-full rounded-lg bg-[#183651] px-2 py-2 text-xs font-extrabold text-white sm:mt-4 sm:rounded-xl sm:px-4 sm:py-3 sm:text-sm">Bekijk & bied mee</button>
                </div>
              </div>
            </article>
          ))}
        </div>
        {visibleLots.length === 0 && <p className="mt-8 text-sm text-slate-600">Geen zichtbare kavels gevonden.</p>}
        <p className="mt-6 text-xs text-slate-500">Alleen testgegevens. De biedknop wijzigt uitsluitend de schermsimulatie.</p>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 sm:p-5" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label={selected.title} className="my-3 max-h-[94vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b px-5 py-3 sm:px-7">
              <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Kavel {String(selected.lot_number).padStart(3, "0")}</p>
              <button aria-label="Sluiten" onClick={() => setSelected(null)} className="rounded-full border px-3 py-1 text-xl">×</button>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="bg-slate-100 p-2 sm:p-4">
                {heroPhoto ? <img src={heroPhoto} alt={selected.title} className="h-64 w-full rounded-2xl object-cover sm:h-96" /> : <div className="flex h-64 items-center justify-center rounded-2xl bg-amber-50 text-slate-500 sm:h-96">Foto volgt</div>}
                {selected.photos.length > 1 && <div className="mt-2 grid grid-cols-5 gap-2">{selected.photos.map(photo => <button key={photo.path} onClick={() => setHeroPhoto(photo.url)} className={"overflow-hidden rounded-lg border-2 " + (heroPhoto === photo.url ? "border-amber-500" : "border-transparent")}><img src={photo.url} alt="Bekijk productfoto" className="h-14 w-full object-cover" /></button>)}</div>}
              </div>
              <div className="p-5 sm:p-7">
                <h2 className="text-2xl font-extrabold leading-tight text-[#183651] sm:text-3xl">{selected.title}</h2>
                {selected.sponsor && <div className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-slate-700">Beschikbaar gesteld door <strong className="text-[#183651]">{selected.sponsor}</strong></div>}
                <div className="mt-5 whitespace-pre-wrap leading-relaxed text-slate-700">{selected.description || "Voorbeeldproduct voor de veiling."}</div>
                <div className="mt-6 rounded-2xl bg-[#f6f4ef] p-4">
                  <p className="text-sm text-slate-500">Hoogste bod</p>
                  <p className="text-3xl font-extrabold text-[#183651]">{euro(simulated[selected.id] ?? selected.current_bid)}</p>
                  <button onClick={() => tryBid(selected)} className="mt-4 w-full rounded-xl bg-amber-400 px-5 py-4 font-extrabold text-[#183651]">Testbod: {euro((simulated[selected.id] ?? selected.current_bid) + 1)}</button>
                  {notice && <p role="status" className="mt-3 rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-800">{notice}</p>}
                </div>
                {(selected.sponsor_website || selected.sponsor_facebook || selected.sponsor_instagram) && <div className="mt-5 border-t pt-4">
                  <p className="font-bold text-[#183651]">Meer over de sponsor</p>
                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-blue-800">
                    {selected.sponsor_website && <a href={selected.sponsor_website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
                    {selected.sponsor_facebook && <a href={selected.sponsor_facebook} target="_blank" rel="noopener noreferrer">Facebook ↗</a>}
                    {selected.sponsor_instagram && <a href={selected.sponsor_instagram} target="_blank" rel="noopener noreferrer">Instagram ↗</a>}
                  </div>
                </div>}
                <p className="mt-5 text-xs text-slate-500">Dit is een klikbaar ontwerpvoorbeeld. Er wordt niets opgeslagen en er worden geen e-mails verstuurd.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
