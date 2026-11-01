type Registration = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "confirmed" | "unsubscribed";
  created_at: string;
  confirmed_at: string | null;
};

function dateTime(value: string) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default function Vooraanmeldingen({ registrations }: { registrations: Registration[] }) {
  const confirmed = registrations.filter(item => item.status === "confirmed").length;
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-primary">Vooraanmeldingen</h2>
          <p className="mt-1 text-sm text-slate-600">Mensen die zich via de bezoekerspagina hebben aangemeld. {confirmed} e-mailadres(sen) zijn bevestigd.</p>
        </div>
        <a href="/veiling" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-primary px-4 py-2 text-sm font-bold text-primary">Open bezoekerspagina ↗</a>
      </div>
      <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
        {registrations.length ? <div className="overflow-x-auto"><table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="px-4 py-3">Naam</th><th className="px-4 py-3">E-mailadres</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Aangemeld</th></tr></thead>
          <tbody>{registrations.map(item => <tr key={item.id} className="border-t"><td className="px-4 py-3 font-semibold">{item.name}</td><td className="px-4 py-3">{item.email}</td><td className="px-4 py-3"><span className={"rounded-full px-3 py-1 text-xs font-bold " + (item.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900")}>{item.status === "confirmed" ? "Bevestigd" : item.status === "pending" ? "Wacht op bevestiging" : "Uitgeschreven"}</span></td><td className="px-4 py-3">{dateTime(item.created_at)}</td></tr>)}</tbody>
        </table></div> : <p className="px-5 py-6 text-sm text-slate-500">Er zijn nog geen vooraanmeldingen.</p>}
      </div>
    </section>
  );
}
