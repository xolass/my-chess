import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = new Map([
  ["/login", { whenAuthenticated: "redirect" }],
  ["/signup", { whenAuthenticated: "redirect" }],
]);

const REDIRECT_WHEN_AUTHENTICATED = "/";
const REDIRECT_WHEN_NOT_AUTHENTICATED = "/login";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;

    const publicRoute = publicRoutes.get(pathname);

    const isAutheticated = request.nextauth?.token;
    const redirectUrl = request.nextUrl.clone();

    if (!publicRoute && !isAutheticated) {
      redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED;

      return NextResponse.redirect(redirectUrl);
    }

    if (publicRoute && isAutheticated) {
      switch (publicRoute.whenAuthenticated) {
        case "redirect": {
          redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED;

          return NextResponse.redirect(redirectUrl);
        }
        default: {
          throw new Error("create new whenAuthenticated case");
        }
      }
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: REDIRECT_WHEN_NOT_AUTHENTICATED,
    },
    callbacks: {
      // This ensures the middleware runs even for public routes
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
