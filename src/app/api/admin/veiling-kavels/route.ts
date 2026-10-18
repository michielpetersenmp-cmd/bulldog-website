import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";
function safeLink(value: unknown) { const s = String(value || "").trim(); if (!s) return ""; try { const u = new URL(s); return (u.protocol === "https:" || u.protocol === "http:") && s.length <= 500 ? s : null; } catch { return null; } }
function parse(body: any) {
  const number = Number(body.lot_number), start = Number(body.start_bid);
  const title = String(body.title || "").trim();
  if (!Number.isInteger(number) || number < 1 || number > 99999 || !title || title.length > 180 ||
      !Number.isInteger(start) || start < 0 || start > 10000000) return null;
  const sponsor_website = safeLink(body.sponsor_website), sponsor_facebook = safeLink(body.sponsor_facebook);
  if (sponsor_website === null || sponsor_facebook === null) return null;
  const image_url = String(body.image_url || "").trim();
  if (image_url && !/^kavels\/[a-f0-9-]{36}\.(jpg|png|webp)$/.test(image_url)) return null;
  return { lot_number: number, title, sponsor_website, sponsor_facebook, image_url: image_url || null, sponsor: String(body.sponsor || "").trim().slice(0,180),
    description: String(body.description || "").trim().slice(0,4000), start_bid: start, active: body.active === true };
}
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const data = body && parse(body);
  if (!data) return NextResponse.json({ error: "Controleer titel, kavelnummer en startbedrag (hele euro's)." }, { status: 400 });
  const { error } = await getSupabaseAdmin().from("veiling_test_lots").insert({ ...data, current_bid: data.start_bid, bid_count: 0 });
  return error ? NextResponse.json({ error: "Opslaan mislukt. Is het kavelnummer al in gebruik?" }, { status: 400 }) : NextResponse.json({ ok: true });
}
export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const id = Number(body?.id), data = body && parse(body);
  if (!Number.isSafeInteger(id) || id < 1 || !data) return NextResponse.json({ error: "Ongeldige gegevens." }, { status: 400 });
  const admin = getSupabaseAdmin();
  const { data: existing, error: findError } = await admin.from("veiling_test_lots")
    .select("start_bid,current_bid,bid_count").eq("id",id).single();
  if (findError || !existing) return NextResponse.json({ error: "Kavel niet gevonden." }, { status: 404 });
  // Bid history is immutable. Do not rewrite price after bidding starts.
  if (existing.bid_count > 0 && existing.start_bid !== data.start_bid)
    return NextResponse.json({ error: "Het startbedrag kan niet worden aangepast nadat er is geboden." }, { status: 409 });
  const update = { ...data, ...(existing.bid_count === 0 ? { current_bid: data.start_bid } : {}), updated_at: new Date().toISOString() };
  const { error } = await admin.from("veiling_test_lots").update(update).eq("id",id).eq("bid_count",existing.bid_count);
  return error ? NextResponse.json({ error: "Het opslaan is niet gelukt." }, { status: 400 }) : NextResponse.json({ ok: true });
}
