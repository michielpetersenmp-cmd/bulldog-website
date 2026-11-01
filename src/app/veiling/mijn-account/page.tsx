import Link from "next/link";
import { redirect } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";

export const dynamic = "force-dynamic";
export const metadata = { title: "Mijn veiling", robots: { index: false, follow: false } };

function money(value: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}
function dateTime(value: string) {
  return new Intl.DateTimeFormat("nl-NL", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default async function MijnAccount({ searchParams }: { searchParams: { welkom?: string } }) {
  const participant = await getCurrentVeilingParticipant();
  if (!participant) redirect("/veiling/inloggen");

  const admin = getSupabaseAdmin();
  const [{ data: bids }, { data: states }, { data: lots }, { data: settings }, { data: winners }] = await Promise.all([
    admin.from("veiling_participant_test_bids").select("id,lot_id,amount,created_at").eq("participant_id", participant.id).order("created_at", { ascending: false }).limit(100),
    admin.from("veiling_participant_test_lot_state").select("lot_id,current_bidder_id,current_bid"),
    admin.from("veiling_test_lots").select("id,lot_number,title").order("lot_number"),
    admin.from("veiling_participant_test_settings").select("bidding_enabled,closed_at").eq("id", true).maybeSingle(),
    admin.from("veiling_participant_test_winners").select("lot_id,amount").eq("participant_id", participant.id),
  ]);
  const lotById = new Map((lots || []).map(lot => [Number(lot.id), lot]));
  const stateByLot = new Map((states || []).map(state => [Number(state.lot_id), state]));
  const leadingLots = new Set((states || []).filter(state => state.current_bidder_id === participant.id).map(state => Number(state.lot_id)));
  const latestByLot = new Map<number, { id: number; lot_id: number; amount: number; created_at: string }>();
  for (const bid of bids || []) if (!latestByLot.has(Number(bid.lot_id))) latestByLot.set(Number(bid.lot_id), bid);
  const ownLotBids = Array.from(latestByLot.values());

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

        {settings?.bidding_enabled && <p className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-4 font-semibold text-amber-950"><strong>Proefbieden is actief.</strong> Deze biedingen zijn alleen om de werking te testen en tellen niet mee bij de echte veiling.</p>}{settings?.closed_at && <p className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 font-semibold text-green-800"><strong>De proefveiling is afgesloten.</strong> Je hebt {winners?.length || 0} proefkavel(s) gewonnen.</p>}

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Accountstatus</p><p className="mt-2 text-xl font-extrabold text-green-700">E-mailadres bevestigd</p></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">Kavels waarop ik bood</p><p className="mt-2 text-3xl font-extrabold text-[#183651]">{ownLotBids.length}</p><p className="mt-1 text-xs text-slate-500">{bids?.length || 0} bod(en) geplaatst</p></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm text-slate-500">{settings?.closed_at ? "Gewonnen proefkavels" : "Nu hoogste bieder"}</p><p className="mt-2 text-3xl font-extrabold text-[#183651]">{settings?.closed_at ? (winners?.length || 0) : leadingLots.size}</p></section>
        </div>

        {ownLotBids.length > 0 && <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="border-b px-5 py-4 sm:px-7"><h2 className="text-xl font-extrabold text-[#183651]">Mijn proefbiedingen</h2><p className="mt-1 text-xs text-slate-500">De biedstand wordt bijgewerkt wanneer je deze pagina opent.</p></div>
          <div className="divide-y">{ownLotBids.map(bid => {
            const lot = lotById.get(Number(bid.lot_id));
            const state = stateByLot.get(Number(bid.lot_id));
            const leading = leadingLots.has(Number(bid.lot_id));
            return <div key={bid.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-7"><div><p className="font-bold text-[#183651]">Kavel {String(lot?.lot_number || "").padStart(3, "0")} · {lot?.title || "Kavel"}</p><p className="mt-1 text-xs text-slate-500">Jouw laatste bod {money(bid.amount)} · {dateTime(bid.created_at)}</p></div><div className="text-right"><span className={"rounded-full px-3 py-1 text-xs font-bold " + (leading ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-900")}>{leading ? "Je hebt het hoogste bod" : "Je bent overboden"}</span><p className="mt-2 text-sm font-bold text-[#183651]">Hoogste bod {money(Number(state?.current_bid || bid.amount))}</p></div></div>;
          })}</div>
        </section>}

        <section className="mt-6 rounded-3xl bg-[#183651] p-6 text-white sm:p-8">
          <p className="text-sm font-bold text-amber-300">{settings?.bidding_enabled ? "Proefbieden staat nu aan" : "De veiling begint op 15 november 2026"}</p>
          <h2 className="mt-2 text-2xl font-extrabold">{settings?.bidding_enabled ? "Test het bieden op een kavel" : "Bekijk nu alvast alle kavels"}</h2>
          <p className="mt-2 max-w-2xl text-blue-100">{settings?.bidding_enabled ? "Open een kavel, plaats een proefbod en controleer hier direct of je nog het hoogste bod hebt." : "Zodra de veiling begint kun je vanuit dit account bieden en zie je hier direct of je nog het hoogste bod hebt."}</p>
          <Link href="/veiling#kavels" className="mt-5 inline-block rounded-xl bg-amber-400 px-5 py-3 font-extrabold text-[#183651]">Bekijk de kavels</Link>
        </section>
      </div>
    </div>
  );
}
