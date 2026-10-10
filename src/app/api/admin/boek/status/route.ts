import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage.from("post-images").list("boeken", { limit: 100 });
    if (error) throw error;
    const file = (data || []).find((item) => item.name === "leven-met-een-bulldog.pdf");
    return NextResponse.json({
      published: Boolean(file),
      updatedAt: file?.updated_at || file?.created_at || null,
    });
  } catch (e: any) {
    return NextResponse.json({ published: false, error: e.message }, { status: 200 });
  }
}
