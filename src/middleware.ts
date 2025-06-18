// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getSessionCookie } from "better-auth/cookies";

// Définir les routes protégées sans le slash initial
const protectedRoutes = ["profile", "admin/dashboard"];

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  ...routing,
  locales: ["en", "fr"],
  defaultLocale: "en",
  localeDetection: true,
});

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);
  const pathname = nextUrl.pathname;

  // Extraire la locale du chemin (en/fr)
  const locale = pathname.split("/")[1];

  // Extraire le chemin sans la locale
  const pathWithoutLocale = pathname.replace(`/${locale}`, "");

  const isLoggedIn = !!sessionCookie;
  const isOnProtectedRoute = protectedRoutes.some(
    (route) =>
      pathWithoutLocale === `/${route}` ||
      pathWithoutLocale.startsWith(`/${route}/`)
  );
  const isOnAuthRoute = pathWithoutLocale.startsWith("/auth");

  if (isOnProtectedRoute && !isLoggedIn) {
    // Rediriger vers la page de login avec la bonne locale
    return NextResponse.redirect(
      new URL(`/${locale}/auth/login`, nextUrl.origin)
    );
  }

  if (isOnAuthRoute && isLoggedIn) {
    // Rediriger vers le profil avec la bonne locale
    return NextResponse.redirect(new URL(`/${locale}/profile`, nextUrl.origin));
  }

  // Apply the internationalization middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
