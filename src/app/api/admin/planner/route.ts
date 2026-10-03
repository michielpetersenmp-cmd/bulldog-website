import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("planner_evenementen")
      .select("*")
      .order("datum", { ascending: true });
    if (error) throw error;
    return NextResponse.json({ evenementen: data || [] });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    const payload = {
      titel: body.titel,
      beschrijving: body.beschrijving || null,
      datum: body.datum,
      tijd_start: body.tijd_start || null,
      tijd_eind: body.tijd_eind || null,
      deadline_datum: body.deadline_datum || null,
      deadline_tijd: body.deadline_tijd || null,
      locatie: body.locatie || null,
      locatie_url: body.locatie_url || null,
      type: body.type || "evenement",
      afbeelding_url: body.afbeelding_url || null,
      inschrijving_url: body.inschrijving_url || null,
      max_deelnemers: body.max_deelnemers ? Number(body.max_deelnemers) : null,
      published: !!body.published,
      featured: !!body.featured,
      herinnering_dag_ervoor: body.herinnering_dag_ervoor !== false,
      herinnering_bij_start: body.herinnering_bij_start !== false,
      herinnering_deadline: body.herinnering_deadline !== false,
    };
    const { data, error } = await supabase.from("planner_evenementen").insert(payload).select().single();
    if (error) throw error;
    return NextResponse.json({ evenement: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const body = await request.json();
    if (!body.id) return NextResponse.json({ error: "ID ontbreekt" }, { status: 400 });
    const payload = {
      titel: body.titel,
      beschrijving: body.beschrijving || null,
      datum: body.datum,
      tijd_start: body.tijd_start || null,
      tijd_eind: body.tijd_eind || null,
      deadline_datum: body.deadline_datum || null,
      deadline_tijd: body.deadline_tijd || null,
      locatie: body.locatie || null,
      locatie_url: body.locatie_url || null,
      type: body.type || "evenement",
      afbeelding_url: body.afbeelding_url || null,
      inschrijving_url: body.inschrijving_url || null,
      max_deelnemers: body.max_deelnemers ? Number(body.max_deelnemers) : null,
      published: !!body.published,
      featured: !!body.featured,
      herinnering_dag_ervoor: body.herinnering_dag_ervoor !== false,
      herinnering_bij_start: body.herinnering_bij_start !== false,
      herinnering_deadline: body.herinnering_deadline !== false,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from("planner_evenementen").update(payload).eq("id", body.id).select().single();
    if (error) throw error;
    return NextResponse.json({ evenement: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: "ID ontbreekt" }, { status: 400 });
    const { error } = await supabase.from("planner_evenementen").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
