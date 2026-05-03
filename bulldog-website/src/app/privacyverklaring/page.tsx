import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring",
  description:
    "Privacyverklaring van Stichting Bulldog Steunfonds Nederland. Hoe wij omgaan met uw persoonsgegevens.",
};

export default function PrivacyverklaringPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
            Privacyverklaring
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Hoe wij omgaan met uw gegevens
          </h1>
          <p className="text-white/80 text-lg">
            Stichting Bulldog Steunfonds Nederland neemt uw privacy serieus.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 prose prose-gray max-w-none">
            <p className="text-gray-500 text-sm mb-8">
              Versie: 1.0 · Datum: januari 2024
            </p>

            <div className="space-y-8">
              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">1. Wie zijn wij?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Stichting Bulldog Steunfonds Nederland (KvK: 99058731) is verantwoordelijk voor de 
                  verwerking van persoonsgegevens zoals beschreven in deze privacyverklaring. U kunt 
                  contact opnemen via{" "}
                  <a href="mailto:info@stichtingbulldogsteunfondsnederland.nl" className="text-primary hover:underline">
                    info@stichtingbulldogsteunfondsnederland.nl
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">2. Welke gegevens verwerken wij?</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Wij verwerken persoonsgegevens wanneer u gebruik maakt van onze diensten of wanneer 
                  u deze gegevens zelf aan ons verstrekt. De volgende persoonsgegevens kunnen worden verwerkt:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Voor- en achternaam</li>
                  <li>E-mailadres</li>
                  <li>Adresgegevens</li>
                  <li>Telefoonnummer (optioneel)</li>
                  <li>Informatie over uw bulldog (naam, ras, leeftijd, diagnose)</li>
                  <li>Financiële gegevens voor het beoordelen van aanvragen (inkomensverklaring)</li>
                  <li>Veterinaire gegevens (diagnose, behandelplan)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">3. Waarom verwerken wij uw gegevens?</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Wij verwerken uw gegevens voor de volgende doeleinden:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Het verwerken en beoordelen van aanvragen voor financiële steun</li>
                  <li>Communicatie over uw aanvraag of donatie</li>
                  <li>Het verwerken van donaties</li>
                  <li>Het voldoen aan wettelijke verplichtingen</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">4. Hoe lang bewaren wij uw gegevens?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Wij bewaren uw persoonsgegevens niet langer dan strikt nodig is om de doelen te realiseren 
                  waarvoor uw gegevens worden verzameld. Aanvraaggegevens bewaren wij maximaal 7 jaar na 
                  afhandeling van de aanvraag, conform wettelijke bewaarplichten.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">5. Delen wij uw gegevens?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Wij verkopen uw gegevens niet aan derden. Uw gegevens worden alleen gedeeld met de 
                  behandelend dierenarts (uitsluitend de gegevens die nodig zijn voor de betaling en 
                  behandeling) en eventueel met onze verwerkers (zoals IT-dienstverleners) die gebonden 
                  zijn aan verwerkersovereenkomsten.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">6. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Onze website maakt gebruik van functionele cookies die strikt noodzakelijk zijn voor 
                  het functioneren van de website. Wij plaatsen geen tracking- of analytische cookies 
                  zonder uw toestemming.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">7. Uw rechten</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  U heeft de volgende rechten met betrekking tot uw persoonsgegevens:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                  <li>Recht op inzage in uw persoonsgegevens</li>
                  <li>Recht op correctie van onjuiste gegevens</li>
                  <li>Recht op verwijdering van uw gegevens</li>
                  <li>Recht op beperking van de verwerking</li>
                  <li>Recht op dataportabiliteit</li>
                  <li>Recht om bezwaar te maken tegen de verwerking</li>
                </ul>
                <p className="text-gray-600 text-sm mt-3">
                  U kunt uw rechten uitoefenen door contact op te nemen via{" "}
                  <a href="mailto:info@stichtingbulldogsteunfondsnederland.nl" className="text-primary hover:underline">
                    info@stichtingbulldogsteunfondsnederland.nl
                  </a>. 
                  Wij reageren binnen 4 weken op uw verzoek.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">8. Beveiliging</h2>
                <p className="text-gray-600 leading-relaxed">
                  Wij nemen de bescherming van uw gegevens serieus en nemen passende maatregelen om 
                  misbruik, verlies, onbevoegde toegang, ongewenste openbaarmaking en ongeoorloofde 
                  wijziging tegen te gaan.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">9. Klachten</h2>
                <p className="text-gray-600 leading-relaxed">
                  Heeft u een klacht over de verwerking van uw persoonsgegevens? Neem dan contact met 
                  ons op. U heeft ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens 
                  via{" "}
                  <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    autoriteitpersoonsgegevens.nl
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="font-display font-bold text-primary text-2xl mb-3">10. Wijzigingen</h2>
                <p className="text-gray-600 leading-relaxed">
                  Stichting Bulldog Steunfonds Nederland behoudt zich het recht voor deze privacyverklaring 
                  te wijzigen. Wijzigingen worden op deze pagina gepubliceerd met vermelding van de datum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
