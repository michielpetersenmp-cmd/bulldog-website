import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";
import { sendVeilingParticipantMail } from "@/lib/veiling-mail";
import { getVeilingOutbidTemplate } from "@/lib/veiling-mail-templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const testMode = process.env.VERCEL_ENV !== "production";
  const admin = getSupabaseAdmin();
  const [{ data: settings }, { data: states, error }] = await Promise.all([
    admin.from(testMode ? "veiling_participant_test_settings" : "veiling_settings").select("bidding_enabled,closed_at").eq("id", true).maybeSingle(),
    admin.from(testMode ? "veiling_participant_test_lot_state" : "veiling_lot_state").select("lot_id,current_bid,bid_count").order("lot_id"),
  ]);
  if (error) return NextResponse.json({ error: "Biedstanden ophalen is niet gelukt." }, { status: 500 });
  return NextResponse.json(
    { biddingEnabled: Boolean(settings?.bidding_enabled), auctionClosed: Boolean(settings?.closed_at), states: states || [] },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const testMode = process.env.VERCEL_ENV !== "production";
  const participant = await getCurrentVeilingParticipant();
  if (!participant) return NextResponse.json({ error: "Log eerst in om te kunnen bieden.", loginRequired: true }, { status: 401 });

  const body = await request.json().catch(() => null);
  const lotId = Number(body?.lotId);
  const amount = Number(body?.amount);
  if (!Number.isSafeInteger(lotId) || lotId < 1 || !Number.isSafeInteger(amount) || amount < 1) {
    return NextResponse.json({ error: "Vul een geldig bod in hele euro’s in." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc(testMode ? "place_veiling_participant_test_bid" : "place_veiling_bid", {
    p_participant_id: participant.id,
    p_lot_id: lotId,
    p_amount: amount,
  });

  if (error) {
    const message = error.message || "";
    if (message.includes("BIDDING_DISABLED")) return NextResponse.json({ error: testMode ? "Testbieden is op dit moment gesloten." : "Bieden is op dit moment gesloten." }, { status: 409 });
    if (message.includes("BID_TOO_LOW")) return NextResponse.json({ error: "Je bod is inmiddels te laag. Ververs de biedstand en probeer opnieuw." }, { status: 409 });
    if (message.includes("LOT_CLOSED") || message.includes("LOT_NOT_FOUND")) return NextResponse.json({ error: "Op dit kavel kan niet worden geboden." }, { status: 409 });
    return NextResponse.json({ error: "Je bod kon niet worden opgeslagen. Probeer het opnieuw." }, { status: 500 });
  }

  let notificationSent = false;
  if (data?.outbox_id) {
    const { data: outbox } = await admin
      .from(testMode ? "veiling_participant_test_outbox" : "veiling_outbox")
      .select("id,participant_id,lot_id")
      .eq("id", data.outbox_id)
      .maybeSingle();

    if (outbox) {
      const [{ data: previousParticipant }, { data: lot }] = await Promise.all([
        admin.from("veiling_preregistrations").select("name,email").eq("id", outbox.participant_id).maybeSingle(),
        admin.from("veiling_test_lots").select("lot_number,title").eq("id", outbox.lot_id).maybeSingle(),
      ]);
      if (previousParticipant && lot) {
        const origin = new URL(request.url).origin;
        const template = getVeilingOutbidTemplate(
          previousParticipant.name,
          lot.lot_number,
          lot.title,
          Number(data.amount),
          `${origin}/veiling#kavels`,
          testMode
        );
        try {
          await sendVeilingParticipantMail(previousParticipant.email, template);
          await admin.from(testMode ? "veiling_participant_test_outbox" : "veiling_outbox").update({ delivered: true, ...(testMode ? {} : { delivered_at: new Date().toISOString() }) }).eq("id", outbox.id);
          notificationSent = true;
        } catch {
          notificationSent = false;
        }
      }
    }
  }

  return NextResponse.json({ ...data, testMode, notificationSent });
}
