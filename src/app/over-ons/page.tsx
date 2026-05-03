import type { Metadata } from "next";
import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Leer meer over Stichting Bulldog Steunfonds Nederland, onze missie, het bestuur en de vrijwilligers achter de stichting.",
};

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Over ons
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Met ons hart bij de hond én het baasje
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Geen grote organisatie met dure kantoren — maar een betrokken team van vrijwilligers 
              dat alles geeft voor bulldogs in nood.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Verhaal */}
      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <span className="accent-bar" />
              <h2 className="section-title mb-4">Ons verhaal</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Stichting Bulldog Steunfonds Nederland is ontstaan uit liefde voor bulldogs en uit 
                  het besef dat niet iedereen onverwachte medische kosten kan dragen. Wanneer een hond 
                  dringend hulp nodig heeft en de rekening simpelweg niet te betalen is, willen wij — 
                  samen met donateurs en supporters — het verschil maken.
                </p>
                <p>
                  We doen dat op een nuchtere, eerlijke manier: geen grote organisatie met dure kantoren, 
                  maar een betrokken team van vrijwilligers met hun hart bij de honden.
                </p>
                <p>
                  We zijn allemaal zelf bulldogliefhebbers en weten uit ervaring hoeveel ze voor je kunnen 
                  betekenen — én hoeveel zorgen het kan geven als er iets mis is.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-card p-6 border-l-4 border-accent">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Onze missie</h3>
                <p className="text-gray-600">
                  Bulldogs in Nederland helpen die medische zorg nodig hebben, terwijl de eigenaar het 
                  (tijdelijk) niet kan betalen. We richten ons op noodzakelijke zorg: operaties, 
                  onderzoeken en spoedbehandelingen.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-card p-6 border-l-4 border-primary">
                <h3 className="font-display font-bold text-primary text-xl mb-2">Hoe we werken</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  {[
                    "We beoordelen iedere hulpvraag zorgvuldig en persoonlijk",
                    "We betalen – waar mogelijk – rechtstreeks aan de dierenarts",
                    "We denken mee met eigenaren over de beste oplossing",
                    "We communiceren eerlijk over wat wel en niet mogelijk is",
                    "We delen gemaakte kosten en resultaten zo transparant mogelijk",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="font-display font-bold text-white text-xl mb-3">Stichtingsgegevens</h3>
                <div className="space-y-1.5 text-white/80 text-sm">
                  <p><strong className="text-white">Naam:</strong> Stichting Bulldog Steunfonds Nederland</p>
                  <p><strong className="text-white">KvK:</strong> 99058731</p>
                  <p><strong className="text-white">RSIN:</strong> 868772586</p>
                  <p><strong className="text-white">Adres:</strong> Van Rooijen-Plein 48, 3417 BM Montfoort</p>
                  <p><strong className="text-white">E-mail:</strong> info@stichtingbulldogsteunfondsnederland.nl</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bestuur */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Het bestuur</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              De stichting wordt geleid door een klein, betrokken bestuur dat volledig vrijwillig werkt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { naam: "Michiel Petersen", rol: "Voorzitter" },
              { naam: "Angela Terpstra", rol: "Secretaris" },
              { naam: "Anja Petersen", rol: "Penningmeester" },
              { naam: "Sander Cuijpers", rol: "Bestuurder" },
              { naam: "Esther Imanse", rol: "Bestuurder" },
            ].map((persoon) => (
              <div key={persoon.naam} className="card flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center shrink-0 text-xl">
                  🐾
                </div>
                <div>
                  <div className="font-semibold text-primary">{persoon.naam}</div>
                  <div className="text-sm text-gray-500">{persoon.rol}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Adviseurs & Vrijwilligers */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg rounded-2xl p-6">
              <h3 className="font-display font-bold text-primary text-lg mb-4">Adviseurs</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Financiële adviseurs / Toetsing</p>
                  <p className="text-gray-700 text-sm">Sandra Frowyn &amp; Rick Frowyn</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Medisch adviseur</p>
                  <p className="text-gray-700 text-sm">Yvette de Groot</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Herplaatsing &amp; Opvang</p>
                  <p className="text-gray-700 text-sm">Joyce van den Berg</p>
                </div>
              </div>
            </div>

            <div className="bg-bg rounded-2xl p-6">
              <h3 className="font-display font-bold text-primary text-lg mb-4">Vrijwilligers</h3>
              <div className="space-y-2">
                {["Madelon Kuijpers-Vrij", "Juultje Oomen", "Jenny van Eijk"].map((naam) => (
                  <div key={naam} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="text-accent">♥</span> {naam}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Kernwaarden */}
      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Onze kernwaarden</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🐾", title: "Zorg voor de hond", desc: "Het welzijn van de bulldog staat altijd centraal in alles wat we doen." },
              { icon: "🔍", title: "Eerlijk & transparant", desc: "We gaan zorgvuldig om met elke donatie en communiceren open over onze besluiten." },
              { icon: "🤝", title: "Menselijk & dichtbij", desc: "Achter elke aanvraag zit een verhaal. We kijken niet alleen naar de hond, maar ook naar de eigenaar." },
              { icon: "💚", title: "Volledig vrijwillig", desc: "Niemand in het bestuur verdient aan de stichting. Elke euro gaat naar de bulldogs." },
            ].map((val) => (
              <div key={val.title} className="card text-center">
                <div className="text-3xl mb-3">{val.icon}</div>
                <h3 className="font-display font-bold text-primary mb-2">{val.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Samen maken we het verschil
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Zonder donateurs, acties en mensen die onze stichting delen, kunnen we niets. 
            Met elkaar kunnen we juist heel veel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/doneren" className="btn-primary">
              <Heart size={16} />
              Doneer nu
            </Link>
            <Link href="/aanvragen" className="btn-outline-white">
              Hulp aanvragen <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
