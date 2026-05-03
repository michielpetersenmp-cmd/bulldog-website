import type { Metadata } from "next";
import Link from "next/link";
import { Heart, CreditCard, Building2, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Doneren",
  description:
    "Steun Stichting Bulldog Steunfonds Nederland. De volledige opbrengst gaat naar ons medische hulpfonds voor bulldogs in nood.",
};

const besteding = [
  { icon: "🏥", title: "Medische behandelingen", desc: "Operaties, spoedzorg, gebitsbehandelingen, luchtwegproblemen en meer." },
  { icon: "🔬", title: "Diagnostiek", desc: "Röntgenfoto's, echo's, bloedonderzoek en andere noodzakelijke onderzoeken." },
  { icon: "💊", title: "Nazorg & herstel", desc: "Medicatie, controlebezoeken en ondersteunende zorg na een behandeling." },
  { icon: "🏠", title: "Bijzondere gevallen", desc: "Opvang- of herplaatsingskosten wanneer dit medisch noodzakelijk is." },
];

export default function DonerenPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              <Heart size={14} /> Doneren
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Steun een bulldog in nood
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Met uw donatie helpt u rechtstreeks een bulldog die medische zorg nodig heeft.
              Soms maken we het verschil tussen wel of geen behandeling. Elke bijdrage telt.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tikkie */}
            <div className="card border-2 border-accent/30 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-2 py-1 rounded-full">Snel & makkelijk</div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-accent/15 rounded-xl flex items-center justify-center text-2xl">💛</div>
                <div>
                  <h2 className="font-display font-bold text-primary text-xl">Doneer via Tikkie</h2>
                  <p className="text-gray-500 text-sm">In één klik geregeld</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                De makkelijkste manier om bij te dragen. Via Tikkie kunt u snel en veilig een bedrag naar keuze overmaken — rechtstreeks naar ons medische hulpfonds.
              </p>
              <a href="https://tikkie.me/pay/Stichti4535/meUy1FHvYzrfr7pdxEbL8r" target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center">
                <Heart size={16} /> Open Tikkie donatie <ExternalLink size={14} />
              </a>
            </div>

            {/* Bank */}
            <div className="card border-2 border-primary/10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center">
                  <CreditCard size={22} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-primary text-xl">Bankoverschrijving</h2>
                  <p className="text-gray-500 text-sm">Eenmalig of periodiek</p>
                </div>
              </div>
              <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                Maak een bedrag over naar onze bankrekening. Vermeld uw naam en eventueel waarvoor u doneert.
              </p>
              <div className="bg-primary/6 rounded-xl p-4">
                <p className="text-xs text-gray-500 mb-1 font-medium">IBAN</p>
                <p className="font-mono font-bold text-primary text-xl tracking-wide">NL94ABNA0150272529</p>
                <p className="text-xs text-gray-500 mt-2">T.n.v. Stichting Bulldog Steunfonds Nederland</p>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                Stel ook een periodieke overboeking in voor een vaste maandelijkse bijdrage.
              </p>
            </div>
          </div>

          {/* Shop */}
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="text-4xl shrink-0">🛍️</div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-primary text-xl mb-1">Steun via onze shop</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Kleurboeken, merchandise en andere artikelen — elke aankoop draagt direct bij aan ons medische hulpfonds.
              </p>
            </div>
            <a href="https://stichtingbulldogsteunfondsnederland.nl/shop.html" target="_blank" rel="noopener noreferrer" className="btn-secondary shrink-0">
              Naar de shop <ExternalLink size={14} />
            </a>
          </div>

          {/* Bedrijf */}
          <div className="bg-white rounded-2xl shadow-card p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center shrink-0">
              <Building2 size={26} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-display font-bold text-primary text-xl mb-1">Bedrijfsdonatie of sponsoring</h3>
              <p className="text-gray-600 text-sm">Wilt u als bedrijf bijdragen? Wij bespreken graag een samenwerking op maat.</p>
            </div>
            <Link href="/contact" className="btn-secondary shrink-0">Contact opnemen</Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Wat doet uw donatie?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              De volledige opbrengst gaat naar ons medische hulpfonds. Het bestuur en de vrijwilligers ontvangen geen enkele beloning; elke euro wordt besteed aan bulldogs in nood.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {besteding.map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="accent-bar mx-auto" />
          <h2 className="section-title mb-4">Uw steun maakt écht verschil</h2>
          <p className="section-subtitle mb-8 max-w-2xl mx-auto">
            Dankzij donateurs zijn er al meerdere bulldogs geholpen die anders geen kans hadden gehad. Uw bijdrage — groot of klein — komt altijd op een plek terecht waar het écht nodig is.
          </p>
          <Link href="/anbi" className="btn-secondary">Bekijk onze ANBI-informatie</Link>
        </div>
      </section>
    </>
  );
}
