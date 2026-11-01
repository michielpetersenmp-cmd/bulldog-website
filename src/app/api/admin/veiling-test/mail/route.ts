import { NextResponse } from "next/server";
import { getVeilingMailStatus, sendVeilingTestMail } from "@/lib/veiling-mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStore = { "Cache-Control": "private, no-store, max-age=0" };

export async function GET() {
  return NextResponse.json(getVeilingMailStatus(), { headers: noStore });
}

export async function POST() {
  try {
    const result = await sendVeilingTestMail();
    return NextResponse.json({ ok: true, recipient: result.recipient }, { headers: noStore });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const friendly =
      message === "SMTP_NOT_CONFIGURED"
        ? "De mailbox is nog niet gekoppeld. Voeg eerst het mailboxwachtwoord veilig toe in Vercel."
        : message === "SMTP_TIMEOUT"
          ? "MijnDomein reageerde niet op tijd. Probeer het opnieuw."
          : "De testmail kon niet worden verzonden. Controleer het mailboxwachtwoord en de MijnDomein-instellingen.";
    return NextResponse.json({ error: friendly }, { status: 503, headers: noStore });
  }
}
