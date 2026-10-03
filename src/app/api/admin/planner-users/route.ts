import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const [{ count: usersCount }, { count: pushCount }] = await Promise.all([
      admin.from("planner_profielen").select("id", { count: "exact", head: true }),
      admin.from("push_subscriptions").select("id", { count: "exact", head: true }),
    ]);

    return NextResponse.json({
      gebruikers: usersCount || 0,
      pushAbonnementen: pushCount || 0,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
