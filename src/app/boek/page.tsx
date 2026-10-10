import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, ExternalLink, Heart } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getBoekConfig } from "@/lib/boek";

export const metadata: Metadata = {
  title: "{boek.titel}",
  description:
    "Lees {boek.titel} van Michiel Petersen: een eerlijke en persoonlijke gids over karakter, verzorging, gezondheid en het leven samen.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

async function boekBeschikbaar() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage.from("post-images").list("boeken", { limit: 100 });
    if (error) return false;
    return (data || []).some((item) => item.name === "leven-met-een-bulldog.pdf");
  } catch {
    return false;
  }
}

export default async function BoekPage() {
  const beschikbaar = await boekBeschikbaar();
  const boek = await getBoekConfig();

  return (
    <>
      <section className="pt-28 pb-14 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
            <BookOpen size={15} /> Ons boek
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">{boek.titel}</h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            {boek.subtitel} Geschreven door {boek.auteur} vanuit jarenlange ervaring met Molly, Tara, Binky, Sjors en Carlos.
          </p>
        </div>
      </section>

      <main className="py-14 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">

          <section className="grid lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start mb-10">
            <div className="max-w-[340px] mx-auto lg:mx-0 w-full">
              <div className="relative aspect-[2/3] rounded-3xl overflow-hidden shadow-hover bg-white border border-gray-100">
                <Image
                  src={boek.cover}
                  alt={`Voorkant van ${boek.titel}`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-3">{boek.auteur} · {boek.jaar}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-card p-7 md:p-9">
              <span className="inline-block text-xs font-bold uppercase tracking-wide text-accent mb-2">
                Persoonlijk, praktisch en eerlijk
              </span>
              <h2 className="font-display text-3xl font-bold text-primary mb-4">
                Wat kun je van dit boek verwachten?
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {boek.intro.map((tekst) => <p key={tekst}>{tekst}</p>)}
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-7">
                {[
                  "Karakter & gedrag",
                  "Verzorging & gezondheid",
                  "Opvoeding & dagelijks leven",
                  "Kosten & verantwoordelijkheid",
                  "Franse, Engelse & Amerikaanse Bulldogs",
                  "Persoonlijke verhalen van onze honden",
                ].map((item) => (
                  <div key={item} className="rounded-xl bg-primary/5 px-4 py-3 text-sm font-semibold text-primary">
                    {item}
                  </div>
                ))}
              </div>

              {beschikbaar ? (
                <div className="flex flex-col sm:flex-row gap-3 mt-8">
                  <a href="/api/boek/pdf" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center">
                    Open het boek <ExternalLink size={16} />
                  </a>
                  <a href="/api/boek/pdf" download className="btn-secondary justify-center">
                    PDF openen
                  </a>
                </div>
              ) : (
                <div className="mt-8 rounded-2xl bg-amber-50 border border-amber-100 p-4 text-sm text-amber-800">
                  De boekpagina staat klaar. De PDF zelf hoeft alleen nog via het beheer gepubliceerd te worden.
                </div>
              )}
            </div>
          </section>

          <section className="bg-white rounded-3xl shadow-card p-7 md:p-9 mb-8">
            <h2 className="font-display text-2xl font-bold text-primary mb-3">Voor wie is het boek?</h2>
            <p className="text-gray-600 leading-relaxed max-w-4xl">{boek.doelgroep}</p>
          </section>

          {beschikbaar && (
            <section className="mb-8">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-accent">Online lezen</p>
                  <h2 className="font-display text-2xl font-bold text-primary">Blader door het volledige boek</h2>
                </div>
                <a href="/api/boek/pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                  Groot openen <ExternalLink size={14} />
                </a>
              </div>
              <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-gray-100">
                <iframe
                  src="/api/boek/pdf#view=FitH"
                  title="{boek.titel}"
                  className="w-full h-[78vh] min-h-[650px]"
                />
              </div>
            </section>
          )}

          <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 flex gap-3">
            <Heart size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              Het boek is gebaseerd op persoonlijke ervaringen met Bulldogs en is bedoeld als praktische en persoonlijke gids.
              Bij medische klachten of twijfel blijft de dierenarts altijd de aangewezen gesprekspartner.
            </p>
          </div>

          <div className="text-center mt-8">
            <Link href="/" className="btn-secondary">Terug naar de website</Link>
          </div>
        </div>
      </main>
    </>
  );
}
