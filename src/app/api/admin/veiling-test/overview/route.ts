import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function getDiagnostics() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  let projectRef = "onbekend";
  try { projectRef = new URL(supabaseUrl).hostname.split(".")[0] || "onbekend"; } catch {}
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  let keyRole = "niet vast te stellen";
  try {
    const payload = key.split(".")[1];
    const role = payload ? JSON.parse(Buffer.from(payload, "base64url").toString("utf8")).role : null;
    if (typeof role === "string") keyRole = role;
    else if (key.startsWith("sb_secret_")) keyRole = "Supabase secret key";
  } catch {
    if (key.startsWith("sb_secret_")) keyRole = "Supabase secret key";
  }
  return { projectRef, keyRole };
}

export async function GET() {
  const diagnostics = getDiagnostics();
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
        .select("id,lot_number,title,current_bid,current_bidder_id,active,closes_at")
        .order("lot_number", { ascending: true }),
      admin.from("veiling_test_outbox")
        .select("id,event_type,bidder_id,lot_id,delivered,created_at")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    const error = biddersResult.error || bidsResult.error || lotsResult.error || outboxResult.error;
    if (error) {
      return NextResponse.json(
        { error: "Het testoverzicht kon niet worden opgehaald.", diagnostics },
        { status: 500, headers: { "Cache-Control": "private, no-store, max-age=0" } }
      );
    }

    return NextResponse.json(
      {
        diagnostics,
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
