import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ստուգում ենք՝ արդյոք օգտատերը մուտք գործած է
  const token =
    request.cookies.get("next-auth.session-token")?.value ||
    request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Եթե բացվել է գլխավոր էջը՝ /
  if (pathname === "/") {
    const redirectUrl = request.nextUrl.clone();

    // Լռելյայն լեզուն անգլերենն է
    redirectUrl.pathname = token ? "/en/home" : "/en/login";

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
