import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
const bucket = "veiling-test-fotos";
const MAX_BYTES = 5 * 1024 * 1024;

function detectImage(bytes: Buffer) {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return "image/png";
  if (bytes.length >= 12 && bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  return null;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("foto");
    if (!(file instanceof File) || file.size < 1 || file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Kies een JPG-, PNG- of WebP-foto van maximaal 5 MB." }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const detectedType = detectImage(bytes);
    if (!detectedType || detectedType !== file.type) {
      return NextResponse.json({ error: "Het bestand is geen geldige JPG-, PNG- of WebP-foto." }, { status: 400 });
    }

    const ext = detectedType === "image/png" ? "png" : detectedType === "image/webp" ? "webp" : "jpg";
    const path = "kavels/" + randomUUID() + "." + ext;
    const admin = getSupabaseAdmin();
    const { error } = await admin.storage.from(bucket).upload(path, bytes, {
      contentType: detectedType,
      upsert: false,
    });
    if (error) return NextResponse.json({ error: "Foto uploaden is niet gelukt." }, { status: 500 });

    const { data, error: signError } = await admin.storage.from(bucket).createSignedUrl(path, 3600);
    if (signError || !data?.signedUrl) {
      return NextResponse.json({ error: "Foto staat veilig opgeslagen, maar de voorbeeldlink kon niet worden gemaakt." }, { status: 500 });
    }
    return NextResponse.json({ image_url: path, image_preview_url: data.signedUrl });
  } catch {
    return NextResponse.json({ error: "Kon de foto niet verwerken." }, { status: 500 });
  }
}
