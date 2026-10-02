import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Publieke beheer-routes voor inloggen en wachtwoordherstel.
  const publicAdminPages = [
    "/admin/login",
    "/admin/wachtwoord-vergeten",
    "/admin/reset-password",
  ];
  const publicAdminApis = [
    "/api/admin/login",
    "/api/admin/logout",
    "/api/admin/forgot-password",
  ];

  const protectedApi =
    pathname.startsWith("/api/admin/") && !publicAdminApis.includes(pathname);
  const protectedAdminPage =
    pathname.startsWith("/admin") && !publicAdminPages.includes(pathname);

  if (protectedAdminPage || protectedApi) {
    const adminToken = request.cookies.get("admin_token");

    if (!process.env.ADMIN_SECRET || !adminToken || adminToken.value !== process.env.ADMIN_SECRET) {
      if (protectedApi) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
