import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  if (token) {
    if (path === "/login" || path === "/signup") {
      return NextResponse.redirect(new URL("/", request.nextUrl));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below
export const config = {
  matcher: ["/", "/login", "/signup"],
};
