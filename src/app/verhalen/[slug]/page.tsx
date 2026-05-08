import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Calendar, MapPin, ChevronLeft, Heart } from "lucide-react";

export const revalidate = 60;

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  aangemeld: { label: "Aangemeld", color: "bg-yellow-100 text-yellow-700", icon: "🟡" },
  in_behandeling: { label: "In behandeling", color: "bg-blue-100 text-blue-700", icon: "🔵" },
  geholpen: { label: "Geholpen! 🎉", color: "bg-green-100 text-green-700", icon: "🟢" },
  gesloten: { label: "Gesloten", color: "bg-gray-100 text-gray-600", icon: "⚪" },
};

async function getVerhaal(slug: string) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("verhalen")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const verhaal = await getVerhaal(params.slug);
  if (!verhaal) return { title: "Verhaal niet gevonden" };
  return {
    title: `${verhaal.hond_naam} — ${verhaal.ras || "Bulldog"}`,
    description: verhaal.excerpt || undefined,
  };
}

function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="font-display font-bold text-primary text-xl mt-8 mb-3">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="font-display font-bold text-primary text-2xl mt-10 mb-4">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="font-display font-bold text-primary text-3xl mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li class="flex items-start gap-2 mb-1"><span class="text-accent mt-1">•</span><span>$1</span></li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="space-y-1 my-4">$&</ul>')
    .replace(/^(?!<[h|u|l])(.+)$/gm, (match) => {
      if (match.trim() === "") return "";
      return `<p class="text-gray-600 leading-relaxed mb-4">${match}</p>`;
    });
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function VerhaalPage({ params }: { params: { slug: string } }) {
  const verhaal = await getVerhaal(params.slug);
  if (!verhaal) notFound();

  const html = renderMarkdown(verhaal.verhaal);
  const status = statusConfig[verhaal.status] || statusConfig.aangemeld;

  return (
    <>
      {/* Hero */}
      <section className="pt-20 bg-primary relative overflow-hidden">
        {verhaal.afbeelding_url && (
          <div className="absolute inset-0">
            <Image src={verhaal.afbeelding_url} alt={verhaal.hond_naam} fill className="object-cover opacity-20" priority />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-primary" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-16">
          <Link href="/verhalen" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ChevronLeft size={16} /> Terug naar verhalen
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${status.color}`}>
              {status.icon} {status.label}
            </span>
            {verhaal.ras && (
              <span className="text-white/60 text-sm">🐕 {verhaal.ras}</span>
            )}
            {verhaal.leeftijd && (
              <span className="text-white/60 text-sm">· {verhaal.leeftijd}</span>
            )}
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-3">
            {verhaal.hond_naam}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/60 text-sm">
            {verhaal.woonplaats && (
              <span className="flex items-center gap-1"><MapPin size={14} /> {verhaal.woonplaats}</span>
            )}
            <span className="flex items-center gap-1"><Calendar size={14} /> {formatDatum(verhaal.created_at)}</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 20C1200 40 960 0 720 10C480 20 240 40 0 20L0 40Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Afbeelding */}
          {verhaal.afbeelding_url && (
            <div className="rounded-2xl overflow-hidden shadow-hover mb-8">
              <Image src={verhaal.afbeelding_url} alt={verhaal.hond_naam} width={900} height={600} className="w-full h-auto" />
            </div>
          )}

          {/* Info kaart */}
          <div className="bg-white rounded-2xl shadow-card p-6 mb-8 grid sm:grid-cols-2 gap-4">
            {[
              { label: "Naam", value: verhaal.hond_naam },
              { label: "Ras", value: verhaal.ras },
              { label: "Leeftijd", value: verhaal.leeftijd },
              { label: "Woonplaats", value: verhaal.woonplaats },
              { label: "Eigenaar", value: verhaal.eigenaar_naam },
              { label: "Status", value: `${status.icon} ${status.label}` },
            ].filter(item => item.value).map((item) => (
              <div key={item.label}>
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                <p className="font-semibold text-primary text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Voortgangsbalk */}
          {verhaal.donatie_doel && (
            <div className="bg-accent/10 rounded-2xl p-6 mb-8 border border-accent/20">
              <h3 className="font-display font-bold text-primary text-lg mb-3">Donaties voor {verhaal.hond_naam}</h3>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span className="font-bold text-primary">€{verhaal.donatie_opgehaald || 0} opgehaald</span>
                <span>Doel: €{verhaal.donatie_doel}</span>
              </div>
              <div className="w-full bg-white rounded-full h-3 shadow-inner">
                <div
                  className="bg-accent rounded-full h-3 transition-all duration-500"
                  style={{ width: `${Math.min(100, ((verhaal.donatie_opgehaald || 0) / verhaal.donatie_doel) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-right">
                {Math.round(((verhaal.donatie_opgehaald || 0) / verhaal.donatie_doel) * 100)}% van het doel bereikt
              </p>
              <Link href="/doneren" className="btn-primary mt-4 w-full justify-center">
                <Heart size={14} /> Help {verhaal.hond_naam}
              </Link>
            </div>
          )}

          {/* Verhaal */}
          <article className="bg-white rounded-3xl shadow-card p-8 md:p-10">
            {verhaal.excerpt && (
              <p className="text-lg text-gray-700 font-medium leading-relaxed mb-8 pb-8 border-b border-gray-100">
                {verhaal.excerpt}
              </p>
            )}
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </article>

          {/* CTA */}
          <div className="mt-8 bg-primary rounded-2xl p-6 text-center text-white">
            <p className="font-semibold mb-1">Geraakt door het verhaal van {verhaal.hond_naam}?</p>
            <p className="text-white/70 text-sm mb-4">Elke donatie helpt ons meer bulldogs te helpen.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/doneren" className="btn-primary text-sm"><Heart size={14} /> Doneer nu</Link>
              <Link href="/aanvragen" className="btn-outline-white text-sm">Hulp aanvragen</Link>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/verhalen" className="inline-flex items-center gap-1 text-primary hover:text-primary-light font-semibold text-sm transition-colors">
              <ChevronLeft size={16} /> Alle verhalen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
