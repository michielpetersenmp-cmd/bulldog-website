import Image from "next/image";
import Link from "next/link";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
             <Image src="/logo.png" alt="Stichting Bulldog Steunfonds Nederland" width={44} height={44} className="rounded-full" />
              <div>
                <div className="font-display font-bold text-white text-sm leading-tight">
                  Stichting Bulldog
                </div>
                <div className="text-xs text-white/60 leading-tight">
                  Steunfonds Nederland
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Wij helpen eigenaren van buldoggen die veterinaire kosten niet kunnen betalen. 
              Samen zorgen we voor onze vierpootige vrienden.
            </p>
            <p className="text-white/50 text-xs">KvK: 99058731</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-display font-bold text-white mb-4">Navigatie</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/over-ons", label: "Over ons" },
                { href: "/aanvragen", label: "Hulp aanvragen" },
                { href: "/doneren", label: "Doneren" },
                { href: "/blog", label: "Blog" },
                { href: "/updates", label: "Updates" },
                { href: "/anbi", label: "ANBI" },
                { href: "/contact", label: "Contact" },
                { href: "/privacyverklaring", label: "Privacyverklaring" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-4">Contact</h3>
            <a
              href="mailto:info@stichtingbulldogsteunfondsnederland.nl"
              className="flex items-start gap-2 text-white/70 hover:text-accent transition-colors text-sm group"
            >
              <Mail size={16} className="mt-0.5 shrink-0 group-hover:text-accent transition-colors" />
              info@stichtingbulldogsteunfondsnederland.nl
            </a>

            <div className="mt-6 p-4 bg-white/8 rounded-xl border border-white/10">
              <p className="text-white/80 text-sm font-semibold mb-1">Hulp nodig?</p>
              <p className="text-white/60 text-xs leading-relaxed">
                Is uw bulldog ziek en kunt u de kosten niet dragen? Dien een aanvraag in via ons portaal.
              </p>
              <Link
                href="/aanvragen"
                className="inline-flex items-center gap-1 mt-3 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
              >
                Aanvraag indienen →
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Stichting Bulldog Steunfonds Nederland. Alle rechten voorbehouden.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Gemaakt met <Heart size={10} className="text-accent" /> voor alle buldoggen
          </p>
        </div>
      </div>
    </footer>
  );
}
