import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bescherm alle /admin routes behalve /admin/login
  const protectedApi = pathname.startsWith("/api/admin/") && !["/api/admin/login", "/api/admin/logout"].includes(pathname);
  if ((pathname.startsWith("/admin") && pathname !== "/admin/login") || protectedApi) {
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
