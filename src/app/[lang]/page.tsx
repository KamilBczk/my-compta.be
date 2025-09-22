import Hero from "@/components/sections/hero";
import Career from "@/components/sections/career";
import Services from "@/components/sections/services";
import getImages from "@/utils/getImages";
import Competences from "@/components/sections/competences";

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const { backgroundHero } = getImages();
  return (
    <div>
      <Hero lang={lang as "fr" | "en"} />
      <Career />
      <Services />
      <Competences />
    </div>
  );
}
