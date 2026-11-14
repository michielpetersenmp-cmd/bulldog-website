import ToegangForm from "./ToegangForm";
import { redirect } from "next/navigation";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Veilig inloggen | Bulldogveiling", robots: { index: false, follow: false } };

export default async function VeilingToegangPage({ searchParams }: { searchParams: { token?: string } }) {
  const participant = await getCurrentVeilingParticipant();
  if (participant) redirect("/veiling/mijn-account");
  const token = typeof searchParams.token === "string" ? searchParams.token : "";
  return <main className="min-h-screen bg-[#f6f4ef] px-4 pb-16 pt-28">
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
      <p className="text-xs font-extrabold uppercase tracking-widest text-amber-700">Deelnemersaccount</p>
      <h1 className="mt-2 text-3xl font-extrabold text-[#183651]">Veilig inloggen</h1>
      <p className="mt-3 leading-relaxed text-slate-600">Vul ter controle het e-mailadres in waarmee je je hebt aangemeld. Zo kan een automatische beveiligingscontrole van je e-mailprogramma de link niet per ongeluk gebruiken.</p>
      <ToegangForm token={token} />
    </section>
  </main>;
}
