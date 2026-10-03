"use client";

import { useEffect, useState } from "react";
import AdminNav from "@/components/AdminNav";
import { CalendarDays, Plus, Save, Trash2, Upload } from "lucide-react";

type Evenement = {
  id?: string;
  titel: string;
  beschrijving: string;
  datum: string;
  tijd_start: string;
  tijd_eind: string;
  deadline_datum: string;
  deadline_tijd: string;
  locatie: string;
  locatie_url: string;
  type: string;
  afbeelding_url: string;
  inschrijving_url: string;
  max_deelnemers: string;
  published: boolean;
  featured: boolean;
  herinnering_dag_ervoor: boolean;
  herinnering_bij_start: boolean;
  herinnering_deadline: boolean;
};

const leeg: Evenement = {
  titel: "",
  beschrijving: "",
  datum: "",
  tijd_start: "",
  tijd_eind: "",
  deadline_datum: "",
  deadline_tijd: "",
  locatie: "",
  locatie_url: "",
  type: "evenement",
  afbeelding_url: "",
  inschrijving_url: "",
  max_deelnemers: "",
  published: false,
  featured: false,
  herinnering_dag_ervoor: true,
  herinnering_bij_start: true,
  herinnering_deadline: true,
};

export default function PlannerAdminPage() {
  const [items, setItems] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/planner", { cache: "no-store" });
    const data = await res.json();
    setItems((data.evenementen || []).map((e: any) => ({
      ...leeg,
      ...e,
      beschrijving: e.beschrijving || "",
      tijd_start: e.tijd_start?.slice(0,5) || "",
      tijd_eind: e.tijd_eind?.slice(0,5) || "",
      deadline_datum: e.deadline_datum || "",
      deadline_tijd: e.deadline_tijd?.slice(0,5) || "",
      locatie: e.locatie || "",
      locatie_url: e.locatie_url || "",
      afbeelding_url: e.afbeelding_url || "",
      inschrijving_url: e.inschrijving_url || "",
      max_deelnemers: e.max_deelnemers ? String(e.max_deelnemers) : "",
    })));
    setLoading(false);
  }

  function update(index: number, field: keyof Evenement, value: any) {
    setItems((prev) => prev.map((x, i) => i === index ? { ...x, [field]: value } : x));
  }

  function add() {
    setItems((prev) => [{ ...leeg }, ...prev]);
  }

  async function save(index: number) {
    const item = items[index];
    if (!item.titel || !item.datum) {
      setMessage("Vul minimaal een titel en datum in.");
      return;
    }
    setSaving(item.id || `new-${index}`);
    setMessage("");
    const method = item.id ? "PUT" : "POST";
    const res = await fetch("/api/admin/planner", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Opslaan mislukt");
    } else {
      setMessage("Planner-item opgeslagen.");
      await load();
    }
    setSaving("");
  }

  async function remove(index: number) {
    const item = items[index];
    if (!item.id) {
      setItems((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    if (!confirm(`“${item.titel}” verwijderen?`)) return;
    const res = await fetch("/api/admin/planner", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    if (res.ok) await load();
  }

  async function upload(index: number, file: File) {
    const form = new FormData();
    form.append("file", file);
    setSaving(`upload-${index}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (res.ok) update(index, "afbeelding_url", data.url);
    else setMessage(data.error || "Upload mislukt");
    setSaving("");
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminNav />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-primary">Planner beheren</h1>
            <p className="text-sm text-gray-500">Loterijen, veilingen, acties en evenementen voor de Bulldog Planner.</p>
          </div>
          <button onClick={add} className="btn-primary text-sm">
            <Plus size={15} /> Nieuw planner-item
          </button>
        </div>

        <div className="mb-6 bg-white rounded-2xl shadow-card p-5">
          <div className="flex gap-3 items-start">
            <CalendarDays className="text-primary mt-0.5" size={20} />
            <div>
              <p className="font-semibold text-primary">Hoe herinneringen werken</p>
              <p className="text-sm text-gray-600 mt-1">
                Je kunt per item instellen of gebruikers een melding krijgen bij de start, een dag vooraf en op de laatste dag om mee te doen. De planner-app gebruikt deze gegevens voor de herinneringen.
              </p>
            </div>
          </div>
        </div>

        {message && <div className="mb-5 bg-white border border-gray-200 rounded-xl p-4 text-sm">{message}</div>}

        {loading ? (
          <div className="text-center py-16 text-gray-400">Laden...</div>
        ) : (
          <div className="space-y-6">
            {items.map((item, index) => (
              <section key={item.id || `new-${index}`} className="bg-white rounded-3xl shadow-card p-6">
                <div className="flex justify-between items-start gap-3 mb-5">
                  <div>
                    <h2 className="font-display font-bold text-primary text-xl">{item.titel || "Nieuw planner-item"}</h2>
                    <p className="text-xs text-gray-400">{item.published ? "Gepubliceerd" : "Concept"}</p>
                  </div>
                  <button onClick={() => remove(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={17}/></button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Field label="Titel" value={item.titel} onChange={(v) => update(index, "titel", v)} />
                  <Select label="Type" value={item.type} onChange={(v) => update(index, "type", v)} />
                  <Field label="Datum / startdatum" type="date" value={item.datum} onChange={(v) => update(index, "datum", v)} />
                  <Field label="Starttijd" type="time" value={item.tijd_start} onChange={(v) => update(index, "tijd_start", v)} />
                  <Field label="Eindtijd" type="time" value={item.tijd_eind} onChange={(v) => update(index, "tijd_eind", v)} />
                  <Field label="Laatste dag om mee te doen" type="date" value={item.deadline_datum} onChange={(v) => update(index, "deadline_datum", v)} />
                  <Field label="Deadline tijd" type="time" value={item.deadline_tijd} onChange={(v) => update(index, "deadline_tijd", v)} />
                  <Field label="Locatie" value={item.locatie} onChange={(v) => update(index, "locatie", v)} />
                  <Field label="Locatie-link" value={item.locatie_url} onChange={(v) => update(index, "locatie_url", v)} placeholder="https://..." />
                  <Field label="Link om mee te doen / inschrijven" value={item.inschrijving_url} onChange={(v) => update(index, "inschrijving_url", v)} placeholder="https://..." />
                  <Field label="Max. deelnemers (optioneel)" type="number" value={item.max_deelnemers} onChange={(v) => update(index, "max_deelnemers", v)} />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Beschrijving</label>
                  <textarea value={item.beschrijving} onChange={(e) => update(index, "beschrijving", e.target.value)} rows={4}
                    className="w-full text-sm border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20" />
                </div>

                <div className="mt-5 grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Afbeelding</label>
                    {item.afbeelding_url && <img src={item.afbeelding_url} alt="" className="w-full h-40 object-cover rounded-2xl border border-gray-100 mb-2" />}
                    <label className="border-2 border-dashed border-gray-200 rounded-xl h-24 flex items-center justify-center gap-2 cursor-pointer text-sm text-gray-500">
                      <Upload size={17}/> {saving === `upload-${index}` ? "Uploaden..." : "Afbeelding kiezen"}
                      <input className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => e.target.files?.[0] && upload(index, e.target.files[0])}/>
                    </label>
                    <Field label="Of afbeeldings-URL" value={item.afbeelding_url} onChange={(v) => update(index, "afbeelding_url", v)} />
                  </div>

                  <div className="space-y-3">
                    <Check label="Publiceren in planner" checked={item.published} onChange={(v) => update(index, "published", v)} />
                    <Check label="Uitlichten" checked={item.featured} onChange={(v) => update(index, "featured", v)} />
                    <div className="border-t pt-3 mt-3">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Herinneringen</p>
                      <Check label="Melding een dag vooraf" checked={item.herinnering_dag_ervoor} onChange={(v) => update(index, "herinnering_dag_ervoor", v)} />
                      <Check label="Melding wanneer de actie start" checked={item.herinnering_bij_start} onChange={(v) => update(index, "herinnering_bij_start", v)} />
                      <Check label="Melding op laatste dag om mee te doen" checked={item.herinnering_deadline} onChange={(v) => update(index, "herinnering_deadline", v)} />
                    </div>
                  </div>
                </div>

                <button onClick={() => save(index)} disabled={!!saving} className="btn-primary mt-6 text-sm disabled:opacity-50">
                  <Save size={15}/> {saving === (item.id || `new-${index}`) ? "Opslaan..." : "Opslaan"}
                </button>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", placeholder = "" }: { label: string; value: string; onChange: (v:string)=>void; type?: string; placeholder?: string }) {
  return <div className="mt-2">
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <input type={type} value={value} placeholder={placeholder} onChange={(e)=>onChange(e.target.value)}
      className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-primary/20"/>
  </div>;
}

function Select({ label, value, onChange }: { label:string; value:string; onChange:(v:string)=>void }) {
  return <div className="mt-2">
    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
    <select value={value} onChange={(e)=>onChange(e.target.value)} className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white">
      <option value="evenement">Evenement</option>
      <option value="actie">Actie</option>
      <option value="veiling">Veiling</option>
      <option value="loterij">Loterij</option>
      <option value="online">Online</option>
      <option value="overig">Overig</option>
    </select>
  </div>;
}

function Check({ label, checked, onChange }: { label:string; checked:boolean; onChange:(v:boolean)=>void }) {
  return <label className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer min-h-10">
    <input type="checkbox" checked={checked} onChange={(e)=>onChange(e.target.checked)} className="w-4 h-4"/>
    {label}
  </label>;
}
