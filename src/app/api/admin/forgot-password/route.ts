import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase";

const ADMIN_EMAIL = "michielpetersen.mp@gmail.com";

export async function POST(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    const admin = getSupabaseAdmin();

    // Zorg dat het beheeraccount in Supabase Auth bestaat.
    let page = 1;
    let found = false;
    while (page <= 5 && !found) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 100 });
      if (error) throw error;
      found = data.users.some((user) => user.email?.toLowerCase() === ADMIN_EMAIL);
      if (data.users.length < 100) break;
      page += 1;
    }

    if (!found) {
      const tempPassword = `Tmp-${crypto.randomUUID()}-aA1!`;
      const { error } = await admin.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: tempPassword,
        email_confirm: true,
      });
      if (error) throw error;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.resetPasswordForEmail(ADMIN_EMAIL, {
      redirectTo: `${origin}/admin/reset-password`,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Resetmail kon niet worden verstuurd." },
      { status: 500 }
    );
  }
}
