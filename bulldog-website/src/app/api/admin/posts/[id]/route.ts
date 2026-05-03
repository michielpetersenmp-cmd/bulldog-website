import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// PUT post updaten
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("posts")
      .update(body)
      .eq("id", params.id)
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE post verwijderen
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const admin = getSupabaseAdmin();
    const { error } = await admin.from("posts").delete().eq("id", params.id);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
