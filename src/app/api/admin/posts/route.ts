import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

// GET alle posts
export async function GET() {
  try {
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST nieuwe post aanmaken
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const admin = getSupabaseAdmin();
    const { data, error } = await admin
      .from("posts")
      .insert([body])
      .select()
      .single();
    if (error) throw error;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
