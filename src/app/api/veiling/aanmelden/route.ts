import { createHash, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getVeilingMailStatus, sendVeilingRegistrationMail } from "@/lib/veiling-mail";
import { getVeilingRegistrationTemplate } from "@/lib/veiling-mail-templates";

export const runtime = "nodejs";

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().replace(/\s+/g, " ").slice(0, 180) : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  const website = typeof body?.website === "string" ? body.website.trim() : "";

  if (website) return NextResponse.json({ ok: true });
  if (name.length < 2 || !validEmail(email)) {
    return NextResponse.json({ error: "Vul je naam en een geldig e-mailadres in." }, { status: 400 });
  }

  const mailStatus = getVeilingMailStatus();
  if (!mailStatus.configured) {
    return NextResponse.json({ error: "De e-mailverbinding is tijdelijk niet beschikbaar." }, { status: 503 });
  }

  const admin = getSupabaseAdmin();
  const { data: existing, error: lookupError } = await admin
    .from("veiling_preregistrations")
    .select("id,status")
    .eq("email", email)
    .maybeSingle();

  if (lookupError) return NextResponse.json({ error: "Aanmelden is nu niet gelukt. Probeer het later opnieuw." }, { status: 500 });
  if (existing?.status === "confirmed") {
    return NextResponse.json({ ok: true, alreadyConfirmed: true, testMode: !mailStatus.liveDeliveryEnabled });
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

  const values = {
    name,
    email,
    status: "pending",
    confirmation_token_hash: tokenHash,
    confirmation_expires_at: expiresAt,
    confirmed_at: null,
    notifications_enabled: true,
    updated_at: new Date().toISOString(),
  };

  const save = existing
    ? admin.from("veiling_preregistrations").update(values).eq("id", existing.id)
    : admin.from("veiling_preregistrations").insert(values);
  const { error: saveError } = await save;
  if (saveError) return NextResponse.json({ error: "Aanmelden is nu niet gelukt. Probeer het later opnieuw." }, { status: 500 });

  const origin = new URL(request.url).origin;
  const confirmUrl = `${origin}/veiling/bevestigen?token=${token}`;
  const template = getVeilingRegistrationTemplate(name, confirmUrl, !mailStatus.liveDeliveryEnabled);

  try {
    const sent = await sendVeilingRegistrationMail(email, template);
    return NextResponse.json({ ok: true, testMode: sent.testMode });
  } catch {
    return NextResponse.json({ error: "Je gegevens zijn bewaard, maar de bevestigingsmail kon niet worden verstuurd. Probeer je aanmelding nogmaals." }, { status: 502 });
  }
}
