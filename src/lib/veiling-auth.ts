import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

const COOKIE_NAME = "veiling_beheer_token";
const ADMIN_EMAIL = (process.env.VEILING_ADMIN_EMAIL || "michielpetersen.mp@gmail.com").trim().toLowerCase();

function authClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Veiling Supabase-configuratie ontbreekt in Preview.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function authenticateVeilingAdmin(email: string, password: string) {
  if (email.trim().toLowerCase() !== ADMIN_EMAIL) return null;
  const client = authClient();
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error || !data.session || !data.user?.email ||
      data.user.email.toLowerCase() !== ADMIN_EMAIL) return null;
  return { accessToken: data.session.access_token, expiresIn: data.session.expires_in };
}

export async function getVeilingAdmin() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const client = authClient();
    const { data, error } = await client.auth.getUser(token);
    if (error || !data.user || data.user.email?.toLowerCase() !== ADMIN_EMAIL) return null;
    return data.user;
  } catch {
    return null;
  }
}

export const VEILING_COOKIE_NAME = COOKIE_NAME;
