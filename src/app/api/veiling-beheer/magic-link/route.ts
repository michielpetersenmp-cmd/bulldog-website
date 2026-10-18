import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const allowedEmail = (process.env.VEILING_ADMIN_EMAIL || "michielpetersen.mp@gmail.com").toLowerCase();

export async function POST(request: Request) {
  if (process.env.VERCEL_ENV !== "preview") {
    return NextResponse.json({ error: "Deze functie werkt alleen in de veiling-Preview." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const email = String(body?.email || "").trim().toLowerCase();
  if (email !== allowedEmail) {
    return NextResponse.json({ error: "Dit e-mailadres heeft geen toegang tot het veilingbeheer." }, { status: 403 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase is nog niet ingesteld voor Preview." }, { status: 503 });
  }
  // The preview origin must be explicitly allowlisted in Supabase Auth Redirect URLs.
  const origin = new URL(request.url).origin;
  if (!new URL(origin).hostname.endsWith(".vercel.app")) {
    return NextResponse.json({ error: "Gebruik de veilige Vercel-testlink." }, { status: 403 });
  }
  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: origin + "/veiling/beheer/bevestigen",
    },
  });
  if (error) {
    return NextResponse.json({ error: "Versturen is nog niet gelukt. Controleer de e-mailinstellingen van Supabase." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
