import { Metadata } from "next";
import { getDictionary } from "@/dictionaries/getDictionary";
import { Office } from "@/utils/offices";

interface MetadataParams {
  lang: "fr" | "en";
  page?: keyof typeof import("@/dictionaries/fr.json")["seo"];
  service?: keyof typeof import("@/dictionaries/fr.json")["seo"]["services"];
  office?: Office;
}

export async function generateMetadata({
  lang,
  page = "default",
  service,
  office,
}: MetadataParams): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  
  let seoData: { title: string; description: string; keywords: string };
  
  if (service && dictionary.seo.services[service]) {
    seoData = dictionary.seo.services[service];
  } else if (page && dictionary.seo[page]) {
    const pageData = dictionary.seo[page];
    // Vérifier si c'est un objet avec title, description, keywords
    if ('title' in pageData && 'description' in pageData && 'keywords' in pageData) {
      seoData = pageData;
    } else {
      seoData = dictionary.seo.default;
    }
  } else {
    seoData = dictionary.seo.default;
  }

  // Si on a un bureau spécifique, on adapte les métadonnées
  let title = seoData.title;
  let description = seoData.description;
  let keywords = seoData.keywords;
  
  if (office && (page === "home" || page === "default")) {
    const cityName = office.name[lang];
    // Remplacer "Laeken" par la ville actuelle dans le titre
    title = title.replace(/Laeken/gi, cityName);
    // Adapter la description avec les infos du bureau
    description = office.description[lang];
    // Utiliser les mots-clés spécifiques du bureau
    keywords = office.keywords[lang];
  }

  const baseUrl = "https://my-compta.be";
  let canonical;
  
  if (office) {
    canonical = `${baseUrl}/${lang}/office/${office.slug}`;
  } else {
    canonical = `${baseUrl}/${lang}${page === "home" ? "" : `/${page === "default" ? "" : page}`}`;
  }

  return {
    title,
    description,
    keywords,
    authors: [{ name: "My Compta" }],
    creator: "My Compta",
    publisher: "My Compta",
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical,
      languages: {
        fr: `${baseUrl}/fr${page === "home" ? "" : `/${page === "default" ? "" : page}`}`,
        en: `${baseUrl}/en${page === "home" ? "" : `/${page === "default" ? "" : page}`}`,
      },
    },
    openGraph: {
      type: "website",
      locale: lang === "fr" ? "fr_BE" : "en_US",
      url: canonical,
      title: seoData.title,
      description: seoData.description,
      siteName: "My Compta",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: seoData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.title,
      description: seoData.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

export function generateStructuredData(lang: "fr" | "en", office?: Office) {
  const baseUrl = "https://my-compta.be";
  
  // Utiliser les infos du bureau si fourni, sinon Laeken par défaut
  const addressInfo = office ? office.address : {
    street: "Rue des Genévriers 56",
    city: "Bruxelles",
    postalCode: "1020",
    country: "Belgique"
  };
  
  const coordinates = office ? office.coordinates : {
    latitude: "50.8798",
    longitude: "4.3470"
  };
  
  const cityName = office ? office.name[lang] : (lang === "fr" ? "Laeken" : "Laeken");
  
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: `My Compta ${cityName}`,
    description: office 
      ? office.description[lang]
      : (lang === "fr" 
        ? "Expert comptable spécialisé en comptabilité, fiscalité et création d'entreprise"
        : "Chartered accountant specialized in accounting, taxation and business creation"),
    url: office ? `${baseUrl}/${lang}/office/${office.slug}` : `${baseUrl}/${lang}`,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: "+32 28 96 89 11",
    email: "info@my-compta.be",
    address: {
      "@type": "PostalAddress",
      streetAddress: addressInfo.street,
      addressLocality: addressInfo.city,
      postalCode: addressInfo.postalCode,
      addressCountry: "BE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    },
    openingHours: "Mo-Fr 09:00-17:00",
    sameAs: [
      // Ajoutez ici vos réseaux sociaux si vous en avez
    ],
    founder: {
      "@type": "Person",
      name: "M. Abou Farhat",
      jobTitle: lang === "fr" ? "Expert-comptable" : "Chartered Accountant",
    },
    areaServed: {
      "@type": "Place",
      name: lang === "fr" ? "Belgique" : "Belgium",
    },
    serviceType: lang === "fr" 
      ? ["Comptabilité", "Fiscalité", "Création d'entreprise", "Conseil en gestion"]
      : ["Accounting", "Taxation", "Business Creation", "Management Consulting"],
  };
}
