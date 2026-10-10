import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const BOOK_PATH = "boeken/leven-met-een-bulldog.pdf";

export async function POST() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage
      .from("post-images")
      .createSignedUploadUrl(BOOK_PATH, { upsert: true });

    if (error) throw error;

    return NextResponse.json({
      path: BOOK_PATH,
      token: data.token,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Uploadlink kon niet worden gemaakt." },
      { status: 500 }
    );
  }
}
