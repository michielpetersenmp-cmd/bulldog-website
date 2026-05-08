"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Plus, Edit, Trash2, TrendingUp } from "lucide-react";
import AdminNav from "@/components/AdminNav";

const typeLabels: Record<string, string> = {
  veiling: "🏆 Veiling", loterij: "🎟️ Loterij", shop: "🛍️ Shop",
  donatie: "💶 Donatie", evenement: "🎪 Evenement", anders: "⭐ Overig",
};

function formatBedrag(bedrag: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(bedrag);
}

export default function AdminActiesPage() {
  const [acties, setActies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchActies(); }, []);

  async function fetchActies() {
    setLoading(true);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    const { data } = await supabase.from("acties").select("*").order("created_at", { ascending: false });
    setActies(data || []);
    setLoading(false);
  }

  async function deleteActie(id: string, naam: string) {
    if (!confirm(`Weet u zeker dat u "${naam}" wilt verwijderen?`)) return;
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    await supabase.from("acties").delete().eq("id", id);
    fetchActies();
  }

  const totaal = acties.reduce((sum, a) => sum + (a.opbrengst || 0), 0);

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">Acties ({acties.length})</h1>
            <p className="text-sm text-gray-500">Totale opbrengst: <strong className="text-primary">{formatBedrag(totaal)}</strong></p>
          </div>
          <Link href="/admin/acties/nieuw" className="btn-primary text-sm">
            <Plus size={16} /> Nieuwe actie
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Laden...</div>
        ) : acties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-card">
            <div className="text-5xl mb-3">🏆</div>
            <p className="text-gray-500">Nog geen acties. Maak de eerste aan!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Actie</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3 hidden sm:table-cell">Type</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Opbrengst</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wide px-4 py-3">Status</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-6 py-3">Acties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {acties.map((actie) => (
                  <tr key={actie.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-primary text-sm">{actie.naam}</div>
                      {actie.beschrijving && <div className="text-xs text-gray-400 line-clamp-1">{actie.beschrijving}</div>}
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="text-xs font-semibold text-gray-600">{typeLabels[actie.type] || actie.type}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp size={14} className="text-accent" />
                        <span className="font-bold text-primary text-sm">{formatBedrag(actie.opbrengst || 0)}</span>
                      </div>
                      {actie.doel_bedrag && (
                        <div className="text-xs text-gray-400">van {formatBedrag(actie.doel_bedrag)}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 text-center">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        actie.status === "lopend" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}>
                        {actie.status === "lopend" ? "🔄 Lopend" : "✅ Afgerond"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/acties/${actie.id}`} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/8 rounded-lg transition-colors">
                          <Edit size={15} />
                        </Link>
                        <button onClick={() => deleteActie(actie.id, actie.naam)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
