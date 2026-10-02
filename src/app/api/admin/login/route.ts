import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (!process.env.ADMIN_SECRET || typeof password !== "string" || password !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_token", process.env.ADMIN_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 dagen
    path: "/",
  });

  return response;
}
