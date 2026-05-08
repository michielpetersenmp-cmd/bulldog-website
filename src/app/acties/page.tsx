import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Heart, ExternalLink, Trophy, Calendar, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Acties & Opbrengsten",
  description:
    "Bekijk alle acties en opbrengsten van Stichting Bulldog Steunfonds Nederland. Volledig transparant over elke euro.",
};

export const revalidate = 60;

const typeIcons: Record<string, string> = {
  veiling: "🏆",
  loterij: "🎟️",
  shop: "🛍️",
  donatie: "💶",
  evenement: "🎪",
  anders: "⭐",
};

const typeLabels: Record<string, string> = {
  veiling: "Veiling",
  loterij: "Loterij",
  shop: "Shop",
  donatie: "Donatie",
  evenement: "Evenement",
  anders: "Overig",
};

async function getData() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const [actiesRes, statsRes] = await Promise.all([
      supabase.from("acties").select("*").order("created_at", { ascending: false }),
      supabase.from("stats").select("*"),
    ]);

    return {
      acties: actiesRes.data || [],
      stats: statsRes.data || [],
    };
  } catch {
    return { acties: [], stats: [] };
  }
}

function formatBedrag(bedrag: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(bedrag);
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function ActiesPage() {
  const { acties, stats } = await getData();

  const bulldogsGeholpen = stats.find((s: any) => s.id === "bulldogs_geholpen")?.waarde || 0;
  const donатiesDitJaar = stats.find((s: any) => s.id === "donaties_dit_jaar")?.waarde || 0;
  const totaalOpbrengst = acties.reduce((sum: number, a: any) => sum + (a.opbrengst || 0), 0);
  const lopend = acties.filter((a: any) => a.status === "lopend");
  const afgerond = acties.filter((a: any) => a.status === "afgerond");

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Transparantie
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Acties & opbrengsten
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Volledig inzicht in onze acties, wat ze hebben opgebracht en hoe het geld wordt besteed.
              Elke euro telt en elk resultaat delen we graag met u.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Stats balk */}
      <section className="py-12 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: "💶", label: "Totale opbrengst acties", value: formatBedrag(totaalOpbrengst), accent: true },
              { icon: "💛", label: "Gedoneerd dit jaar", value: formatBedrag(donатiesDitJaar), accent: false },
              { icon: "🐾", label: "Bulldogs geholpen", value: `${bulldogsGeholpen}`, accent: false },
              { icon: "🏆", label: "Acties uitgevoerd", value: `${acties.length}`, accent: false },
            ].map((stat) => (
              <div key={stat.label} className={`rounded-2xl shadow-card p-5 text-center ${stat.accent ? "bg-accent" : "bg-white"}`}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className={`font-display text-2xl font-bold mb-1 ${stat.accent ? "text-primary" : "text-primary"}`}>
                  {stat.value}
                </div>
                <div className={`text-xs ${stat.accent ? "text-primary/70" : "text-gray-500"}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lopende acties */}
      {lopend.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className="accent-bar" />
              <h2 className="section-title mb-2">Lopende acties</h2>
              <p className="section-subtitle">Doe mee en help ons meer bulldogs te helpen!</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lopend.map((actie: any) => (
                <div key={actie.id} className="card border-2 border-accent/20 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full">
                      🔄 Lopend
                    </span>
                  </div>
                  <div className="text-4xl mb-4">{typeIcons[actie.type] || "⭐"}</div>
                  <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                    {typeLabels[actie.type]}
                  </div>
                  <h3 className="font-display font-bold text-primary text-xl mb-2">{actie.naam}</h3>
                  {actie.beschrijving && (
                    <p className="text-gray-600 text-sm mb-4">{actie.beschrijving}</p>
                  )}
                  {actie.doel_bedrag && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Opbrengst: {formatBedrag(actie.opbrengst || 0)}</span>
                        <span>Doel: {formatBedrag(actie.doel_bedrag)}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-accent rounded-full h-2 transition-all duration-500"
                          style={{ width: `${Math.min(100, ((actie.opbrengst || 0) / actie.doel_bedrag) * 100)}%` }}
                        />
                      </div>
                      <div className="text-xs text-right text-gray-400 mt-1">
                        {Math.round(((actie.opbrengst || 0) / actie.doel_bedrag) * 100)}% bereikt
                      </div>
                    </div>
                  )}
                  {actie.datum_start && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      Gestart: {formatDatum(actie.datum_start)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Afgeronde acties */}
      {afgerond.length > 0 && (
        <section className="py-16 bg-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="mb-10">
              <span className="accent-bar" />
              <h2 className="section-title mb-2">Afgeronde acties</h2>
              <p className="section-subtitle">Dankzij iedereen die heeft meegedaan!</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {afgerond.map((actie: any) => (
                <div key={actie.id} className="card relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
                      ✅ Afgerond
                    </span>
                  </div>
                  <div className="text-4xl mb-4">{typeIcons[actie.type] || "⭐"}</div>
                  <div className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
                    {typeLabels[actie.type]}
                  </div>
                  <h3 className="font-display font-bold text-primary text-xl mb-2">{actie.naam}</h3>
                  {actie.beschrijving && (
                    <p className="text-gray-600 text-sm mb-4">{actie.beschrijving}</p>
                  )}
                  <div className="bg-accent/10 rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={16} className="text-accent" />
                      <span className="font-display font-bold text-primary text-xl">
                        {formatBedrag(actie.opbrengst || 0)}
                      </span>
                      <span className="text-xs text-gray-500">opgehaald</span>
                    </div>
                  </div>
                  {actie.datum_start && actie.datum_eind && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {formatDatum(actie.datum_start)} — {formatDatum(actie.datum_eind)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leeg state */}
      {acties.length === 0 && (
        <section className="py-20 bg-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="section-title mb-3">Binnenkort meer acties</h2>
            <p className="section-subtitle">Onze eerste acties worden hier binnenkort weergegeven.</p>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Ook bijdragen aan onze missie?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Elke bijdrage helpt ons meer bulldogs te helpen. Doe mee met een actie of doneer direct.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/doneren" className="btn-primary">
              <Heart size={16} /> Doneer nu
            </Link>
            <a
              href="https://stichtingbulldogsteunfondsnederland.nl/shop.html"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              🛍️ Bezoek onze shop <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
