import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { standaardBoekConfig } from "@/lib/boek";

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const boek = {
      titel: String(form.get("titel") || standaardBoekConfig.titel),
      subtitel: String(form.get("subtitel") || standaardBoekConfig.subtitel),
      auteur: String(form.get("auteur") || standaardBoekConfig.auteur),
      jaar: String(form.get("jaar") || standaardBoekConfig.jaar),
      cover: String(form.get("cover") || standaardBoekConfig.cover),
      intro: [
        String(form.get("intro1") || ""),
        String(form.get("intro2") || ""),
        String(form.get("intro3") || ""),
      ].filter(Boolean),
      doelgroep: String(form.get("doelgroep") || standaardBoekConfig.doelgroep),
      homepageTekst: String(form.get("homepageTekst") || standaardBoekConfig.homepageTekst),
    };

    const admin = getSupabaseAdmin();
    const { error } = await admin
      .from("site_config")
      .upsert(
        { key: "boek", value: boek, updated_at: new Date().toISOString() },
        { onConflict: "key" }
      );

    if (error) throw error;

    const url = new URL("/admin/boek?saved=1", request.url);
    return NextResponse.redirect(url, 303);
  } catch (e: any) {
    const url = new URL("/admin/boek?save_error=1", request.url);
    url.searchParams.set("message", e?.message || "Opslaan mislukt");
    return NextResponse.redirect(url, 303);
  }
}
