import Hero from "@/components/sections/hero";
import Career from "@/components/sections/career";
import Services from "@/components/sections/services";
import getImages from "@/utils/getImages";
import Competences from "@/components/sections/competences";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "home" });
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");
  const { backgroundHero } = getImages();
  return (
    <div>
      <Hero lang={lang as "fr" | "en"} dictionary={dictionary} />
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
