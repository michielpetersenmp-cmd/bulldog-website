import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Facebook, Globe2, HeartHandshake } from "lucide-react";
import { donateurs } from "@/lib/donateurs";

export const metadata: Metadata = {
  title: "Donateurs & bedrijfsvrienden",
  description:
    "Maak kennis met de bedrijven en organisaties die Stichting Bulldog Steunfonds Nederland een warm hart toedragen.",
};

export default function DonateursPage() {
  return (
    <>
      <section className="pt-28 pb-16 bg-primary">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
            Samen maken we verschil
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Bedrijven die ons een warm hart toedragen
          </h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Onze bedrijfsvrienden, sponsoren en donateurs helpen ons om bulldogs en hun baasjes te ondersteunen.
            Op deze pagina geven we hen graag de aandacht die zij verdienen.
          </p>
        </div>
      </section>

      <main className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {donateurs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {donateurs.map((donateur) => (
                <article key={donateur.slug} className="bg-white rounded-3xl shadow-card overflow-hidden flex flex-col">
                  <div className="h-52 bg-gray-50 relative flex items-center justify-center">
                    {donateur.logo ? (
                      <Image
                        src={donateur.logo}
                        alt={donateur.naam}
                        fill
                        className="object-contain p-8"
                      />
                    ) : donateur.afbeelding ? (
                      <Image
                        src={donateur.afbeelding}
                        alt={donateur.naam}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <HeartHandshake size={72} className="text-accent" />
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display font-bold text-primary text-2xl mb-2">
                      {donateur.naam}
                    </h2>
                    {donateur.plaats && (
                      <p className="text-sm text-gray-400 mb-3">{donateur.plaats}</p>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">
                      {donateur.korteOmschrijving}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {donateur.website && (
                        <a
                          href={donateur.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 px-3 py-2 rounded-lg"
                        >
                          <Globe2 size={14} /> Website
                        </a>
                      )}
                      {donateur.facebook && (
                        <a
                          href={donateur.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/5 px-3 py-2 rounded-lg"
                        >
                          <Facebook size={14} /> Facebook
                        </a>
                      )}
                    </div>

                    <Link href={`/donateurs/${donateur.slug}`} className="btn-primary w-full justify-center">
                      Lees hun verhaal <ExternalLink size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-card p-8 md:p-12 text-center max-w-3xl mx-auto">
              <HeartHandshake size={56} className="text-accent mx-auto mb-5" />
              <h2 className="font-display font-bold text-primary text-2xl mb-3">
                Onze bedrijfsvrienden krijgen hier hun eigen plek
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Deze nieuwe pagina wordt gevuld met bedrijven en organisaties die onze stichting steunen.
                Iedere donateur krijgt een eigen presentatie met uitleg over het bedrijf, hun bijdrage en links
                naar de website en sociale media.
              </p>
              <Link href="/contact" className="btn-primary">
                Ook bedrijfsvriend worden
              </Link>
            </div>
          )}

          <section className="mt-16 bg-primary rounded-3xl p-8 md:p-10 text-white">
            <div className="max-w-3xl">
              <h2 className="font-display font-bold text-3xl mb-3">
                Draagt uw bedrijf onze bulldogs een warm hart toe?
              </h2>
              <p className="text-white/75 leading-relaxed mb-6">
                Bedrijven kunnen ons helpen met een financiële bijdrage, producten, prijzen voor acties,
                materialen, diensten of andere vormen van ondersteuning. Als dank zetten wij onze bedrijfsvrienden
                graag zichtbaar in het zonnetje.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-5 py-3 rounded-xl">
                Neem contact met ons op
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
