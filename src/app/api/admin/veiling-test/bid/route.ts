import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const bidderId = typeof body?.bidderId === "string" ? body.bidderId : "";
  const lotId = Number(body?.lotId);
  const amount = Number(body?.amount);

  if (!/^[0-9a-f-]{36}$/i.test(bidderId) || !Number.isSafeInteger(lotId) || lotId < 1 ||
      !Number.isSafeInteger(amount) || amount < 1) {
    return NextResponse.json({ error: "Ongeldig testbod." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data: bidder, error: bidderError } = await admin
    .from("veiling_test_bidders").select("access_token").eq("id", bidderId).maybeSingle();
  if (bidderError || !bidder) {
    return NextResponse.json({ error: "Testdeelnemer niet gevonden." }, { status: 404 });
  }

  const { data, error } = await admin.rpc("place_veiling_test_bid", {
    p_access_token: bidder.access_token,
    p_lot_id: lotId,
    p_amount: amount,
  });

  if (error) {
    const msg = error.message || "";
    const friendly =
      msg.includes("BID_TOO_LOW") ? "Iemand heeft je net overboden. Vernieuw de kavels en probeer opnieuw." :
      msg.includes("LOT_CLOSED") ? "Deze kavel is gesloten." :
      msg.includes("BIDDER_NOT_FOUND") ? "De testregistratie is niet meer geldig." :
      "Het bod kon niet worden verwerkt.";
    return NextResponse.json({ error: friendly }, { status: 409 });
  }

  return NextResponse.json({ ok: true, result: data, testMode: true });
}
