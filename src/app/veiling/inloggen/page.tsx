import InlogForm from "./InlogForm";

export const metadata = { title: "Inloggen bij Mijn veiling", robots: { index: false, follow: false } };

export default function Inloggen({ searchParams }: { searchParams: { status?: string } }) {
  return (
    <div className="min-h-[75vh] bg-[#f6f4ef] px-5 pb-16 pt-32">
      <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
        <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Deelnemersaccount</p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#183651]">Inloggen bij Mijn veiling</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Vul het bevestigde e-mailadres in. Je ontvangt een veilige inloglink en hebt geen wachtwoord nodig.</p>
        {searchParams.status === "ongeldig" && <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">Deze inloglink is verlopen of al gebruikt. Vraag hieronder een nieuwe link aan.</p>}
        <InlogForm />
      </div>
    </div>
  );
}
