import React from "react";
import Image from "next/image";

import getImages from "@/utils/getImages";
import Button from "@/components/kago-ui/button";
import { Dictionary } from "@/utils/useDictionary";
import { Office } from "@/utils/offices";

interface HeroProps {
  lang: "fr" | "en";
  dictionary: Dictionary;
  office?: Office;
}

export default function Hero({ lang, dictionary, office }: HeroProps) {
  const { backgroundHero } = getImages();

  // Adapter le titre et la description selon le bureau
  let title = dictionary.hero.title;
  let description = dictionary.hero.description;

  if (office) {
    // Remplacer "Laeken" par la ville du bureau
    title = title.replace(/Laeken/gi, office.name[lang]);
    // Utiliser la description spécifique du bureau
    description = office.description[lang];
  }

  return (
    <div className="max-h-[1080px] min-h-screen w-full flex items-center justify-center">
      <div className="absolute -z-10 bottom-0 left-0 right-0">
        <Image
          src={backgroundHero}
          className="w-full h-full object-cover"
          alt="Bg Triangle"
        />
      </div>
      <div className=" flex flex-col items-center justify-center gap-4">
        <div className="text-white text-center max-w-[800px]">
          <div className="text-4xl font-black leading-relaxed">
            <h2>"{dictionary.hero.tagline}"</h2>
            <h1>{title}</h1>
          </div>
          <p className="max-w-[500px] mx-auto">{description}</p>
        </div>
        <Button variant="gradient" href={`/${lang}/contact`}>
          {dictionary.hero.ctaButton}
        </Button>
      </div>
    </div>
  );
}
