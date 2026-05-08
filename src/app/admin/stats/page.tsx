"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Save } from "lucide-react";
import AdminNav from "@/components/AdminNav";
export const dynamic = "force-dynamic";

export default function AdminStatsPage() {
  const [bulldogs, setBulldogs] = useState(0);
  const [donaties, setDonaties] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const { data } = await supabase.from("stats").select("*");
      if (data) {
        setBulldogs(data.find((s: any) => s.id === "bulldogs_geholpen")?.waarde || 0);
        setDonaties(data.find((s: any) => s.id === "donaties_dit_jaar")?.waarde || 0);
      }
      setLoading(false);
    }
    fetchStats();
  }, []);

  async function handleSave() {
    setSaving(true);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    await Promise.all([
      supabase.from("stats").upsert({ id: "bulldogs_geholpen", waarde: bulldogs, label: "Bulldogs geholpen" }),
      supabase.from("stats").upsert({ id: "donaties_dit_jaar", waarde: donaties, label: "Gedoneerd dit jaar (€)" }),
    ]);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold text-primary mb-2">Stats & Cijfers</h1>
        <p className="text-gray-500 text-sm mb-8">
          Deze cijfers worden getoond op de Acties & Opbrengsten pagina. Houd ze actueel!
        </p>

        {loading ? (
          <div className="text-center py-10 text-gray-400">Laden...</div>
        ) : (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-card p-6">
              <h3 className="font-semibold text-primary mb-4">📊 Statistieken website</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    🐾 Aantal bulldogs geholpen (totaal)
                  </label>
                  <input type="number" value={bulldogs} onChange={(e) => setBulldogs(Number(e.target.value))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
                  <p className="text-xs text-gray-400 mt-1">Wordt getoond als: "X bulldogs geholpen"</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    💶 Totaal gedoneerd dit jaar (€)
                  </label>
                  <input type="number" value={donaties} onChange={(e) => setDonaties(Number(e.target.value))}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
                  <p className="text-xs text-gray-400 mt-1">Wordt getoond als: "€X.XXX gedoneerd dit jaar"</p>
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center disabled:opacity-50">
              <Save size={16} />
              {saving ? "Opslaan..." : saved ? "✅ Opgeslagen!" : "Opslaan"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
