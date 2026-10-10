"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Heart, Trophy, PawPrint, Plus, LogOut, Eye, Building2, CalendarDays, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    posts: 0,
    verhalen: 0,
    acties: 0,
    actiesAfgerond: 0,
    actiesLopend: 0,
    geholpen: 0,
    donateurs: 0,
    donaties: 0,
    opbrengstActies: 0,
    planner: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/admin/dashboard-stats", { cache: "no-store" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Statistieken konden niet worden geladen.");
        setStats(data);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const sections = [
    {
      icon: FileText,
      label: "Blog & Updates",
      desc: "Beheer blogs en updates",
      href: "/admin/posts",
      newHref: "/admin/posts/nieuw",
      count: stats.posts,
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: PawPrint,
      label: "Verhalen",
      desc: "Honden die hulp nodig hebben",
      href: "/admin/verhalen",
      newHref: "/admin/verhalen/nieuw",
      count: stats.verhalen,
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: Trophy,
      label: "Acties",
      desc: "Veilingen, loterijen, evenementen",
      href: "/admin/acties",
      newHref: "/admin/acties/nieuw",
      count: stats.acties,
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Building2,
      label: "Donateurs & bedrijfsvrienden",
      desc: "Teksten, logo's, foto's en links",
      href: "/admin/donateurs",
      newHref: null,
      count: stats.donateurs,
      color: "bg-violet-50 text-violet-600",
    },
    {
      icon: BookOpen,
      label: "Boek",
      desc: "Leven met een Bulldog publiceren en vervangen",
      href: "/admin/boek",
      newHref: null,
      count: null,
      color: "bg-orange-50 text-orange-700",
    },
    {
      icon: CalendarDays,
      label: "Planner",
      desc: "Loterijen, veilingen, evenementen en herinneringen",
      href: "/admin/planner",
      newHref: null,
      count: stats.planner,
      color: "bg-cyan-50 text-cyan-700",
    },
    {
      icon: Heart,
      label: "Stats & Cijfers",
      desc: "Bulldogs geholpen, donaties",
      href: "/admin/stats",
      newHref: null,
      count: stats.geholpen,
      color: "bg-rose-50 text-rose-600",
    },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="bg-primary text-white px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🐾</span>
            <div>
              <p className="font-display font-bold text-white">Admin Dashboard</p>
              <p className="text-white/60 text-xs">Stichting Bulldog Steunfonds Nederland</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-white/70 hover:text-white text-sm flex items-center gap-1 transition-colors">
              <Eye size={14} /> Website
            </Link>
            <button onClick={logout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors">
              <LogOut size={14} /> Uitloggen
            </button>
          </div>
        </div>
      </header>

      {/* Nav tabs */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { href: "/admin", label: "Dashboard" },
              { href: "/admin/posts", label: "Blog & Updates" },
              { href: "/admin/verhalen", label: "Verhalen" },
              { href: "/admin/acties", label: "Acties" },
              { href: "/admin/donateurs", label: "Donateurs" },
              { href: "/admin/boek", label: "Boek" },
              { href: "/admin/planner", label: "Planner" },
              { href: "/admin/stats", label: "Stats" },
            ].map((tab) => (
              <Link key={tab.href} href={tab.href}
                className="px-4 py-3 text-sm font-semibold text-gray-500 hover:text-primary border-b-2 border-transparent hover:border-primary transition-colors whitespace-nowrap">
                {tab.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welkom */}
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-primary mb-1">Welkom terug! 👋</h1>
          <p className="text-gray-500 text-sm">Beheer alle content van de stichting vanuit dit dashboard.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: "🐾", label: "Bulldogs geholpen", value: stats.geholpen },
            { icon: "✅", label: "Acties afgerond", value: stats.actiesAfgerond },
            { icon: "🔄", label: "Acties lopend", value: stats.actiesLopend },
            { icon: "🤝", label: "Bedrijfsvrienden", value: stats.donateurs },
            { icon: "💛", label: "Donaties", value: new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(stats.donaties) },
            { icon: "🏆", label: "Opbrengst acties", value: new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(stats.opbrengstActies) },
            { icon: "📝", label: "Posts", value: stats.posts },
            { icon: "📖", label: "Verhalen", value: stats.verhalen },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-card p-5 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="font-display text-2xl md:text-3xl font-bold text-primary break-words">{loading ? "..." : stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Secties */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => (
            <div key={section.label} className="bg-white rounded-2xl shadow-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${section.color}`}>
                    <section.icon size={22} />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-primary">{section.label}</h2>
                    <p className="text-xs text-gray-500">{section.desc}</p>
                  </div>
                </div>
                {section.count !== null && (
                  <span className="font-display text-2xl font-bold text-primary">
                    {loading ? "..." : section.count}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Link href={section.href} className="btn-secondary text-sm flex-1 justify-center">
                  Beheren
                </Link>
                {section.newHref && (
                  <Link href={section.newHref} className="btn-primary text-sm">
                    <Plus size={14} /> Nieuw
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
