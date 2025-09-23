import Hero from "@/components/sections/hero";
import Career from "@/components/sections/career";
import Services from "@/components/sections/services";
import getImages from "@/utils/getImages";
import Competences from "@/components/sections/competences";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";
import {
  getAllOffices,
  getOfficeBySlug,
  getOfficeParams,
} from "@/utils/offices";
import { notFound } from "next/navigation";

interface OfficePageProps {
  params: Promise<{
    lang: string;
    city: string;
  }>;
}

export async function generateStaticParams() {
  const offices = getAllOffices();
  const languages = ["fr", "en"];

  const params = [];

  for (const lang of languages) {
    for (const office of offices) {
      params.push({
        lang,
        city: office.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; city: string }>;
}) {
  const { lang, city } = await params;
  const office = getOfficeBySlug(city);

  if (!office) {
    return {};
  }

  return generateSEOMetadata({
    lang: lang as "fr" | "en",
    page: "home",
    office: office,
  });
}

export default async function OfficePage({ params }: OfficePageProps) {
  const { lang, city } = await params;
  const office = getOfficeBySlug(city);

  if (!office) {
    notFound();
  }

  const dictionary = await getDictionary(lang as "fr" | "en");
  const { backgroundHero } = getImages();

  return (
    <div>
      <Hero
        lang={lang as "fr" | "en"}
        dictionary={dictionary}
        office={office}
      />
      <Career dictionary={dictionary} />
      <Services lang={lang as "fr" | "en"} dictionary={dictionary} />
      <Competences
        reverse={true}
        lang={lang as "fr" | "en"}
        dictionary={dictionary}
      />
    </div>
  );
}
