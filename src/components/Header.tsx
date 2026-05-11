"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Heart, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/aanvragen", label: "Hulp aanvragen" },
  {
    label: "Doneren",
    dropdown: [
      { href: "/doneren", label: "💶 Doneer nu" },
      { href: "/acties", label: "🏆 Acties & opbrengsten" },
      { href: "https://www.stichtingbulldogsteunfondsnederland.nl/shop", label: "🛍️ Shop", external: true },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/updates", label: "Updates" },
  { href: "/anbi", label: "ANBI" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-soft" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/logo.png" alt="Stichting Bulldog Steunfonds Nederland" width={44} height={44} className="rounded-full shadow-soft" />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-primary text-sm leading-tight">Stichting Bulldog</div>
              <div className="text-xs text-gray-500 font-medium leading-tight">Steunfonds Nederland</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if ("dropdown" in link) {
                return (
                  <div key={link.label} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        pathname.startsWith("/doneren") || pathname.startsWith("/acties")
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:text-primary hover:bg-primary/8"
                      }`}
                    >
                      {link.label}
                      <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-hover border border-gray-100 py-2 z-50">
                        {link.dropdown?.map((item) =>
                          "external" in item && item.external ? (
                            <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-primary/6 transition-colors">
                              {item.label}
                            </a>
                          ) : (
                            <Link key={item.href} href={item.href}
                              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                                pathname === item.href ? "text-primary bg-primary/6 font-semibold" : "text-gray-700 hover:text-primary hover:bg-primary/6"
                              }`}>
                              {item.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link key={link.href} href={link.href!}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    pathname === link.href ? "bg-primary text-white" : "text-gray-700 hover:text-primary hover:bg-primary/8"
                  }`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/doneren"
              className="hidden md:inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-primary font-bold text-sm px-4 py-2 rounded-xl transition-all duration-200 shadow-soft hover:shadow-hover hover:-translate-y-0.5">
              <Heart size={14} /> Doneer nu
            </Link>
            <button className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(!open)} aria-label="Menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            if ("dropdown" in link) {
              return (
                <div key={link.label}>
                  <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">{link.label}</div>
                  {link.dropdown?.map((item) =>
                    "external" in item && item.external ? (
                      <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                        className="block px-6 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary/8 hover:text-primary">
                        {item.label}
                      </a>
                    ) : (
                      <Link key={item.href} href={item.href}
                        className={`block px-6 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                          pathname === item.href ? "bg-primary text-white" : "text-gray-700 hover:bg-primary/8 hover:text-primary"
                        }`}>
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              );
            }
            return (
              <Link key={link.href} href={link.href!}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  pathname === link.href ? "bg-primary text-white" : "text-gray-700 hover:bg-primary/8 hover:text-primary"
                }`}>
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link href="/doneren" className="flex items-center justify-center gap-2 bg-accent text-primary font-bold text-sm px-4 py-3 rounded-xl w-full">
              <Heart size={14} /> Doneer nu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
