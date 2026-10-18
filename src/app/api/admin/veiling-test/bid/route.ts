import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const accessToken = String(body?.accessToken || "");
  const lotId = Number(body?.lotId);
  const amount = Number(body?.amount);

  if (!accessToken || !Number.isInteger(lotId) || !Number.isInteger(amount)) {
    return NextResponse.json({ error: "Ongeldig testbod." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin.rpc("place_veiling_test_bid", {
    p_access_token: accessToken,
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
