"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/posts", label: "Blog & Updates" },
  { href: "/admin/verhalen", label: "Verhalen" },
  { href: "/admin/acties", label: "Acties" },
  { href: "/admin/stats", label: "Stats" },
];

export default function AdminNav() {
  const pathname = usePathname();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <>
      <header className="bg-primary text-white px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <p className="font-display font-bold text-white text-sm">Admin Dashboard</p>
              <p className="text-white/60 text-xs">Stichting Bulldog Steunfonds</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-white/70 hover:text-white text-sm transition-colors">
              Website
            </Link>
            <button onClick={logout} className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors">
              Uitloggen
            </button>
          </div>
        </div>
      </header>
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <Link key={tab.href} href={tab.href}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap ${
                  pathname === tab.href || (tab.href !== "/admin" && pathname.startsWith(tab.href))
                    ? "text-primary border-primary"
                    : "text-gray-500 hover:text-primary border-transparent hover:border-primary"
                }`}>
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
