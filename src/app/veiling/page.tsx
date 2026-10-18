import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Veiling | Ontwikkelvoorbeeld",
  robots: { index: false, follow: false },
};
const lots = [
  { id: "001", name: "Luxe hondensnackpakket", sponsor: "Sponsor volgt", price: 15, symbol: "🦴" },
  { id: "002", name: "Verwenmand voor je hond", sponsor: "Sponsor volgt", price: 30, symbol: "🎁" },
  { id: "003", name: "Bulldog kerstornament", sponsor: "Sponsor volgt", price: 10, symbol: "🎄" },
  { id: "004", name: "Zachte hondendeken", sponsor: "Sponsor volgt", price: 12, symbol: "🐾" },
  { id: "005", name: "Hondenlijn en halsband", sponsor: "Sponsor volgt", price: 18, symbol: "🐕" },
];
const money = (n: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

export default function VeilingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f6] text-[#1a3a5c]">
      <section className="bg-[#1a3a5c] text-white px-5 pt-32 pb-16 text-center">
        <p className="uppercase tracking-widest text-amber-300 font-bold text-xs">Stichting Bulldog Steunfonds Nederland</p>
        <h1 className="font-display text-4xl sm:text-6xl font-bold mt-5">Samen bieden. Samen helpen.</h1>
        <p className="mt-5 max-w-xl mx-auto text-white/80">Een veiling voor bulldoggen die onze hulp hard nodig hebben.</p>
        <p className="mt-6 inline-block rounded-full border border-white/40 px-5 py-3 text-sm">
          15 november t/m 29 november 2026 · sluit om 20.00 uur
        </p>
        <p className="mt-4 text-xs text-amber-200">Ontwikkelvoorbeeld · bieden en registratie nog niet actief</p>
      </section>
      <section className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-wrap justify-between items-end gap-4 mb-7">
          <div><p className="text-xs font-semibold tracking-widest uppercase text-amber-700">Voorproefje</p><h2 className="font-display text-3xl font-bold">Onze veilingkavels</h2></div>
          <span className="text-sm text-slate-500">5 voorbeeldkavels</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {lots.map((lot) => (
            <article key={lot.id} className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
              <div className="relative h-48 bg-[#e8ecdf] flex items-center justify-center">
                <span className="text-7xl" role="img" aria-label="Voorbeeldafbeelding">{lot.symbol}</span>
                <span className="absolute top-3 left-3 bg-white px-3 py-1 text-xs rounded-lg font-bold">Kavel {lot.id}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold">{lot.name}</h3>
                <p className="text-sm text-slate-500 mt-1">{lot.sponsor}</p>
                <p className="text-xs text-slate-500 mt-5">Voorbeeldstartbod</p>
                <p className="text-2xl font-extrabold">{money(lot.price)}</p>
                <button disabled className="w-full mt-4 px-4 py-3 rounded-xl bg-[#1a3a5c] text-white font-bold opacity-60 cursor-not-allowed">Bieden binnenkort mogelijk</button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-display font-bold text-2xl">Zo gaat het straks werken</h2>
          <p className="mt-3 leading-relaxed">Je registreert één keer met je naam en e-mailadres. Daarna kun je op alle kavels bieden, je favoriete kavels volgen en een e-mail ontvangen wanneer iemand je overbiedt. Alle biedingen worden straks veilig in de database verwerkt.</p>
          <p className="mt-3 text-sm text-slate-500">Dit is uitsluitend een ontwerpvoorbeeld. Er worden nog geen accounts aangemaakt, biedingen opgeslagen of e-mails verstuurd.</p>
        </div>
        <Link href="/" className="inline-block mt-8 font-bold underline">Terug naar de stichting</Link>
      </section>
    </main>
  );
}
