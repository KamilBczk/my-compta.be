import { NextResponse } from "next/server";
// import { auth } from "./auth";

let locales = ["fr", "en"];

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

export async function proxy(request) {
  // const authResult = await auth(request);
  // if (authResult) return authResult;

  // Redirection HTTPS uniquement en production et sur le domaine de production
  const isProduction = process.env.NODE_ENV === "production";
  const isHttpRequest = request.headers.get("x-forwarded-proto") === "http";
  const isProductionDomain =
    request.nextUrl.hostname === "my-compta.be" ||
    request.nextUrl.hostname === "www.my-compta.be";

  if (isProduction && isHttpRequest && isProductionDomain) {
    const httpsUrl = new URL(request.url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Logique de localisation
  const { pathname } = request.nextUrl;

  // Ne pas rediriger si on accède au sitemap
  if (pathname === "/sitemap.xml") return;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Ajouter le pathname dans les headers pour le layout
    const response = NextResponse.next();
    response.headers.set("x-pathname", pathname);
    return response;
  }

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
