import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Transparantie & verantwoording",
  description:
    "Transparantie & verantwoording van Stichting Bulldog Steunfonds Nederland: stichtingsgegevens, bestuur, doelstelling, beloningsbeleid en financiële verantwoording.",
};

export default function AnbiPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Transparantie
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Transparantie & verantwoording
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Wij zijn op dit moment geen ANBI. Toch vinden wij openheid belangrijk. Daarom publiceren wij hier vrijwillig onze stichtingsgegevens, het bestuur, onze doelstelling, het beloningsbeleid en onze financiële verantwoording.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">

          {/* Algemene gegevens */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-5">1. Algemene gegevens</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: "Naam", value: "Stichting Bulldog Steunfonds Nederland" },
                { label: "RSIN", value: "868772586" },
                { label: "KvK-nummer", value: "99058731" },
                { label: "Adres", value: "Van Rooijen-Plein 48, 3417 BM Montfoort" },
                { label: "E-mail", value: "info@stichtingbulldogsteunfondsnederland.nl" },
                { label: "Website", value: "stichtingbulldogsteunfondsnederland.nl" },
              ].map((item) => (
                <div key={item.label} className="bg-bg rounded-xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                  <p className="font-semibold text-primary text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Doelstelling */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-4">2. Missie en huidige werkwijze</h2>
            <p className="text-gray-600 leading-relaxed">
              De stichting biedt financiële steun voor noodzakelijke operaties van bulldogs in Nederland wanneer hun eigenaren de kosten niet kunnen dragen. Onderzoeken, medicatie en nazorg die bij de operatie horen, kunnen onderdeel zijn van de steun. Wij bieden geen opvang en financieren geen euthanasie.
            </p>
          </div>

          {/* Bestuur */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-5">3. Bestuur</h2>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                { naam: "Michiel Petersen", rol: "Voorzitter" },
                { naam: "Mandy Willems", rol: "Secretaris" },
                { naam: "Anja Petersen", rol: "Penningmeester" },
                { naam: "Sander Cuijpers", rol: "Bestuurder" },
                { naam: "Esther Imanse", rol: "Bestuurder" },
              ].map((p) => (
                <div key={p.naam} className="flex items-center gap-3 bg-bg rounded-xl p-3">
                  <span className="text-accent text-lg">🐾</span>
                  <div>
                    <p className="font-semibold text-primary text-sm">{p.naam}</p>
                    <p className="text-xs text-gray-500">{p.rol}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-semibold text-primary mb-3">Adviseurs</h3>
            <div className="space-y-3 mb-6">
              <div className="bg-bg rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Financiële adviseurs / Toetsing</p>
                <p className="text-sm text-gray-700">Sandra Frowyn &amp; Rick Frowyn</p>
              </div>
              <div className="bg-bg rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Medisch adviseur</p>
                <p className="text-sm text-gray-700">AniCura Dierenkliniek Sleeuwijk</p>
              </div>
              <div className="bg-bg rounded-xl p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Advies over herplaatsing</p>
                <p className="text-sm text-gray-700">Joyce van den Berg</p>
              </div>
            </div>

            <h3 className="font-semibold text-primary mb-3">Vrijwilligers</h3>
            <div className="flex flex-wrap gap-2">
              {["Madelon Kuijpers-Vrij", "Juultje Oomen", "Jenny van Eijk"].map((naam) => (
                <span key={naam} className="bg-accent/10 text-primary text-sm px-3 py-1.5 rounded-lg">
                  {naam}
                </span>
              ))}
            </div>
          </div>

          {/* Beloningsbeleid */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-4">4. Beloningsbeleid</h2>
            <p className="text-gray-600 leading-relaxed">
              Het bestuur ontvangt geen beloning of salaris. Alleen aantoonbare, noodzakelijke onkosten 
              kunnen worden vergoed. Vrijwilligers ontvangen geen vergoeding.
            </p>
          </div>

          {/* Activiteiten */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-4">5. Activiteiten</h2>
            <p className="text-gray-600 leading-relaxed">
              De stichting beoordeelt aanvragen voor medische steun, zorgt voor financiële afhandeling, 
              organiseert fondsenwerving (veilingen, loterijen, acties), biedt voorlichting en onderhoudt 
              contacten met dierenartsen en andere partners.
            </p>
          </div>

          {/* Financiële verantwoording */}
          <div className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-display font-bold text-primary text-2xl mb-4">6. Financiële verantwoording</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Wij streven naar een zo transparant mogelijke financiële verantwoording. Hieronder staat de actuele tussenstand van de bedragen die via acties, evenementen en donaties voor de stichting zijn binnengekomen.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-accent/10 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">🏆</div>
                <div className="font-display font-bold text-primary text-2xl">€ 2.074,45</div>
                <div className="text-xs text-gray-500 mt-1">Acties & evenementen</div>
              </div>
              <div className="bg-primary/5 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">💛</div>
                <div className="font-display font-bold text-primary text-2xl">€ 2.295,00</div>
                <div className="text-xs text-gray-500 mt-1">Donaties & doneeracties</div>
              </div>
              <div className="bg-primary/5 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-1">🐾</div>
                <div className="font-display font-bold text-primary text-2xl">6</div>
                <div className="text-xs text-gray-500 mt-1">Bulldogs geholpen / ondersteund</div>
              </div>
            </div>

            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Deze bedragen zijn een tussenstand. Nieuwe acties, donaties en hulpvragen worden doorlopend verwerkt. Bij goedgekeurde medische steun betalen wij rechtstreeks aan de dierenarts.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/acties" className="btn-secondary inline-flex">
                Bekijk acties & opbrengsten
              </Link>
              <Link href="/beleidsplan-2025-2028" className="btn-secondary inline-flex">
                📄 Bekijk het actuele beleidsplan
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h3 className="font-display font-bold text-white text-2xl mb-3">
              Heeft u nog vragen over onze verantwoording?
            </h3>
            <p className="text-white/80 mb-6">
              Wij zijn volledig transparant over hoe we met donaties omgaan. Neem gerust contact op.
            </p>
            <Link href="/contact" className="btn-primary">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
