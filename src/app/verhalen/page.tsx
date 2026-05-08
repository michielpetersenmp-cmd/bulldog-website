import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { Calendar, MapPin, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Verhalen",
  description:
    "Lees de verhalen van bulldogs die wij hebben mogen helpen. Elk verhaal is uniek, elk dier de moeite waard.",
};

export const revalidate = 60;

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  aangemeld: { label: "Aangemeld", color: "bg-yellow-100 text-yellow-700", icon: "🟡" },
  in_behandeling: { label: "In behandeling", color: "bg-blue-100 text-blue-700", icon: "🔵" },
  geholpen: { label: "Geholpen! 🎉", color: "bg-green-100 text-green-700", icon: "🟢" },
  gesloten: { label: "Gesloten", color: "bg-gray-100 text-gray-600", icon: "⚪" },
};

async function getVerhalen() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase
      .from("verhalen")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function VerhalenPage() {
  const verhalen = await getVerhalen();
  const geholpen = verhalen.filter((v: any) => v.status === "geholpen").length;
  const inBehandeling = verhalen.filter((v: any) => v.status === "in_behandeling").length;

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Verhalen
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Elk hond heeft een verhaal
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Dit zijn de bulldogs die zich bij ons hebben aangemeld. We delen hun verhaal — 
              want achter elke aanvraag zit een hond én een mens die het moeilijk heeft.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Stats */}
      {verhalen.length > 0 && (
        <section className="py-10 bg-bg">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "🐾", value: verhalen.length, label: "Verhalen gedeeld" },
                { icon: "🔵", value: inBehandeling, label: "In behandeling" },
                { icon: "🟢", value: geholpen, label: "Geholpen" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-display text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Verhalen grid */}
      <section className="py-16 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {verhalen.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🐾</div>
              <h2 className="font-display text-2xl font-bold text-primary mb-2">Binnenkort meer verhalen</h2>
              <p className="text-gray-500">De eerste verhalen verschijnen hier zodra ze gepubliceerd worden.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verhalen.map((verhaal: any) => {
                const status = statusConfig[verhaal.status] || statusConfig.aangemeld;
                return (
                  <Link href={`/verhalen/${verhaal.slug}`} key={verhaal.id} className="group block">
                    <article className="bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col">
                      {/* Afbeelding */}
                      <div className="relative h-52 bg-primary/8 overflow-hidden">
                        {verhaal.afbeelding_url ? (
                          <Image
                            src={verhaal.afbeelding_url}
                            alt={verhaal.hond_naam}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-6xl">🐾</div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                            {status.icon} {status.label}
                          </span>
                        </div>
                        {verhaal.featured && (
                          <div className="absolute top-3 right-3">
                            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white text-primary shadow">
                              ⭐ Uitgelicht
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                          {verhaal.ras && <span>🐕 {verhaal.ras}</span>}
                          {verhaal.leeftijd && <span>· {verhaal.leeftijd}</span>}
                        </div>

                        <h3 className="font-display font-bold text-primary text-xl mb-1 group-hover:text-primary-light transition-colors">
                          {verhaal.hond_naam}
                        </h3>

                        {verhaal.woonplaats && (
                          <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                            <MapPin size={11} /> {verhaal.woonplaats}
                          </div>
                        )}

                        {verhaal.excerpt && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                            {verhaal.excerpt}
                          </p>
                        )}

                        {/* Voortgangsbalk als er een doel is */}
                        {verhaal.donatie_doel && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-400 mb-1">
                              <span>€{verhaal.donatie_opgehaald || 0} opgehaald</span>
                              <span>Doel: €{verhaal.donatie_doel}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className="bg-accent rounded-full h-1.5"
                                style={{ width: `${Math.min(100, ((verhaal.donatie_opgehaald || 0) / verhaal.donatie_doel) * 100)}%` }}
                              />
                            </div>
                          </div>
                        )}

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar size={11} /> {formatDatum(verhaal.created_at)}
                          </div>
                          <span className="text-accent font-semibold text-sm group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Lees meer →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Heeft uw bulldog ook hulp nodig?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Schroom niet om contact op te nemen. We kijken altijd wat we kunnen betekenen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/aanvragen" className="btn-primary">
              <Heart size={16} /> Hulp aanvragen
            </Link>
            <Link href="/doneren" className="btn-outline-white">
              Steun een hond
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
