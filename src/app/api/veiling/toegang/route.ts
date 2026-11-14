import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createVeilingParticipantSession, hashVeilingToken, VEILING_SESSION_COOKIE, veilingSessionCookieOptions } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  if (!/^[a-f0-9]{64}$/.test(token)) {
    return NextResponse.json({ error: "Deze inloglink is ongeldig. Vraag een nieuwe link aan." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Vul het e-mailadres in waarmee je je hebt aangemeld." }, { status: 400 });
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

  // Een extra handmatige controle voorkomt dat een automatische linkscanner uit
  // een mailprogramma de eenmalige token kan verbruiken.
  const { data: participant, error: participantError } = await admin
    .from("veiling_preregistrations")
    .select("email,status")
    .eq("id", data.participant_id)
    .maybeSingle();
  if (participantError || !participant || participant.status !== "confirmed" || participant.email.toLowerCase() !== email) {
    return NextResponse.json({ error: "Dit e-mailadres hoort niet bij deze inloglink." }, { status: 403 });
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
