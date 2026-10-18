import { NextResponse } from "next/server";
import { authenticateVeilingAdmin, VEILING_COOKIE_NAME } from "@/lib/veiling-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";
  if (!email || !password || email.length > 254 || password.length > 1024) {
    return NextResponse.json({ error: "Vul je e-mailadres en wachtwoord in." }, { status: 400 });
  }
  try {
    const session = await authenticateVeilingAdmin(email, password);
    if (!session) return NextResponse.json({ error: "Geen toegang tot het veilingbeheer. Controleer je accountgegevens." }, { status: 401 });
    const result = NextResponse.json({ ok: true });
    result.cookies.set(VEILING_COOKIE_NAME, session.accessToken, {
      httpOnly: true, secure: process.env.NODE_ENV === "production",
      sameSite: "lax", path: "/",
      maxAge: Math.min(session.expiresIn, 3600),
    });
    return result;
  } catch {
    return NextResponse.json({ error: "De testlogin is nog niet geconfigureerd. Controleer de Supabase-variabelen voor Preview." }, { status: 503 });
  }
}
