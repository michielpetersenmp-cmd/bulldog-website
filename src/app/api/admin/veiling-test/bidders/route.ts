import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
const table = "veiling_test_bidders";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 180) : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase().slice(0, 254) : "";
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Vul een naam en geldig test-e-mailadres in." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data: duplicate, error: duplicateError } = await admin
    .from(table).select("id").ilike("email", email).limit(1).maybeSingle();
  if (duplicateError) return NextResponse.json({ error: "De testdeelnemer kon niet worden gecontroleerd." }, { status: 500 });
  if (duplicate) return NextResponse.json({ error: "Dit e-mailadres staat al bij de testdeelnemers." }, { status: 409 });

  const { data, error } = await admin.from(table).insert({ name, email })
    .select("id,name,email").single();
  if (error || !data) return NextResponse.json({ error: "Testdeelnemer aanmaken is niet gelukt." }, { status: 500 });
  return NextResponse.json({ ok: true, bidder: data, testMode: true });
}
