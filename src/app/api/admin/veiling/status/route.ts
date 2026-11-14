import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sendVeilingParticipantMail } from "@/lib/veiling-mail";
import { getVeilingStartedTemplate, getVeilingWinnerTemplate } from "@/lib/veiling-mail-templates";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function inBatches<T>(items: T[], worker: (item: T) => Promise<boolean>, size = 4) {
  let sentCount = 0;
  for (let index = 0; index < items.length; index += size) {
    const results = await Promise.all(items.slice(index, index + size).map(worker));
    sentCount += results.filter(Boolean).length;
  }
  return sentCount;
}

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "production") {
    return NextResponse.json({ error: "Deze bediening is alleen beschikbaar op de openbare website." }, { status: 409 });
  }

  const body = await request.json().catch(() => null);
  const action = body?.action;
  const admin = getSupabaseAdmin();
  const origin = new URL(request.url).origin;

  if (action === "open") {
    const { error } = await admin.rpc("open_veiling");
    if (error) {
      const message = error.message || "";
      if (message.includes("AUCTION_ALREADY_CLOSED")) return NextResponse.json({ error: "De afgesloten veiling kan niet opnieuw worden geopend." }, { status: 409 });
      return NextResponse.json({ error: "De veiling kon niet worden geopend." }, { status: 500 });
    }

    const [{ data: pending }, { data: participants }] = await Promise.all([
      admin.from("veiling_outbox").select("id,participant_id").eq("event_type", "started").eq("delivered", false).order("id"),
      admin.from("veiling_preregistrations").select("id,name,email").eq("status", "confirmed"),
    ]);
    const participantById = new Map((participants || []).map(item => [item.id, item]));
    const pendingItems = pending || [];
    const sentCount = await inBatches(pendingItems, async item => {
      const participant = participantById.get(item.participant_id);
      if (!participant) return false;
      try {
        await sendVeilingParticipantMail(participant.email, getVeilingStartedTemplate(participant.name, `${origin}/veiling`, false));
        await admin.from("veiling_outbox").update({ delivered: true, delivered_at: new Date().toISOString() }).eq("id", item.id);
        return true;
      } catch { return false; }
    });
    return NextResponse.json({ ok: true, biddingEnabled: true, sentCount, failedCount: pendingItems.length - sentCount, items: [] });
  }

  if (action !== "close") return NextResponse.json({ error: "Ongeldige actie." }, { status: 400 });

  const { error: closeError } = await admin.rpc("close_veiling");
  if (closeError) return NextResponse.json({ error: "De veiling kon niet worden afgesloten." }, { status: 500 });

  const [{ data: winners, error: winnerError }, { data: participants }, { data: lots }] = await Promise.all([
    admin.from("veiling_winners").select("lot_id,participant_id,amount,notified").order("lot_id"),
    admin.from("veiling_preregistrations").select("id,name,email"),
    admin.from("veiling_test_lots").select("id,lot_number,title"),
  ]);
  if (winnerError) return NextResponse.json({ error: "De winnaars konden niet worden opgehaald." }, { status: 500 });

  const participantById = new Map((participants || []).map(item => [item.id, item]));
  const lotById = new Map((lots || []).map(item => [Number(item.id), item]));
  const unsent = (winners || []).filter(winner => !winner.notified);
  const sentCount = await inBatches(unsent, async winner => {
    const participant = participantById.get(winner.participant_id);
    const lot = lotById.get(Number(winner.lot_id));
    if (!participant || !lot) return false;
    try {
      await sendVeilingParticipantMail(participant.email, getVeilingWinnerTemplate(
        participant.name, lot.lot_number, lot.title, winner.amount, `${origin}/veiling/mijn-account`, false
      ));
      const notifiedAt = new Date().toISOString();
      await Promise.all([
        admin.from("veiling_winners").update({ notified: true, notified_at: notifiedAt }).eq("lot_id", winner.lot_id),
        admin.from("veiling_outbox").update({ delivered: true, delivered_at: notifiedAt }).eq("event_type", "winner").eq("lot_id", winner.lot_id),
      ]);
      winner.notified = true;
      return true;
    } catch { return false; }
  });

  const items = (winners || []).map(winner => {
    const participant = participantById.get(winner.participant_id);
    const lot = lotById.get(Number(winner.lot_id));
    return {
      lot_id: winner.lot_id, lot_number: lot?.lot_number || 0, title: lot?.title || "Kavel",
      participant_name: participant?.name || "Onbekend", participant_email: participant?.email || "",
      amount: winner.amount, notified: winner.notified,
    };
  });
  return NextResponse.json({ ok: true, biddingEnabled: false, winnerCount: items.length, sentCount, failedCount: unsent.length - sentCount, items });
}
