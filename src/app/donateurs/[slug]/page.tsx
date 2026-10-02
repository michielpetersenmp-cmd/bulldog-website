import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Facebook, Globe2, HeartHandshake, MapPin } from "lucide-react";
import { getDonateurs, getDonateur } from "@/lib/donateurs";

export const revalidate = 60;

export async function generateStaticParams() {
  const donateurs = await getDonateurs();
  return donateurs.map((donateur) => ({ slug: donateur.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const donateur = await getDonateur(slug);

  if (!donateur) return { title: "Donateur" };

  return {
    title: donateur.naam,
    description: donateur.korteOmschrijving,
  };
}

export default async function DonateurDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const donateur = getDonateur(slug);

  if (!donateur) notFound();

  return (
    <>
      <section className="pt-28 pb-14 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/donateurs" className="text-accent text-sm font-semibold inline-block mb-5">
            ← Terug naar alle donateurs
          </Link>

          <div className="grid md:grid-cols-[220px_1fr] gap-8 items-center">
            <div className="bg-white rounded-3xl h-52 relative overflow-hidden shadow-card">
              {donateur.logo ? (
                <Image src={donateur.logo} alt={donateur.naam} fill className="object-contain p-6" />
              ) : donateur.afbeelding ? (
                <Image src={donateur.afbeelding} alt={donateur.naam} fill className="object-cover" />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <HeartHandshake size={72} className="text-accent" />
                </div>
              )}
            </div>

            <div>
              <span className="inline-block bg-accent/15 text-accent px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-accent/20">
                Bedrijfsvriend van de stichting
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
                {donateur.naam}
              </h1>
              {donateur.plaats && (
                <p className="text-white/65 inline-flex items-center gap-2">
                  <MapPin size={16} /> {donateur.plaats}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <main className="py-14 bg-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 grid lg:grid-cols-[1fr_300px] gap-8">
          <article className="bg-white rounded-3xl shadow-card p-7 md:p-9">
            <h2 className="font-display font-bold text-primary text-2xl mb-4">
              Over {donateur.naam}
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              {donateur.verhaal.map((alinea, index) => (
                <p key={index}>{alinea}</p>
              ))}
            </div>

            {donateur.afbeelding && (
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mt-8 bg-gray-100">
                <Image
                  src={donateur.afbeelding}
                  alt={`${donateur.naam} - voorbeeld van het werk`}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {donateur.bijdrage && (
              <div className="mt-8 bg-accent/10 rounded-2xl p-5 border border-accent/20">
                <h3 className="font-display font-bold text-primary mb-2">
                  Hun steun aan onze stichting
                </h3>
                <p className="text-gray-700 leading-relaxed">{donateur.bijdrage}</p>
              </div>
            )}
          </article>

          <aside className="space-y-5">
            {(donateur.website || donateur.facebook) && (
              <div className="bg-white rounded-3xl shadow-card p-6">
                <h2 className="font-display font-bold text-primary text-xl mb-4">
                  Bezoek {donateur.naam}
                </h2>
                <div className="space-y-3">
                  {donateur.website && (
                    <a
                      href={donateur.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                    >
                      <Globe2 size={16} /> Website <ExternalLink size={14} />
                    </a>
                  )}
                  {donateur.facebook && (
                    <a
                      href={donateur.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full justify-center"
                    >
                      <Facebook size={16} /> Facebook <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            <div className="bg-primary rounded-3xl p-6 text-white">
              <HeartHandshake size={34} className="text-accent mb-3" />
              <h2 className="font-display font-bold text-xl mb-2">Dankjewel!</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                Wij zijn onze bedrijfsvrienden ontzettend dankbaar. Hun steun helpt ons om ons werk voor bulldogs voort te zetten.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
