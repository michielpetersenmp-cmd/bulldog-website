"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye, LogOut } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  aangemeld: { label: "Aangemeld", color: "bg-yellow-100 text-yellow-700", icon: "🟡" },
  in_behandeling: { label: "In behandeling", color: "bg-blue-100 text-blue-700", icon: "🔵" },
  geholpen: { label: "Geholpen!", color: "bg-green-100 text-green-700", icon: "🟢" },
  gesloten: { label: "Gesloten", color: "bg-gray-100 text-gray-600", icon: "⚪" },
};

export default function AdminVerhalenPage() {
  const [verhalen, setVerhalen] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { fetchVerhalen(); }, []);

  async function fetchVerhalen() {
    setLoading(true);
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data } = await supabase.from("verhalen").select("*").order("created_at", { ascending: false });
    setVerhalen(data || []);
    setLoading(false);
  }

  async function deleteVerhaal(id: string, naam: string) {
    if (!confirm(`Weet u zeker dat u het verhaal van "${naam}" wilt verwijderen?`)) return;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    await supabase.from("verhalen").delete().eq("id", id);
    fetchVerhalen();
  }

  async function togglePublished(verhaal: any) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    await supabase.from("verhalen").update({ published: !verhaal.published }).eq("id", verhaal.id);
    fetchVerhalen();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-primary text-white px-4 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🐾</span>
            <div className="flex gap-4 text-sm">
              <Link href="/admin/posts" className="text-white/70 hover:text-white transition-colors">Posts</Link>
              <span className="text-white font-semibold border-b border-white pb-0.5">Verhalen</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-white/70 hover:text-white text-sm flex items-center gap-1">
              <Eye size={14} /> Website
            </Link>
            <button onClick={logout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-colors">
              <LogOut size={14} /> Uitloggen
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-display text-2xl font-bold text-primary">Verhalen ({verhalen.length})</h1>
          <Link href="/admin/verhalen/nieuw" className="btn-primary text-sm">
            <Plus size={16} /> Nieuw verhaal
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Laden...</div>
        ) : verhalen.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-card">
            <div className="text-5xl mb-3">🐾</div>
            <p className="text-gray-500">Nog geen verhalen. Maak het eerste aan!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Hond</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Status</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden md:table-cell">Datum</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Zichtbaar</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {verhalen.map((v) => {
                  const status = statusConfig[v.status] || statusConfig.aangemeld;
                  return (
                    <tr key={v.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-primary text-sm">{v.hond_naam}</div>
                        {v.ras && <div className="text-xs text-gray-400">{v.ras}{v.woonplaats ? ` · ${v.woonplaats}` : ""}</div>}
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.color}`}>
                          {status.icon} {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-400 hidden md:table-cell">
                        {new Date(v.created_at).toLocaleDateString("nl-NL")}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button onClick={() => togglePublished(v)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                            v.published ? "bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600" : "bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700"
                          }`}>
                          {v.published ? "Zichtbaar" : "Verborgen"}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/verhalen/${v.id}`} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/8 rounded-lg transition-colors" title="Bewerken">
                            <Edit size={15} />
                          </Link>
                          <a href={`/verhalen/${v.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors" title="Bekijken">
                            <Eye size={15} />
                          </a>
                          <button onClick={() => deleteVerhaal(v.id, v.hond_naam)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Verwijderen">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
