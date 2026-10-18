import { redirect } from "next/navigation";
import Link from "next/link";
import { getVeilingAdmin } from "@/lib/veiling-auth";
import VeilingLogoutButton from "./logout-button";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function VeilingTestPage() {
  if (!await getVeilingAdmin()) redirect("/veiling/beheer/login");
  const admin = getSupabaseAdmin();
  const { data: lots } = await admin
    .from("veiling_test_lots")
    .select("id,lot_number,title,sponsor,start_bid,current_bid,bid_count,active,closes_at")
    .order("lot_number", { ascending: true });

  const { count: bidderCount } = await admin
    .from("veiling_test_bidders")
    .select("*", { count: "exact", head: true });

  const { count: bidCount } = await admin
    .from("veiling_test_bids")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-[#f8f8f6] px-5 py-10 text-[#1a3a5c]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-950">
          <strong>Beveiligde testomgeving.</strong> Deze pagina gebruikt een eigen veilinglogin, los van het gewone websitebeheer.
          Alle gegevens hieronder komen uitsluitend uit tabellen met de naam <code>veiling_test_*</code>.
        </div>

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-700">Veiling 2026</p>
            <h1 className="mt-2 text-4xl font-bold">Testomgeving</h1>
            <p className="mt-2 text-slate-600">15 november t/m 29 november 2026, sluiting 20.00 uur.</p>
          </div>
          <div className="flex flex-wrap gap-3"><Link href="/veiling/beheer/voorbeeld" className="rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651]">Bekijk voorbeeld voor bezoekers →</Link><VeilingLogoutButton /></div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Testkavels</p><p className="text-3xl font-bold">{lots?.length || 0}</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Testbieders</p><p className="text-3xl font-bold">{bidderCount || 0}</p></div>
          <div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Testbiedingen</p><p className="text-3xl font-bold">{bidCount || 0}</p></div>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">Kavels</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(lots || []).map((lot) => (
              <article key={lot.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="text-xs font-bold text-amber-700">KAVEL {String(lot.lot_number).padStart(3, "0")}</p>
                <h3 className="mt-2 text-lg font-bold">{lot.title}</h3>
                <p className="text-sm text-slate-500">{lot.sponsor || "Test-sponsor"}</p>
                <p className="mt-5 text-xs text-slate-500">Hoogste testbod</p>
                <p className="text-2xl font-extrabold">€ {Number(lot.current_bid).toFixed(2).replace(".", ",")}</p>
                <p className="mt-1 text-xs text-slate-500">{lot.bid_count} testbiedingen</p>
                <p className="mt-4 text-xs font-semibold">{lot.active ? "Actief in test" : "Gesloten in test"}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">Veilig gescheiden</h2>
          <p className="mt-2 text-slate-600">
            De testomgeving gebruikt eigen tabellen voor bieders, kavels, biedingen en de meldingen-wachtrij.
            Daardoor raken oefengegevens nooit vermengd met de gegevens van de openbare website.
          </p>
        </div>
      </div>
    </main>
  );
}
