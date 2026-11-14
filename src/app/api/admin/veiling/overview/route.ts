import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = getSupabaseAdmin();
  const [registrations, lots, bids, states, outbox] = await Promise.all([
    admin.from("veiling_preregistrations").select("id,name,email").eq("status", "confirmed").order("created_at", { ascending: false }).limit(500),
    admin.from("veiling_test_lots").select("id,lot_number,title").order("lot_number"),
    admin.from("veiling_bids").select("id,lot_id,participant_id,amount,created_at").order("created_at", { ascending: false }).limit(500),
    admin.from("veiling_lot_state").select("lot_id,current_bidder_id,current_bid"),
    admin.from("veiling_outbox").select("id,participant_id,lot_id,created_at").eq("event_type", "outbid").order("created_at", { ascending: false }).limit(200),
  ]);
  const error = registrations.error || lots.error || bids.error || states.error || outbox.error;
  if (error) return NextResponse.json({ error: "Het live overzicht kon niet worden opgehaald." }, { status: 500 });
  return NextResponse.json({
    registrations: registrations.data || [], lots: lots.data || [], bids: bids.data || [],
    states: states.data || [], outbox: outbox.data || [],
  }, { headers: { "Cache-Control": "private, no-store, max-age=0" } });
}
