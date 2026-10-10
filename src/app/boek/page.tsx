import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ExternalLink, Heart } from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Leven met een Bulldog",
  description:
    "Lees Leven met een Bulldog van Michiel Petersen: een eerlijke en persoonlijke gids over karakter, verzorging, gezondheid en het leven samen.",
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

  return (
    <>
      <section className="pt-28 pb-14 bg-primary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
            <BookOpen size={15} /> Ons boek
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Leven met een Bulldog</h1>
          <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
            Een eerlijke en persoonlijke gids over karakter, verzorging, gezondheid en het leven samen.
            Geschreven door Michiel Petersen vanuit jarenlange ervaring met Molly, Tara, Binky, Sjors en Carlos.
          </p>
        </div>
      </section>

      <main className="py-14 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl shadow-card p-6 md:p-8 mb-7">
            <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <h2 className="font-display text-2xl font-bold text-primary mb-3">Lees het boek online</h2>
                <p className="text-gray-600 leading-relaxed">
                  Geen verkooppraatje voor het ras en ook geen boek dat alleen waarschuwt. Dit is een persoonlijke
                  en praktische gids over het leven met Bulldogs: wat mooi is, wat lastig kan zijn en waar je vooraf
                  misschien niet altijd bij stilstaat.
                </p>
              </div>
              {beschikbaar && (
                <a href="/api/boek/pdf" target="_blank" rel="noopener noreferrer" className="btn-primary whitespace-nowrap">
                  Open PDF <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {beschikbaar ? (
            <div className="bg-white rounded-3xl shadow-card overflow-hidden border border-gray-100">
              <iframe src="/api/boek/pdf#view=FitH" title="Leven met een Bulldog" className="w-full h-[78vh] min-h-[650px]" />
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-card p-10 text-center">
              <BookOpen size={52} className="text-accent mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-primary mb-2">Het boek komt hier te staan</h2>
              <p className="text-gray-500">De PDF kan vanuit het beheer gepubliceerd worden.</p>
            </div>
          )}

          <div className="mt-8 bg-accent/10 border border-accent/20 rounded-2xl p-5 flex gap-3">
            <Heart size={20} className="text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700 leading-relaxed">
              Het boek is gebaseerd op persoonlijke ervaringen met Bulldogs en vervangt geen advies, onderzoek of behandeling door een dierenarts.
            </p>
          </div>

          <div className="text-center mt-8"><Link href="/" className="btn-secondary">Terug naar de website</Link></div>
        </div>
      </main>
    </>
  );
}
