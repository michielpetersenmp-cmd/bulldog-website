import { NextResponse } from "next/server";
import { VEILING_COOKIE_NAME } from "@/lib/veiling-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(VEILING_COOKIE_NAME, "", {
    path: "/", httpOnly: true, maxAge: 0,
    sameSite: "lax", secure: process.env.NODE_ENV === "production",
  });
  return response;
}
