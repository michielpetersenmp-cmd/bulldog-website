import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mijn veiling", robots: { index: false, follow: false } };

export default async function MijnAccount({ searchParams }: { searchParams: { welkom?: string } }) {
  const participant = await getCurrentVeilingParticipant();
  if (!participant) redirect("/veiling/inloggen");

  return (
    <div className="min-h-[75vh] bg-[#f6f4ef] px-4 pb-16 pt-28 sm:px-5 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        {searchParams.welkom === "1" && <p className="mb-6 rounded-2xl border border-green-200 bg-green-50 p-4 font-semibold text-green-800">Je e-mailadres is bevestigd. Welkom bij Mijn veiling!</p>}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Deelnemersaccount</p>
            <h1 className="mt-2 text-3xl font-extrabold text-[#183651]">Welkom, {participant.name}</h1>
            <p className="mt-2 text-slate-600">{participant.email}</p>
          </div>
          <form action="/api/veiling/uitloggen" method="post">
            <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-[#183651]">Uitloggen</button>
          </form>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Accountstatus</p>
            <p className="mt-2 text-xl font-extrabold text-green-700">E-mailadres bevestigd</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Mijn biedingen</p>
            <p className="mt-2 text-3xl font-extrabold text-[#183651]">0</p>
            <p className="mt-1 text-xs text-slate-500">Bieden wordt actief bij de start.</p>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Gewonnen kavels</p>
            <p className="mt-2 text-3xl font-extrabold text-[#183651]">0</p>
          </section>
        </div>

        <section className="mt-6 rounded-3xl bg-[#183651] p-6 text-white sm:p-8">
          <p className="text-sm font-bold text-amber-300">De veiling begint op 15 november 2026</p>
          <h2 className="mt-2 text-2xl font-extrabold">Bekijk nu alvast alle kavels</h2>
          <p className="mt-2 max-w-2xl text-blue-100">Zodra de veiling begint kun je vanuit dit account bieden en zie je hier direct of je nog het hoogste bod hebt.</p>
          <Link href="/veiling#kavels" className="mt-5 inline-block rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651]">Bekijk de kavels</Link>
        </section>
      </div>
    </div>
  );
}
