import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const ADMIN_EMAIL = "michielpetersen.mp@gmail.com";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;
  const email = String(body?.email || ADMIN_EMAIL).toLowerCase();

  if (!process.env.ADMIN_SECRET || typeof password !== "string") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let authenticated = false;

  // Nieuwe beheerlogin via Supabase Auth.
  if (email === ADMIN_EMAIL) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { error } = await supabase.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password,
      });
      authenticated = !error;
    } catch {
      authenticated = false;
    }
  }

  // Bestaande Vercel ADMIN_SECRET blijft voorlopig ook werken.
  if (!authenticated && password === process.env.ADMIN_SECRET) {
    authenticated = true;
  }

  if (!authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", process.env.ADMIN_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return response;
}
