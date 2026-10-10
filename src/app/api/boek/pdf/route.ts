import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin.storage
      .from("post-images")
      .download("boeken/leven-met-een-bulldog.pdf");

    if (error || !data) {
      return NextResponse.json({ error: "Boek nog niet gepubliceerd." }, { status: 404 });
    }

    return new NextResponse(await data.arrayBuffer(), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Leven-met-een-Bulldog.pdf"',
        "Cache-Control": "public, max-age=60, s-maxage=60",
      },
    });
  } catch {
    return NextResponse.json({ error: "Boek kon niet worden geladen." }, { status: 500 });
  }
}
