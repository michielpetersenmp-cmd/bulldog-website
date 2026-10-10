import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { getBoekConfig, standaardBoekConfig } from "@/lib/boek";

export async function GET() {
  return NextResponse.json({ boek: await getBoekConfig() });
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const input = body?.boek || {};
    const boek = {
      titel: String(input.titel || standaardBoekConfig.titel),
      subtitel: String(input.subtitel || standaardBoekConfig.subtitel),
      auteur: String(input.auteur || standaardBoekConfig.auteur),
      jaar: String(input.jaar || standaardBoekConfig.jaar),
      cover: String(input.cover || standaardBoekConfig.cover),
      intro: Array.isArray(input.intro) ? input.intro.map((x: any) => String(x)).filter(Boolean) : standaardBoekConfig.intro,
      doelgroep: String(input.doelgroep || standaardBoekConfig.doelgroep),
      homepageTekst: String(input.homepageTekst || standaardBoekConfig.homepageTekst),
    };

    const admin = getSupabaseAdmin();
    const payload = Buffer.from(JSON.stringify(boek, null, 2), "utf-8");

    const { error } = await admin.storage.from("post-images").upload(
      "config/boek.json",
      payload,
      { contentType: "application/json", upsert: true, cacheControl: "60" }
    );
    if (error) throw error;
    return NextResponse.json({ boek });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Opslaan mislukt." }, { status: 500 });
  }
}
