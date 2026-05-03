import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Heart, FileText, Shield, ChevronRight, AlertTriangle, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Stichting Bulldog Steunfonds Nederland ondersteunt bulldogs in nood met noodzakelijke medische zorg en financiële hulp. Eerlijk, transparant en met ons hart bij de hond.",
};

const steps = [
  {
    icon: FileText,
    title: "1. Formulier invullen",
    desc: "Vul het aanvraagformulier zo volledig mogelijk in, bij voorkeur met een offerte of factuur van de dierenarts.",
  },
  {
    icon: Shield,
    title: "2. Wij nemen contact op",
    desc: "We bespreken de situatie persoonlijk, stellen eventueel vragen en kijken samen naar de beste oplossing voor uw hond.",
  },
  {
    icon: Heart,
    title: "3. Besluit & ondersteuning",
    desc: "Als we kunnen helpen, doen we dat bij voorkeur door rechtstreeks aan de dierenarts te betalen.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/hero.png" alt="Bulldogs" fill className="object-cover opacity-25" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/60" />
        <div className="absolute inset-0 paw-bg opacity-10" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-accent/20">
              <Heart size={14} />
              Officieel geregistreerde stichting · KvK 99058731
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Bulldogs in nood —<br />
              <span className="text-accent">wij zijn er voor ze</span>
            </h1>

            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Stichting Bulldog Steunfonds Nederland ondersteunt bulldogs die medische zorg nodig hebben, 
              terwijl de eigenaar het (tijdelijk) niet kan betalen. Eerlijk, transparant en met ons hart 
              bij de hond én het baasje.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/aanvragen" className="btn-primary text-base">
                <FileText size={18} />
                Hulp aanvragen
              </Link>
              <Link href="/doneren" className="btn-outline-white text-base">
                <Heart size={18} />
                Steun ons werk
              </Link>
            </div>
          </div>
        </div>

        {/* Spoed banner */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center px-4">
          <a
            href="mailto:hulpaanvraag@stichtingbulldogsteunfondsnederland.nl?subject=SPOED"
            className="flex items-center gap-3 bg-red-600/90 backdrop-blur-sm text-white px-5 py-3 rounded-xl text-sm font-semibold shadow-lg hover:bg-red-700 transition-colors"
          >
            <AlertTriangle size={16} />
            Spoed? Mail direct naar hulpaanvraag@stichtingbulldogsteunfondsnederland.nl met onderwerp SPOED
          </a>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 20C480 40 240 80 0 40L0 80Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Wie wij zijn */}
      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="accent-bar" />
              <h2 className="section-title mb-4">Wie wij zijn</h2>
              <p className="section-subtitle mb-4">
                Stichting Bulldog Steunfonds Nederland is ontstaan uit liefde voor bulldogs.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We zien regelmatig honden die hulp nodig hebben, terwijl de eigenaar het (tijdelijk) 
                niet kan betalen. Dan willen wij er zijn: eerlijk, transparant en met ons hart bij de 
                hond én het baasje.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Dankzij donateurs, acties en onze shop kunnen wij bijdragen aan operaties, onderzoeken 
                en andere medische behandelingen die simpelweg niet kunnen wachten. Geen grote organisatie 
                met dure kantoren — maar een betrokken team van vrijwilligers.
              </p>
              <Link href="/over-ons" className="btn-secondary">
                Lees meer over ons <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { icon: "🏥", title: "Spoedoperaties", desc: "Bij maagtorsie, keizersnede of een andere spoedoperatie kijken wij mee wat we kunnen bijdragen als er geen financiële ruimte is." },
                { icon: "🔬", title: "Onderzoeken & scans", desc: "Röntgenfoto's, echo's en bloedonderzoek zijn vaak duur maar noodzakelijk. Ook daarbij kan het steunfonds helpen." },
                { icon: "💊", title: "Herstel & nazorg", desc: "Na een behandeling zijn soms controles, medicijnen of extra zorg nodig. Waar mogelijk kijken we mee naar ondersteuning." },
                { icon: "💙", title: "Rechtstreeks betalen", desc: "Bij goedkeuring betalen wij direct aan de dierenarts. Zo weten we zeker dat de steun terechtkomt waar die nodig is." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-hover transition-all duration-300">
                  <div className="text-2xl shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-semibold text-primary mb-1">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vito spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl border border-accent/20 p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-2xl mb-3">💛</div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-primary mb-3">
                  Help Vito — samen zorgen we dat hij krijgt wat hij nodig heeft
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Vito is een lieve bulldog die door omstandigheden extra ondersteuning nodig heeft. 
                  Zijn baasje kwam onverwacht in een situatie terecht waarin de kosten voor zorg niet 
                  langer te dragen waren.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Vanuit de stichting ondersteunen wij Vito met het juiste voer en, waar nodig, met 
                  de medicatie die hij nodig heeft om zich goed te blijven voelen. Zo zorgen we dat 
                  Vito thuis kan blijven, in zijn vertrouwde omgeving.
                </p>
                <blockquote className="border-l-4 border-accent pl-4 italic text-gray-600 mb-6">
                  "Dat is waar wij voor staan: helpen waar het nodig is, met aandacht voor zowel hond als mens."
                </blockquote>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="https://tikkie.me/pay/Stichti4535/meUy1FHvYzrfr7pdxEbL8r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <Heart size={16} />
                    Doneer via Tikkie
                    <ExternalLink size={14} />
                  </a>
                  <Link href="/doneren" className="btn-secondary">
                    Naar donatiepagina
                  </Link>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-card p-6">
                <p className="text-sm text-gray-500 mb-1">Doneren via overschrijving</p>
                <p className="text-xs text-gray-400 mb-3">Vermeld bij omschrijving: <strong>Vito</strong></p>
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-gray-400">IBAN</span>
                    <p className="font-mono font-bold text-primary text-lg">NL94ABNA0150272529</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">T.n.v.</span>
                    <p className="font-semibold text-gray-700 text-sm">Stichting Bulldog Steunfonds Nederland</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 border-t border-gray-100 pt-4">
                  🐾 Namens Vito, zijn baasje en ons hele team: dank je wel voor jullie steun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Hoe werkt het?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              In drie stappen helpen wij u en uw bulldog op weg naar de zorg die nodig is.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="card text-center relative">
                <div className="w-14 h-14 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <step.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-display font-bold text-primary text-lg mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent text-xl z-10">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/aanvragen" className="btn-primary">
              <FileText size={18} />
              Hulp aanvragen
            </Link>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Wat u kunt doen</h2>
            <p className="section-subtitle">Elke bijdrage, groot of klein, helpt ons om bulldogs de zorg te geven die ze verdienen.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "💶", title: "Doneren", desc: "Eenmalig of regelmatig bijdragen aan ons medische hulpfonds. Elke euro gaat direct naar bulldogs in nood.", href: "/doneren", cta: "Doneer nu" },
              { icon: "🛍️", title: "Shop & Steun", desc: "Kleurboeken, merchandise en andere artikelen — gekocht via onze shop steun je direct de stichting.", href: "https://stichtingbulldogsteunfondsnederland.nl/shop.html", cta: "Naar de shop", external: true },
              { icon: "📣", title: "Delen", desc: "Vertel anderen over onze stichting en acties. Meer bekendheid betekent meer steun voor meer bulldogs.", href: "/over-ons", cta: "Lees meer" },
            ].map((item) => (
              <div key={item.title} className="card text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-primary text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-5 leading-relaxed">{item.desc}</p>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                    {item.cta} <ExternalLink size={14} />
                  </a>
                ) : (
                  <Link href={item.href} className="btn-secondary text-sm">
                    {item.cta} <ChevronRight size={14} />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Fotogalerij */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-2">Onze bulldogs</h2>
            <p className="section-subtitle">Elk met een eigen verhaal, elk de moeite waard</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 col-span-2">
              <Image src="/foto1.png" alt="Bulldog rustend" fill className="object-cover" />
            </div>
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
              <Image src="/foto2.png" alt="Bulldog spelend" fill className="object-cover" />
            </div>
            <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
              <Image src="/vito.png" alt="Vito" fill className="object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-3">
                <span className="text-white text-xs font-bold">💛 Vito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Samen maken we het verschil
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Zonder donateurs, acties en mensen die onze stichting delen, kunnen we niets. 
            Met elkaar kunnen we juist heel veel: rekeningen betalen, levens redden en eigenaren 
            een beetje lucht geven in een moeilijke periode.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/doneren" className="btn-primary">
              <Heart size={18} />
              Steun ons
            </Link>
            <Link href="/aanvragen" className="btn-outline-white">
              <FileText size={18} />
              Hulp aanvragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
