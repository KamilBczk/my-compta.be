import { NextResponse } from "next/server";
// import { auth } from "./auth";

let locales = ["fr", "nl"];

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language");

  if (!acceptLanguage) {
    return "fr";
  }

  const acceptedLanguages = acceptLanguage.split(",");

  for (const language of acceptedLanguages) {
    const locale = locales.find((locale) => language.trim().startsWith(locale));
    if (locale) {
      return locale;
    }
  }
  return "fr";
}

export async function middleware(request) {
  // const authResult = await auth(request);
  // if (authResult) return authResult;

  // Logique de localisation
  const { pathname } = request.nextUrl;

  // Ne pas rediriger si on accède au sitemap
  if (pathname === "/sitemap.xml") return;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
