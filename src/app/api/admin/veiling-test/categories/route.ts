import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim().replace(/\s+/g, " ").slice(0, 80) : "";
  if (!name) return NextResponse.json({ error: "Vul een categorienaam in." }, { status: 400 });

  const admin = getSupabaseAdmin();
  const { data: existing } = await admin
    .from("veiling_test_categories")
    .select("id,name")
    .ilike("name", name)
    .maybeSingle();
  if (existing) return NextResponse.json({ ok: true, category: existing });

  const { data, error } = await admin
    .from("veiling_test_categories")
    .insert({ name })
    .select("id,name")
    .single();

  if (error) return NextResponse.json({ error: "Categorie opslaan is niet gelukt." }, { status: 500 });
  return NextResponse.json({ ok: true, category: data });
}
