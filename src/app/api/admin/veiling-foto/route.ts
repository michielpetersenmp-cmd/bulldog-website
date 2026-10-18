import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";
export const runtime = "nodejs";
const bucket = "veiling-test-fotos";
export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("foto");
    if (!(file instanceof File) || file.size < 1 || file.size > 5*1024*1024 ||
      !["image/jpeg","image/png","image/webp"].includes(file.type)) {
      return NextResponse.json({error:"Kies een JPG-, PNG- of WebP-foto van maximaal 5 MB."},{status:400});
    }
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = "kavels/" + randomUUID() + "." + ext;
    const admin = getSupabaseAdmin();
    const { error } = await admin.storage.from(bucket).upload(path, file, {contentType:file.type,upsert:false});
    if (error) return NextResponse.json({error:"Foto uploaden is niet gelukt."},{status:500});
    const {data} = await admin.storage.from(bucket).createSignedUrl(path,3600);
    return NextResponse.json({image_url:path, image_preview_url:data?.signedUrl||null});
  } catch {
    return NextResponse.json({error:"Kon de foto niet verwerken."},{status:500});
  }
}
