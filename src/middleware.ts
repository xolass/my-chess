import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = [
  { path: "/sign-in", whenAuthenticated: "redirect" },
  { path: "/pricing", whenAuthenticated: "next" },
] as const;

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  return NextResponse.next();

  const publicRoute = publicRoutes.find((route) => pathname === route.path);

  if (!publicRoute) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/sign-in";

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
