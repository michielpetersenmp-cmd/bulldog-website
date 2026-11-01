import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const [biddersResult, bidsResult, lotsResult, outboxResult] = await Promise.all([
      admin.from("veiling_test_bidders")
        .select("id,name,email,created_at")
        .order("created_at", { ascending: false })
        .limit(100),
      admin.from("veiling_test_bids")
        .select("id,lot_id,bidder_id,amount,created_at")
        .order("created_at", { ascending: false })
        .limit(50),
      admin.from("veiling_test_lots")
        .select("id,lot_number,title,current_bid,current_bidder_id,closes_at")
        .order("lot_number", { ascending: true }),
      admin.from("veiling_test_outbox")
        .select("id,event_type,bidder_id,lot_id,delivered,created_at")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    const error = biddersResult.error || bidsResult.error || lotsResult.error || outboxResult.error;
    if (error) {
      return NextResponse.json(
        { error: "Het testoverzicht kon niet worden opgehaald." },
        { status: 500, headers: { "Cache-Control": "private, no-store, max-age=0" } }
      );
    }

    return NextResponse.json(
      {
        bidders: biddersResult.data || [],
        bids: bidsResult.data || [],
        lots: lotsResult.data || [],
        outbox: outboxResult.data || [],
      },
      { headers: { "Cache-Control": "private, no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json(
      { error: "Het testoverzicht kon niet worden opgehaald." },
      { status: 500, headers: { "Cache-Control": "private, no-store, max-age=0" } }
    );
  }
}
