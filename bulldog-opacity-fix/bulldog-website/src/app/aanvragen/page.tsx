import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Aanvragen",
  description:
    "Vraag financiële steun aan voor de veterinaire kosten van uw bulldog via ons online portaal.",
};

const requirements = [
  "U bent eigenaar van een buldogras (Engelse, Franse of Amerikaans bulldog)",
  "Uw bulldog heeft aantoonbare veterinaire zorg nodig",
  "U kunt de veterinaire kosten niet (volledig) zelf dragen",
  "U bent bereid documentatie te verstrekken (inkomensverklaring, veterinaire diagnose)",
  "U woont in Nederland",
];

const faq = [
  {
    q: "Hoelang duurt de beoordeling?",
    a: "Wij streven ernaar elke aanvraag binnen 5 werkdagen te beoordelen na ontvangst van alle benodigde documenten.",
  },
  {
    q: "Wat voor kosten worden vergoed?",
    a: "Wij vergoeden veterinaire kosten voor diagnose, behandeling en operaties. Preventieve zorg zoals vaccinaties vallen buiten de regeling.",
  },
  {
    q: "Betalen jullie rechtstreeks aan de dierenarts?",
    a: "Ja, bij goedkeuring betalen wij altijd rechtstreeks aan de erkende dierenarts. Zo weten we zeker dat de steun terechtkomt waar die nodig is.",
  },
  {
    q: "Kan ik meerdere keren een aanvraag indienen?",
    a: "Ja, dat is mogelijk. Elke aanvraag wordt afzonderlijk beoordeeld op basis van de situatie op dat moment.",
  },
  {
    q: "Mijn aanvraag is afgekeurd. Wat nu?",
    a: "U kunt contact opnemen om de reden te bespreken. Soms zijn aanvullende gegevens voldoende om de aanvraag toch te kunnen honoreren.",
  },
];

export default function AanvragenPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/aanvragen.png" alt="Bulldog" fill className="object-cover opacity-35" />
        </div>
        <div className="absolute inset-0 paw-bg opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Steun aanvragen
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Vraag financiële steun aan
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Is uw bulldog ziek en kunt u de veterinaire kosten niet betalen? 
              Dien een aanvraag in via ons portaal. Wij beoordelen uw aanvraag zorgvuldig en 
              snel.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Main CTA */}
      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Portal link */}
            <div className="bg-white rounded-3xl shadow-hover p-8 border-2 border-accent/20">
              <div className="w-16 h-16 bg-accent/15 rounded-2xl flex items-center justify-center mb-6">
                <FileText size={28} className="text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-primary mb-3">
                Aanvraag indienen via portaal
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Ons online portaal begeleidt u stap voor stap door het aanvraagproces. 
                U kunt documenten uploaden, de status volgen en berichten ontvangen.
              </p>
              <a
                href="https://bulldog-steunfonds-portaal.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-base"
              >
                Ga naar het portaal
                <ExternalLink size={16} />
              </a>
              <p className="text-xs text-gray-400 mt-3 text-center">
                U wordt doorgestuurd naar ons beveiligde aanvraagportaal
              </p>
            </div>

            {/* Requirements */}
            <div>
              <span className="accent-bar" />
              <h2 className="section-title mb-4">Wie kan aanvragen?</h2>
              <p className="text-gray-600 mb-6">
                Onze steun is bedoeld voor eigenaren die echt in de knel zitten. 
                Om in aanmerking te komen, moet u aan de volgende voorwaarden voldoen:
              </p>
              <ul className="space-y-3">
                {requirements.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-accent shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{req}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-4 bg-primary/6 rounded-xl flex gap-3">
                <AlertCircle size={18} className="text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-primary/80">
                  <strong className="text-primary">Let op:</strong> Wij kunnen niet in alle gevallen 
                  steun verlenen. De beschikbare middelen zijn beperkt en worden eerlijk verdeeld.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Wat kunt u verwachten?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: FileText, step: "Stap 1", title: "Aanvraag indienen", desc: "Vul het formulier volledig in en upload de gevraagde documenten via het portaal." },
              { icon: Clock, step: "Stap 2", title: "Beoordeling (5 werkdagen)", desc: "Ons team bekijkt uw aanvraag. We nemen contact op als we aanvullende informatie nodig hebben." },
              { icon: CheckCircle, step: "Stap 3", title: "Beslissing & betaling", desc: "U ontvangt per e-mail bericht. Bij goedkeuring betalen wij direct aan uw dierenarts." },
            ].map((item) => (
              <div key={item.step} className="card text-center">
                <div className="text-xs font-bold text-accent uppercase tracking-widest mb-2">{item.step}</div>
                <div className="w-12 h-12 bg-primary/8 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <item.icon size={20} className="text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="accent-bar mx-auto" />
            <h2 className="section-title mb-3">Veelgestelde vragen</h2>
          </div>
          <div className="space-y-4">
            {faq.map((item) => (
              <div key={item.q} className="bg-white rounded-2xl shadow-card p-6">
                <h3 className="font-semibold text-primary mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Heeft u een andere vraag?</p>
            <Link href="/contact" className="btn-secondary">
              Neem contact op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
