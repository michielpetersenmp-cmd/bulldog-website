import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const COVER_PATH = "boeken/leven-met-een-bulldog-cover.jpg";

export async function POST() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage
      .from("post-images")
      .createSignedUploadUrl(COVER_PATH, { upsert: true });

    if (error) throw error;
    return NextResponse.json({ path: COVER_PATH, token: data.token });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Uploadlink kon niet worden gemaakt." }, { status: 500 });
  }
}
