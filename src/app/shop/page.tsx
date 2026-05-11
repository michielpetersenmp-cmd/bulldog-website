import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop & Steun",
  description: "In onze shop vind je artikelen waarvan de opbrengst direct naar het medische hulpfonds gaat.",
};

export default function ShopPage() {
  return (
    <>
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
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      <section className="py-12 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="font-display font-bold text-primary mb-2">Wat vind je hier?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Unieke kleurboeken met bulldogs</li>
                <li>• Actie-artikelen voor specifieke honden</li>
                <li>• Donatie-artikelen naar keuze</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">📦</div>
              <h3 className="font-display font-bold text-primary mb-2">Verzendkosten</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Brievenbuspakket: € 4,25</li>
                <li>• Pakketpost: € 6,95</li>
                <li>• Gratis vanaf € 50,-</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl shadow-card p-6">
              <div className="text-3xl mb-3">💛</div>
              <h3 className="font-display font-bold text-primary mb-2">Opbrengst</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Medische behandelingen</li>
                <li>• Spoedsituaties</li>
                <li>• Preventieve zorg</li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-card p-8 text-center">
            <h2 className="font-display text-2xl font-bold text-primary mb-4">Onze producten</h2>
            <p className="text-gray-600 mb-6">Bekijk alle producten in onze webshop.</p>
            <div id="my-store-127419850"></div>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.ecwid_script_defer = true;
                  window.ecwid_dynamic_widgets = true;
                  if (!document.getElementById('ecwid-script')) {
                    var s = document.createElement('script');
                    s.id = 'ecwid-script';
                    s.src = 'https://app.ecwid.com/script.js?127419850&data_platform=code&data_date=2025-12-07';
                    s.charset = 'utf-8';
                    s.async = true;
                    s.onload = function() {
                      xProductBrowser("categoriesPerRow=3","views=grid(20,3) list(60) table(60)","categoryView=grid","searchView=list","id=my-store-127419850");
                    };
                    document.body.appendChild(s);
                  }
                `
              }}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 paw-bg opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Liever direct doneren?</h2>
          <p className="text-white/80 text-lg mb-8">Elke bijdrage helpt ons meer bulldogs te helpen.</p>
          <Link href="/doneren" className="btn-primary">
            <Heart size={16} /> Doneer nu
          </Link>
        </div>
      </section>
    </>
  );
}
