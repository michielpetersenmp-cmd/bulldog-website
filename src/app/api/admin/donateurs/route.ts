import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getDonateurs, standaardDonateurs } from "@/lib/donateurs";

export async function GET() {
  const donateurs = await getDonateurs();
  return NextResponse.json({ donateurs });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const donateurs = Array.isArray(body?.donateurs) ? body.donateurs : null;

    if (!donateurs) {
      return NextResponse.json({ error: "Ongeldige gegevens" }, { status: 400 });
    }

    const cleaned = donateurs
      .filter((d: any) => d && d.naam && d.slug)
      .map((d: any) => ({
        slug: String(d.slug),
        naam: String(d.naam),
        korteOmschrijving: String(d.korteOmschrijving || ""),
        verhaal: Array.isArray(d.verhaal)
          ? d.verhaal.map((v: any) => String(v)).filter(Boolean)
          : String(d.verhaal || "").split("\n\n").map((v) => v.trim()).filter(Boolean),
        logo: d.logo ? String(d.logo) : undefined,
        afbeelding: d.afbeelding ? String(d.afbeelding) : undefined,
        website: d.website ? String(d.website) : undefined,
        facebook: d.facebook ? String(d.facebook) : undefined,
        instagram: d.instagram ? String(d.instagram) : undefined,
        whatsapp: d.whatsapp ? String(d.whatsapp) : undefined,
        plaats: d.plaats ? String(d.plaats) : undefined,
        bijdrage: d.bijdrage ? String(d.bijdrage) : undefined,
      }));

    const admin = getSupabaseAdmin();
    const payload = new Blob([JSON.stringify(cleaned, null, 2)], { type: "application/json" });

    const { error } = await admin.storage
      .from("post-images")
      .upload("config/donateurs.json", payload, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) throw error;

    return NextResponse.json({ ok: true, donateurs: cleaned });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const admin = getSupabaseAdmin();
    await admin.storage.from("post-images").remove(["config/donateurs.json"]);
    return NextResponse.json({ ok: true, donateurs: standaardDonateurs });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
