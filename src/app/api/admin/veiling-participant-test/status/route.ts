import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendVeilingParticipantMail } from "@/lib/veiling-mail";
import { getVeilingWinnerTemplate } from "@/lib/veiling-mail-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const action = body?.action;
  const admin = getSupabaseAdmin();

  if (action === "open") {
    const { error } = await admin.rpc("open_veiling_participant_test");
    if (error) return NextResponse.json({ error: "De proefveiling kon niet worden geopend." }, { status: 500 });
    return NextResponse.json({ ok: true, biddingEnabled: true, items: [] });
  }
  if (action !== "close") {
    return NextResponse.json({ error: "Ongeldige actie." }, { status: 400 });
  }

  const { error: closeError } = await admin.rpc("close_veiling_participant_test");
  if (closeError) return NextResponse.json({ error: "De proefveiling kon niet worden afgesloten." }, { status: 500 });

  const [{ data: winners, error: winnerError }, { data: participants }, { data: lots }] = await Promise.all([
    admin.from("veiling_participant_test_winners").select("lot_id,participant_id,amount,notified").order("lot_id"),
    admin.from("veiling_preregistrations").select("id,name,email"),
    admin.from("veiling_test_lots").select("id,lot_number,title"),
  ]);
  if (winnerError) return NextResponse.json({ error: "De winnaars konden niet worden opgehaald." }, { status: 500 });

  const participantById = new Map((participants || []).map(item => [item.id, item]));
  const lotById = new Map((lots || []).map(item => [Number(item.id), item]));
  let sentCount = 0;
  const origin = new URL(request.url).origin;

  for (const winner of winners || []) {
    if (winner.notified) continue;
    const participant = participantById.get(winner.participant_id);
    const lot = lotById.get(Number(winner.lot_id));
    if (!participant || !lot) continue;
    const template = getVeilingWinnerTemplate(
      participant.name, lot.lot_number, lot.title, winner.amount,
      `${origin}/veiling/mijn-account`, true
    );
    try {
      await sendVeilingParticipantMail(participant.email, template);
      await admin.from("veiling_participant_test_winners")
        .update({ notified: true, notified_at: new Date().toISOString() })
        .eq("lot_id", winner.lot_id);
      winner.notified = true;
      sentCount += 1;
    } catch {}
  }

  const items = (winners || []).map(winner => {
    const participant = participantById.get(winner.participant_id);
    const lot = lotById.get(Number(winner.lot_id));
    return {
      lot_id: winner.lot_id,
      lot_number: lot?.lot_number || 0,
      title: lot?.title || "Kavel",
      participant_name: participant?.name || "Onbekend",
      participant_email: participant?.email || "",
      amount: winner.amount,
      notified: winner.notified,
    };
  });

  return NextResponse.json({
    ok: true, biddingEnabled: false, winnerCount: items.length, sentCount, items,
  });
}
