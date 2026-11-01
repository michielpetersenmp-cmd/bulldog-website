import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getCurrentVeilingParticipant } from "@/lib/veiling-participant-session";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const admin = getSupabaseAdmin();
  const [{ data: settings }, { data: states, error }] = await Promise.all([
    admin.from("veiling_participant_test_settings").select("bidding_enabled").eq("id", true).maybeSingle(),
    admin.from("veiling_participant_test_lot_state").select("lot_id,current_bid,bid_count").order("lot_id"),
  ]);
  if (error) return NextResponse.json({ error: "Biedstanden ophalen is niet gelukt." }, { status: 500 });
  return NextResponse.json(
    { biddingEnabled: Boolean(settings?.bidding_enabled), states: states || [] },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const participant = await getCurrentVeilingParticipant();
  if (!participant) return NextResponse.json({ error: "Log eerst in om te kunnen bieden.", loginRequired: true }, { status: 401 });

  const body = await request.json().catch(() => null);
  const lotId = Number(body?.lotId);
  const amount = Number(body?.amount);
  if (!Number.isSafeInteger(lotId) || lotId < 1 || !Number.isSafeInteger(amount) || amount < 1) {
    return NextResponse.json({ error: "Vul een geldig bod in hele euro’s in." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc("place_veiling_participant_test_bid", {
    p_participant_id: participant.id,
    p_lot_id: lotId,
    p_amount: amount,
  });

  if (error) {
    const message = error.message || "";
    if (message.includes("BIDDING_DISABLED")) return NextResponse.json({ error: "Testbieden is op dit moment gesloten." }, { status: 409 });
    if (message.includes("BID_TOO_LOW")) return NextResponse.json({ error: "Je bod is inmiddels te laag. Ververs de biedstand en probeer opnieuw." }, { status: 409 });
    if (message.includes("LOT_CLOSED") || message.includes("LOT_NOT_FOUND")) return NextResponse.json({ error: "Op dit kavel kan niet worden geboden." }, { status: 409 });
    return NextResponse.json({ error: "Je bod kon niet worden opgeslagen. Probeer het opnieuw." }, { status: 500 });
  }

  return NextResponse.json({ ...data, testMode: true });
}
