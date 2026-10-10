import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const BOOK_PATH = "boeken/leven-met-een-bulldog.pdf";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Geen PDF gekozen." }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ error: "Kies een PDF-bestand." }, { status: 400 });
    }
    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: "De PDF mag maximaal 20 MB zijn." }, { status: 400 });
    }

    const admin = getSupabaseAdmin();
    const { error } = await admin.storage
      .from("post-images")
      .upload(BOOK_PATH, await file.arrayBuffer(), {
        contentType: "application/pdf",
        upsert: true,
        cacheControl: "60",
      });

    if (error) throw error;
    return NextResponse.json({ ok: true, url: "/api/boek/pdf" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Upload mislukt." }, { status: 500 });
  }
}
