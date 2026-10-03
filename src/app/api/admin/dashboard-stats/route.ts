import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getDonateurs } from "@/lib/donateurs";
import { getSiteStats } from "@/lib/site-stats";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();

    const [siteStats, donateurs, postsRes, verhalenRes, plannerRes] = await Promise.all([
      getSiteStats(),
      getDonateurs(),
      admin.from("posts").select("id", { count: "exact", head: true }),
      admin.from("verhalen").select("id", { count: "exact", head: true }),
      admin.from("planner_evenementen").select("id", { count: "exact", head: true }).eq("published", true),
    ]);

    return NextResponse.json({
      posts: postsRes.count || 0,
      verhalen: verhalenRes.count || 0,
      donateurs: donateurs.length,
      geholpen: siteStats.bulldogsGeholpen,
      donaties: siteStats.donatiesTotaal,
      acties: siteStats.actiesTotaal,
      actiesAfgerond: siteStats.actiesAfgerond,
      actiesLopend: siteStats.actiesLopend,
      opbrengstActies: siteStats.opbrengstActies,
      planner: plannerRes.count || 0,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
