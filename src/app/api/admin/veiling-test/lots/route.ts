import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
const table = "veiling_test_lots";

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function optionalLink(value: unknown, allowedHosts?: string[]) {
  const raw = text(value, 500);
  if (!raw) return null;
  const candidate = /^[a-z][a-z\d+.-]*:\/\//i.test(raw) ? raw : "https://" + raw;
  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    if (url.username || url.password) return undefined;
    if (allowedHosts && !allowedHosts.some(host => url.hostname === host || url.hostname.endsWith("." + host))) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function parse(body: any) {
  const lotNumber = Number(body?.lot_number);
  const startBid = Number(body?.start_bid);
  const title = text(body?.title, 180);
  if (!Number.isInteger(lotNumber) || lotNumber < 1 || !title || !Number.isInteger(startBid) || startBid < 0) return null;

  const images: string[] = Array.isArray(body?.image_urls)
    ? Array.from(new Set((body.image_urls as unknown[]).filter((item): item is string => typeof item === "string" && /^kavels\/[a-f0-9-]+\.(jpg|png|webp)$/i.test(item))))
    : [];
  const requestedPrimary = typeof body?.image_url === "string" && images.includes(body.image_url) ? body.image_url : images[0] || null;
  const orderedImages = requestedPrimary ? [requestedPrimary, ...images.filter((item: string) => item !== requestedPrimary)] : images;

  const website = optionalLink(body?.sponsor_website);
  const facebook = optionalLink(body?.sponsor_facebook, ["facebook.com", "fb.com"]);
  const instagram = optionalLink(body?.sponsor_instagram, ["instagram.com"]);
  if (website === undefined || facebook === undefined || instagram === undefined) return null;

  return {
    lot_number: lotNumber,
    title,
    description: text(body?.description, 12000) || null,
    sponsor: text(body?.sponsor, 180) || null,
    sponsor_website: website,
    sponsor_facebook: facebook,
    sponsor_instagram: instagram,
    start_bid: startBid,
    active: body?.active !== false,
    image_url: requestedPrimary,
    image_urls: orderedImages,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const values = parse(body);
  if (!values) return NextResponse.json({ error: "Controleer kavelnummer, titel, startbod en sponsorlinks." }, { status: 400 });

  const admin = getSupabaseAdmin();
  const { data: duplicate } = await admin.from(table).select("id").eq("lot_number", values.lot_number).maybeSingle();
  if (duplicate) return NextResponse.json({ error: "Dit kavelnummer is al in gebruik." }, { status: 409 });

  const { data, error } = await admin.from(table).insert({
    ...values,
    current_bid: values.start_bid,
    bid_count: 0,
  }).select("id").single();
  if (error) return NextResponse.json({ error: "Kavel opslaan is niet gelukt." }, { status: 500 });
  return NextResponse.json({ ok: true, id: data.id, testMode: true });
}

export async function PATCH(request: Request) {
  const body = await request.json().catch(() => null);
  const id = Number(body?.id);
  const values = parse(body);
  if (!Number.isInteger(id) || !values) return NextResponse.json({ error: "Controleer de kavelgegevens." }, { status: 400 });

  const admin = getSupabaseAdmin();
  const { data: duplicate } = await admin.from(table).select("id").eq("lot_number", values.lot_number).neq("id", id).maybeSingle();
  if (duplicate) return NextResponse.json({ error: "Dit kavelnummer is al in gebruik." }, { status: 409 });

  const { data: existing, error: existingError } = await admin.from(table).select("bid_count").eq("id", id).maybeSingle();
  if (existingError || !existing) return NextResponse.json({ error: "Deze kavel is niet gevonden." }, { status: 404 });
  const updateValues = existing.bid_count === 0 ? { ...values, current_bid: values.start_bid } : values;
  const { error } = await admin.from(table).update(updateValues).eq("id", id);
  if (error) return NextResponse.json({ error: "Kavel aanpassen is niet gelukt." }, { status: 500 });
  return NextResponse.json({ ok: true, testMode: true });
}
