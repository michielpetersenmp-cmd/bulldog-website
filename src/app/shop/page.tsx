import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";
import EcwidShop from "@/components/EcwidShop";

export const metadata: Metadata = {
  title: "Shop & Steun",
  description:
    "In onze shop vind je artikelen waarvan de opbrengst direct naar het medische hulpfonds gaat. Zo help je een bulldog in nood.",
};

export default function ShopPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              🛍️ Shop & Steun
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Shop – steun bulldogs met je aankoop
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              In onze shop vind je artikelen waarvan de opbrengst direct naar het medische hulpfonds gaat. 
              Zo doe je jezelf of een ander een plezier én help je tegelijk een bulldog in nood.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Info blokken */}
      <section className="py-12 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-display font-bold text-primary mb-2">Wat vind je hier?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Unieke <strong>kleurboeken</strong> met bulldogs en andere thema's
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Actie-artikelen waarvan de opbrengst naar een specifieke hond gaat
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Donatie-artikelen waarbij je een bedrag kiest
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-display font-bold text-primary mb-2">Verzendkosten</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Brievenbuspakket: <strong>€ 4,25</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Pakketpost: <strong>€ 6,95</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  <strong>Gratis</strong> vanaf € 50,- binnen Nederland
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">💛</div>
              <h3 className="font-display font-bold text-primary mb-2">Waar gaat de opbrengst naartoe?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Medische behandelingen van bulldogs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Onvoorziene spoedsituaties
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-0.5">•</span>
                  Preventieve zorg bij high-risk gevallen
                </li>
              </ul>
            </div>
          </div>

          {/* Ecwid shop */}
          <div className="bg-white rounded-3xl shadow-card p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold text-primary mb-2">Onze producten</h2>
            <p className="text-gray-600 text-sm mb-6">
              Selecteer een artikel, plaats het in uw winkelmand en rond veilig af.
            </p>
            <EcwidShop />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Liever direct doneren?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Elke bijdrage helpt ons meer bulldogs te helpen.
          </p>
          <Link href="/doneren" className="btn-primary">
            <Heart size={16} /> Doneer nu
          </Link>
        </div>
      </section>
    </>
  );
}
