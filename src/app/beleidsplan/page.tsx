import type { Metadata } from "next";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";

export const metadata: Metadata = {
  title: "Beleidsplan 2025-2028",
  description:
    "Geactualiseerd beleidsplan 2025-2028 van Stichting Bulldog Steunfonds Nederland, versie 2 oktober 2026.",
};

const bestuur = [
  ["Voorzitter", "Michiel Petersen"],
  ["Secretaris", "Mandy Willems"],
  ["Penningmeester", "Anja Petersen"],
  ["Bestuurder", "Sander Cuijpers"],
  ["Bestuurder", "Esther Imanse"],
];

export default function BeleidsplanPage() {
  return (
    <>
      <section className="pt-28 pb-14 bg-primary print:bg-white print:pt-6 print:pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20 print:hidden">
            Transparantie
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white print:text-primary mb-3">
            Beleidsplan 2025-2028
          </h1>
          <p className="text-white/80 print:text-gray-600 text-lg">
            Stichting Bulldog Steunfonds Nederland
          </p>
          <p className="text-white/60 print:text-gray-500 text-sm mt-2">
            Geactualiseerde versie - 2 oktober 2026
          </p>
        </div>
      </section>

      <main className="py-12 bg-bg print:bg-white print:py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap gap-3 mb-8 print:hidden">
            <Link href="/anbi" className="btn-secondary">
              ← Terug naar transparantie
            </Link>
            <PrintButton />
          </div>

          <article className="bg-white rounded-2xl shadow-card p-6 md:p-10 space-y-9 print:shadow-none print:p-0">
            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">Voorwoord</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Voor u ligt het beleidsplan van Stichting Bulldog Steunfonds Nederland voor de periode 2025-2028. Dit document geeft inzicht in de doelstellingen, werkwijze, financiële kaders en toekomstplannen van de stichting. Als organisatie zetten wij ons in voor het ondersteunen van eigenaren van bulldograssen die financiële hulp nodig hebben voor noodzakelijke medische zorg. Transparantie, zorgvuldigheid en professionaliteit staan hierbij centraal.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Het bestuur ziet dit beleidsplan als leidraad voor de komende jaren en als instrument om onze maatschappelijke doelstelling zo effectief mogelijk te realiseren. Dit document is in oktober 2026 geactualiseerd om de actuele samenstelling van het bestuur, de huidige werkwijze en de status van de stichting correct weer te geven.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-4">1. Gegevens van de stichting</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  ["Naam", "Stichting Bulldog Steunfonds Nederland"],
                  ["Rechtsvorm", "Stichting"],
                  ["RSIN", "868772586"],
                  ["KvK-nummer", "99058731"],
                  ["Adres", "Van Rooijen-Plein 48, 3417 BM Montfoort"],
                  ["E-mail", "info@stichtingbulldogsteunfondsnederland.nl"],
                  ["Website", "www.stichtingbulldogsteunfondsnederland.nl"],
                  ["ANBI-status", "De stichting is op dit moment geen ANBI."],
                ].map(([label, value]) => (
                  <div key={label} className="bg-bg rounded-xl p-4 print:border print:border-gray-200">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</p>
                    <p className="font-semibold text-primary text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">2. Doelstelling</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                De stichting ondersteunt eigenaren van bulldograssen in Nederland die de kosten van een noodzakelijke operatie voor hun hond niet zelf kunnen dragen. Onderzoeken, medicatie en nazorg die direct samenhangen met de operatie kunnen onderdeel zijn van de toegekende steun.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nieuwe aanvragen worden beoordeeld op basis van de medische noodzaak, de financiële situatie van de eigenaar en de beschikbare middelen van de stichting. De stichting biedt geen opvang en financiert geen euthanasie. Eerder aangegane, lopende ondersteuningsafspraken kunnen worden voortgezet volgens de gemaakte afspraken.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">3. Activiteiten</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Beoordelen van aanvragen voor financiële steun bij noodzakelijke operaties.</li>
                <li>Beoordelen van inkomen, vaste lasten, beschikbare eigen middelen en de raming van de dierenarts.</li>
                <li>Betalen van toegekende medische kosten rechtstreeks aan de dierenarts.</li>
                <li>Organiseren van fondsenwervende activiteiten, waaronder veilingen, loterijen, evenementen, sponsoracties en verkoopacties.</li>
                <li>Voorlichting via website en sociale media over bulldoggezondheid, verantwoord eigenaarschap en het werk van de stichting.</li>
                <li>Samenwerken en contacten onderhouden met dierenartsen, bedrijven, vrijwilligers, donateurs en andere relevante partners.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">4. Beoogde resultaten</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Zoveel mogelijk bulldogs ondersteunen binnen de actuele doelstelling en beschikbare middelen.</li>
                <li>Vergroten van naamsbekendheid, bereik en betrokkenheid.</li>
                <li>Opbouwen van een gezonde financiële reserve voor toekomstige hulpvragen.</li>
                <li>Bevorderen van verantwoord hondenbezit en tijdige medische zorg door middel van voorlichting.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">5. Fondsenwerving en inkomsten</h2>
              <p className="text-gray-700 leading-relaxed">
                De stichting ontvangt inkomsten uit donaties, doneeracties, loterijen, veilingen, evenementen, sponsorbijdragen, bedrijven, nalatenschappen en verkoop van artikelen waarvan de opbrengst ten goede komt aan het werk van de stichting. Fondsenwervende activiteiten worden zo transparant mogelijk gecommuniceerd via de website en sociale media.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">6. Financieel beheer</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                De penningmeester beheert de financiële administratie en zorgt voor een zorgvuldige registratie van inkomsten en uitgaven. De stichting streeft naar open en controleerbare verslaglegging. Financiële tussenstanden, acties en behaalde resultaten worden periodiek gepubliceerd in het kader van transparantie.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bij goedgekeurde medische steun wordt het toegekende bedrag niet aan de eigenaar uitbetaald, maar rechtstreeks aan de behandelend dierenarts. Daarmee waarborgt de stichting dat de middelen daadwerkelijk worden besteed aan het doel waarvoor de steun is toegekend.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-4">7. Bestuur en beloningsbeleid</h2>
              <div className="overflow-x-auto mb-5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 pr-4 text-primary">Functie</th>
                      <th className="py-2 text-primary">Naam</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestuur.map(([functie, naam]) => (
                      <tr key={functie + naam} className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-600">{functie}</td>
                        <td className="py-2 font-medium text-gray-800">{naam}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Het bestuur ontvangt geen beloning of salaris. Alleen aantoonbare, noodzakelijke onkosten die in het belang van de stichting zijn gemaakt, kunnen worden vergoed. Vrijwilligers ontvangen geen salaris voor hun inzet.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">8. Aanvraagprocedure</h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                <li>De aanvrager dient het aanvraagformulier, de benodigde financiële gegevens en informatie van de dierenarts in.</li>
                <li>De stichting beoordeelt de medische noodzaak, de financiële situatie van de eigenaar en de kostenraming.</li>
                <li>Indien nodig kan aanvullende informatie worden opgevraagd bij de aanvrager of dierenarts.</li>
                <li>Bij goedkeuring stelt de stichting het toegekende bedrag vast en betaalt dit rechtstreeks aan de dierenarts.</li>
                <li>Een aanvraag kan worden afgewezen wanneer deze buiten de actuele doelstelling valt, onvoldoende onderbouwd is of wanneer de beschikbare middelen ontoereikend zijn.</li>
              </ol>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">9. Vermogensbeleid</h2>
              <p className="text-gray-700 leading-relaxed">
                De stichting houdt uitsluitend een beperkte reserve aan die nodig is voor continuïteit en toekomstige hulpvragen. Overige beschikbare middelen worden, binnen de doelstelling en na zorgvuldige beoordeling, ingezet voor het ondersteunen van bulldogs.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">10. Communicatie en transparantie</h2>
              <p className="text-gray-700 leading-relaxed">
                Via de website, sociale media, financiële updates, actie-overzichten en toekomstige jaarverslagen communiceert de stichting actief over haar werkzaamheden, inkomsten, bestedingen en behaalde resultaten. De stichting is op dit moment geen ANBI, maar kiest er vrijwillig voor om haar werkwijze en financiële verantwoording zo transparant mogelijk openbaar te maken.
              </p>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">11. Toekomstplannen 2025-2028</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Professionaliseren van fondsenwerving en administratieve processen.</li>
                <li>Verder opbouwen van een landelijk netwerk van dierenartsen en relevante partners.</li>
                <li>Jaarlijks terugkerende acties en evenementen organiseren.</li>
                <li>Verdere uitbreiding en ondersteuning van vrijwilligers en ambassadeurs.</li>
                <li>De publieke verantwoording en informatievoorziening verder verbeteren.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display font-bold text-primary text-2xl mb-3">12. Vaststelling</h2>
              <p className="text-gray-700 leading-relaxed">
                Dit geactualiseerde beleidsplan is vastgesteld als actuele leidraad voor Stichting Bulldog Steunfonds Nederland en vervangt voor zover nodig eerdere, niet meer actuele onderdelen van het beleidsplan 2025-2028.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
