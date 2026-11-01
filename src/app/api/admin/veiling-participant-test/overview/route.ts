import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const [registrations, lots, bids, states, outbox] = await Promise.all([
      admin.from("veiling_preregistrations").select("id,name,email").eq("status", "confirmed").order("created_at", { ascending: false }).limit(500),
      admin.from("veiling_test_lots").select("id,lot_number,title").order("lot_number"),
      admin.from("veiling_participant_test_bids").select("id,lot_id,participant_id,amount,created_at").order("created_at", { ascending: false }).limit(200),
      admin.from("veiling_participant_test_lot_state").select("lot_id,current_bidder_id,current_bid"),
      admin.from("veiling_participant_test_outbox").select("id,participant_id,lot_id,created_at").order("created_at", { ascending: false }).limit(100),
    ]);
    const error = registrations.error || lots.error || bids.error || states.error || outbox.error;
    if (error) throw error;
    return NextResponse.json({
      registrations: registrations.data || [],
      lots: lots.data || [],
      bids: bids.data || [],
      states: states.data || [],
      outbox: outbox.data || [],
    }, { headers: { "Cache-Control": "private, no-store, max-age=0" } });
  } catch {
    return NextResponse.json({ error: "De proefbiedingen konden niet worden opgehaald." }, { status: 500 });
  }
}
