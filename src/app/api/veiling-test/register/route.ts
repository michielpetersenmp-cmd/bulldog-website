import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase";

function authorized() {
  return !!process.env.ADMIN_SECRET && cookies().get("admin_token")?.value === process.env.ADMIN_SECRET;
}

export async function POST(request: Request) {
  if (!authorized()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => null);
  const name = String(body?.name || "").trim().slice(0, 100);
  const email = String(body?.email || "").trim().toLowerCase().slice(0, 200);

  if (name.length < 2 || !email.includes("@")) {
    return NextResponse.json({ error: "Vul een geldige testnaam en e-mailadres in." }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  const { data, error } = await admin
    .from("veiling_test_bidders")
    .upsert({ name, email, updated_at: new Date().toISOString() }, { onConflict: "email" })
    .select("id,name,email,access_token")
    .single();

  if (error || !data) return NextResponse.json({ error: "Registratie mislukt." }, { status: 500 });

  const response = NextResponse.json({ ok: true, bidder: { name: data.name, email: data.email }, testMode: true });
  response.cookies.set("veiling_test_bidder", data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/veiling",
    maxAge: 60 * 60 * 24,
  });
  return response;
}
