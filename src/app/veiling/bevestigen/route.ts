import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  const destination = new URL("/veiling/bevestigd", url.origin);

  if (!/^[a-f0-9]{64}$/.test(token)) {
    destination.searchParams.set("status", "ongeldig");
    return NextResponse.redirect(destination);
  }

  const hash = createHash("sha256").update(token).digest("hex");
  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("veiling_preregistrations")
    .select("id")
    .eq("confirmation_token_hash", hash)
    .eq("status", "pending")
    .gt("confirmation_expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) {
    destination.searchParams.set("status", "ongeldig");
    return NextResponse.redirect(destination);
  }

  const { error: updateError } = await admin
    .from("veiling_preregistrations")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirmation_token_hash: null,
      confirmation_expires_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id);

  destination.searchParams.set("status", updateError ? "fout" : "bevestigd");
  return NextResponse.redirect(destination);
}
