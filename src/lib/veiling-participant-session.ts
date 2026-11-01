import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

export const VEILING_SESSION_COOKIE = "veiling_session";
const SESSION_SECONDS = 30 * 24 * 60 * 60;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function veilingSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_SECONDS,
  };
}

export async function createVeilingParticipantSession(participantId: string) {
  const token = randomBytes(32).toString("hex");
  const admin = getSupabaseAdmin();
  const { error } = await admin.from("veiling_participant_sessions").insert({
    participant_id: participantId,
    token_hash: hashToken(token),
    expires_at: new Date(Date.now() + SESSION_SECONDS * 1000).toISOString(),
  });
  if (error) throw error;
  return token;
}

export async function getCurrentVeilingParticipant() {
  const token = cookies().get(VEILING_SESSION_COOKIE)?.value || "";
  if (!/^[a-f0-9]{64}$/.test(token)) return null;

  const admin = getSupabaseAdmin();
  const { data: session, error } = await admin
    .from("veiling_participant_sessions")
    .select("id,participant_id,expires_at")
    .eq("token_hash", hashToken(token))
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (error || !session) return null;

  const { data: participant, error: participantError } = await admin
    .from("veiling_preregistrations")
    .select("id,name,email,status,confirmed_at")
    .eq("id", session.participant_id)
    .eq("status", "confirmed")
    .maybeSingle();
  if (participantError || !participant) return null;

  void admin.from("veiling_participant_sessions")
    .update({ last_seen_at: new Date().toISOString() })
    .eq("id", session.id);
  return participant;
}

export async function deleteCurrentVeilingParticipantSession(token: string) {
  if (!/^[a-f0-9]{64}$/.test(token)) return;
  const admin = getSupabaseAdmin();
  await admin.from("veiling_participant_sessions").delete().eq("token_hash", hashToken(token));
}

export function hashVeilingToken(token: string) {
  return hashToken(token);
}
