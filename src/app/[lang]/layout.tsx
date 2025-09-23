import { DM_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import FooterCta from "@/components/sections/footer-cta";
import { getDictionary } from "@/dictionaries/getDictionary";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
} from "@/utils/generateMetadata";
import FloatingActionButton from "@/components/floating-action-button";
import { headers } from "next/headers";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "default" });
}

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");
  const structuredData = generateStructuredData(lang as "fr" | "en");

  // Obtenir l'URL actuelle pour déterminer la page
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";

  // Vérifier si on est sur la page de contact
  const isContactPage = pathname.endsWith("/contact");

  return (
    <html lang={lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${dmSans.variable} antialiased`}>
        <FloatingActionButton lang={lang as "fr" | "en"} />
        <Header lang={lang as "fr" | "en"} dictionary={dictionary} />
        {children}
        {!isContactPage && (
          <FooterCta lang={lang as "fr" | "en"} dictionary={dictionary} />
        )}
        <Footer dictionary={dictionary} />
      </body>
    </html>
  );
}
