import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { VEILING_COOKIE_NAME } from "@/lib/veiling-auth";

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") {
    return NextResponse.json({ error: "Alleen beschikbaar in de veilingtest." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const accessToken = typeof body?.accessToken === "string" ? body.accessToken : "";
  if (!accessToken || accessToken.length > 8000) {
    return NextResponse.json({ error: "Ongeldige inloglink." }, { status: 400 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "Preview-configuratie ontbreekt." }, { status: 503 });
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data, error } = await supabase.auth.getUser(accessToken);
  const allowedEmail = (process.env.VEILING_ADMIN_EMAIL || "michielpetersen.mp@gmail.com").toLowerCase();
  if (error || !data.user || data.user.email?.toLowerCase() !== allowedEmail) {
    return NextResponse.json({ error: "Geen toegang tot het veilingbeheer." }, { status: 403 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(VEILING_COOKIE_NAME, accessToken, {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 3600,
  });
  return response;
}
