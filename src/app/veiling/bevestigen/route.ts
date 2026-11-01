import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createVeilingParticipantSession, VEILING_SESSION_COOKIE, veilingSessionCookieOptions } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";

  if (!/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.redirect(new URL("/veiling/bevestigd?status=ongeldig", url.origin));
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
    return NextResponse.redirect(new URL("/veiling/bevestigd?status=ongeldig", url.origin));
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

  if (updateError) {
    return NextResponse.redirect(new URL("/veiling/bevestigd?status=fout", url.origin));
  }

  const sessionToken = await createVeilingParticipantSession(data.id);
  const response = NextResponse.redirect(new URL("/veiling/mijn-account?welkom=1", url.origin));
  response.cookies.set(VEILING_SESSION_COOKIE, sessionToken, veilingSessionCookieOptions());
  return response;
}
