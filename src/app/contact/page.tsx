import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Clock, MapPin, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Stichting Bulldog Steunfonds Nederland. Wij beantwoorden uw vragen zo snel mogelijk.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/contact.png" alt="Bulldog" fill className="object-cover opacity-50" />
        </div>
        <div className="absolute inset-0 paw-bg opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <span className="inline-block bg-accent/15 text-accent px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-accent/20">
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Neem contact op
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Heeft u een vraag over een aanvraag, donatie of samenwerking? 
              Wij horen graag van u en reageren zo snel mogelijk.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 15C480 30 240 60 0 30L0 60Z" fill="#f8f8f6" />
          </svg>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Info */}
            <div>
              <span className="accent-bar" />
              <h2 className="section-title mb-4">Contactgegevens</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                U kunt ons bereiken via e-mail. Wij streven ernaar uw bericht binnen 2 werkdagen 
                te beantwoorden.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-0.5">E-mailadres</p>
                    <a
                      href="mailto:info@stichtingbulldogsteunfondsnederland.nl"
                      className="text-gray-600 hover:text-primary transition-colors text-sm break-all"
                    >
                      info@stichtingbulldogsteunfondsnederland.nl
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-0.5">Reactietijd</p>
                    <p className="text-gray-600 text-sm">Binnen 2 werkdagen</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 bg-white rounded-xl shadow-card flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary mb-0.5">KvK-registratie</p>
                    <p className="text-gray-600 text-sm">99058731 · Nederland</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-5 bg-accent/10 rounded-2xl border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={16} className="text-accent" />
                  <span className="font-semibold text-primary text-sm">Spoedeisende situatie?</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Heeft uw bulldog direct zorg nodig? Vermeld dit duidelijk in uw e-mail, 
                  dan behandelen wij uw bericht met prioriteit.
                </p>
              </div>
            </div>

            {/* Contactformulier */}
            <div className="bg-white rounded-3xl shadow-card p-8">
              <h2 className="font-display font-bold text-primary text-2xl mb-6">Stuur een bericht</h2>
              <form
                action={`mailto:info@stichtingbulldogsteunfondsnederland.nl`}
                method="post"
                encType="text/plain"
                className="space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="naam">
                      Naam
                    </label>
                    <input
                      id="naam"
                      name="naam"
                      type="text"
                      required
                      placeholder="Uw naam"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="email">
                      E-mailadres
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="uw@email.nl"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="onderwerp">
                    Onderwerp
                  </label>
                  <select
                    id="onderwerp"
                    name="onderwerp"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all bg-white"
                  >
                    <option value="">Selecteer een onderwerp</option>
                    <option value="aanvraag">Vraag over aanvraag</option>
                    <option value="donatie">Donatie of sponsoring</option>
                    <option value="samenwerking">Samenwerking / partnerschap</option>
                    <option value="algemeen">Algemene vraag</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5" htmlFor="bericht">
                    Bericht
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    required
                    rows={5}
                    placeholder="Schrijf uw bericht hier..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center"
                >
                  <Mail size={16} />
                  Bericht versturen
                </button>

                <p className="text-xs text-gray-400 text-center">
                  U wordt doorgestuurd naar uw e-mailprogramma om het bericht te versturen.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
