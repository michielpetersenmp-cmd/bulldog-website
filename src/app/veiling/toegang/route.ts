import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createVeilingParticipantSession, hashVeilingToken, VEILING_SESSION_COOKIE, veilingSessionCookieOptions } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token") || "";
  if (!/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.redirect(new URL("/veiling/inloggen?status=ongeldig", url.origin));
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("veiling_login_tokens")
    .select("id,participant_id")
    .eq("token_hash", hashVeilingToken(token))
    .is("used_at", null)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();

  if (error || !data) {
    return NextResponse.redirect(new URL("/veiling/inloggen?status=ongeldig", url.origin));
  }

  const { error: usedError } = await admin
    .from("veiling_login_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", data.id)
    .is("used_at", null);
  if (usedError) return NextResponse.redirect(new URL("/veiling/inloggen?status=fout", url.origin));

  const sessionToken = await createVeilingParticipantSession(data.participant_id);
  const response = NextResponse.redirect(new URL("/veiling/mijn-account", url.origin));
  response.cookies.set(VEILING_SESSION_COOKIE, sessionToken, veilingSessionCookieOptions());
  return response;
}
