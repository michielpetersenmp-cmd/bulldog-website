import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteCurrentVeilingParticipantSession, VEILING_SESSION_COOKIE, veilingSessionCookieOptions } from "@/lib/veiling-participant-session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = cookies().get(VEILING_SESSION_COOKIE)?.value || "";
  await deleteCurrentVeilingParticipantSession(token);
  const response = NextResponse.redirect(new URL("/veiling", request.url), { status: 303 });
  response.cookies.set(VEILING_SESSION_COOKIE, "", { ...veilingSessionCookieOptions(), maxAge: 0 });
  return response;
}
