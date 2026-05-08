"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { Save, ArrowLeft } from "lucide-react";
import AdminNav from "@/components/AdminNav";

type ActieFormProps = { initial?: any; isEdit?: boolean };

export default function ActieForm({ initial, isEdit }: ActieFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    naam: initial?.naam ?? "",
    beschrijving: initial?.beschrijving ?? "",
    type: initial?.type ?? "veiling",
    doel_bedrag: initial?.doel_bedrag ?? "",
    opbrengst: initial?.opbrengst ?? 0,
    status: initial?.status ?? "lopend",
    datum_start: initial?.datum_start ?? "",
    datum_eind: initial?.datum_eind ?? "",
  });

  function update(field: string, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
      const payload = {
        naam: form.naam,
        beschrijving: form.beschrijving || null,
        type: form.type,
        doel_bedrag: form.doel_bedrag ? Number(form.doel_bedrag) : null,
        opbrengst: Number(form.opbrengst) || 0,
        status: form.status,
        datum_start: form.datum_start || null,
        datum_eind: form.datum_eind || null,
      };

      if (isEdit) {
        const { error } = await supabase.from("acties").update(payload).eq("id", initial.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("acties").insert([payload]);
        if (error) throw error;
      }
      router.push("/admin/acties");
    } catch (e: any) {
      setError(e.message);
    }
    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => router.push("/admin/acties")} className="flex items-center gap-1 text-gray-500 hover:text-primary text-sm transition-colors">
            <ArrowLeft size={16} /> Terug
          </button>
          <span className="text-gray-300">|</span>
          <h1 className="font-display font-bold text-primary text-xl">{isEdit ? "Actie bewerken" : "Nieuwe actie"}</h1>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-semibold text-primary mb-4">Algemeen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Naam actie *</label>
                <input type="text" value={form.naam} onChange={(e) => update("naam", e.target.value)}
                  placeholder="Veiling 2025" className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Beschrijving</label>
                <textarea value={form.beschrijving} onChange={(e) => update("beschrijving", e.target.value)} rows={3}
                  placeholder="Korte beschrijving van de actie..."
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={(e) => update("type", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option value="veiling">🏆 Veiling</option>
                    <option value="loterij">🎟️ Loterij</option>
                    <option value="shop">🛍️ Shop</option>
                    <option value="donatie">💶 Donatie</option>
                    <option value="evenement">🎪 Evenement</option>
                    <option value="anders">⭐ Overig</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => update("status", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                    <option value="lopend">🔄 Lopend</option>
                    <option value="afgerond">✅ Afgerond</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-semibold text-primary mb-4">Financiën</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Doelbedrag (€)</label>
                <input type="number" value={form.doel_bedrag} onChange={(e) => update("doel_bedrag", e.target.value)}
                  placeholder="500" className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Opbrengst (€)</label>
                <input type="number" value={form.opbrengst} onChange={(e) => update("opbrengst", e.target.value)}
                  placeholder="0" className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-card p-6">
            <h3 className="font-semibold text-primary mb-4">Periode</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Startdatum</label>
                <input type="date" value={form.datum_start} onChange={(e) => update("datum_start", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Einddatum</label>
                <input type="date" value={form.datum_eind} onChange={(e) => update("datum_eind", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={() => router.push("/admin/acties")} className="btn-secondary">Annuleren</button>
            <button onClick={handleSave} disabled={saving || !form.naam} className="btn-primary disabled:opacity-50">
              <Save size={14} /> {saving ? "Opslaan..." : isEdit ? "Wijzigingen opslaan" : "Actie aanmaken"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
