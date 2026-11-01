import Link from "next/link";

export const metadata = { title: "Aanmelding veiling", robots: { index: false, follow: false } };

export default function Bevestigd({ searchParams }: { searchParams: { status?: string } }) {
  const confirmed = searchParams.status === "bevestigd";
  return (
    <div className="min-h-[70vh] bg-[#f6f4ef] px-5 pb-16 pt-32">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="text-5xl">{confirmed ? "✓" : "!"}</div>
        <h1 className="mt-4 text-3xl font-extrabold text-[#183651]">{confirmed ? "Je aanmelding is bevestigd" : "Deze bevestigingslink werkt niet meer"}</h1>
        <p className="mt-4 leading-relaxed text-slate-600">
          {confirmed
            ? "Je ontvangt bericht wanneer de Bulldogveiling begint. Tot die tijd kun je alvast alle kavels bekijken."
            : "De link is ongeldig of ouder dan 48 uur. Meld je opnieuw aan om een nieuwe bevestigingsmail te ontvangen."}
        </p>
        <Link href="/veiling" className="mt-7 inline-block rounded-xl bg-[#183651] px-6 py-3 font-extrabold text-white">
          Terug naar de veiling
        </Link>
      </div>
    </div>
  );
}
