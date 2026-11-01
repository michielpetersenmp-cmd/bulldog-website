import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getVeilingMailStatus, sendVeilingParticipantMail } from "@/lib/veiling-mail";
import { getVeilingLoginTemplate } from "@/lib/veiling-mail-templates";
import { hashVeilingToken } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Vul een geldig e-mailadres in." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data: participant } = await admin
    .from("veiling_preregistrations")
    .select("id,name,email,status")
    .eq("email", email)
    .eq("status", "confirmed")
    .maybeSingle();

  const status = getVeilingMailStatus();
  if (participant && status.configured) {
    const token = randomBytes(32).toString("hex");
    const { error } = await admin.from("veiling_login_tokens").insert({
      participant_id: participant.id,
      token_hash: hashVeilingToken(token),
      expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    });
    if (!error) {
      const origin = new URL(request.url).origin;
      const template = getVeilingLoginTemplate(participant.name, `${origin}/veiling/toegang?token=${token}`, !status.liveDeliveryEnabled);
      await sendVeilingParticipantMail(participant.email, template).catch(() => null);
    }
  }

  return NextResponse.json({
    ok: true,
    testMode: !status.liveDeliveryEnabled,
    message: status.liveDeliveryEnabled
      ? "Als dit e-mailadres is bevestigd, ontvang je binnen enkele minuten een inloglink."
      : "Testmodus: als dit e-mailadres is bevestigd, gaat de inloglink naar de mailbox van de stichting.",
  });
}
