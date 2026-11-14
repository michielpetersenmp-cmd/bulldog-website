import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createVeilingParticipantSession, hashVeilingToken, VEILING_SESSION_COOKIE, veilingSessionCookieOptions } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  if (!/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.json({ error: "Deze inloglink is ongeldig. Vraag een nieuwe link aan." }, { status: 400 });
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
    return NextResponse.json({ error: "Deze inloglink is verlopen of al gebruikt. Vraag een nieuwe link aan." }, { status: 410 });
  }

  const { data: consumed, error: usedError } = await admin
    .from("veiling_login_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", data.id)
    .is("used_at", null)
    .select("id")
    .maybeSingle();
  if (usedError || !consumed) {
    return NextResponse.json({ error: "Deze inloglink is al gebruikt. Vraag een nieuwe link aan." }, { status: 409 });
  }

  try {
    const sessionToken = await createVeilingParticipantSession(data.participant_id);
    const response = NextResponse.json({ ok: true });
    response.cookies.set(VEILING_SESSION_COOKIE, sessionToken, veilingSessionCookieOptions());
    return response;
  } catch {
    await admin.from("veiling_login_tokens").update({ used_at: null }).eq("id", data.id);
    return NextResponse.json({ error: "Inloggen is tijdelijk niet gelukt. Vraag een nieuwe link aan." }, { status: 500 });
  }
}
