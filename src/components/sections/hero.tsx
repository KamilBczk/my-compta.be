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
    // Remplacer "Laeken" par la ville du bureau dans le titre
    title = title.replace(/Laeken/gi, office.name[lang]);
    // Remplacer "Laeken" par la ville du bureau dans la description aussi
    description = description.replace(/Laeken/gi, office.name[lang]);
  }

  return (
    <div className="max-h-[1080px] min-h-[600px] md:min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute -z-10 w-full h-full">
        <Image
          src={backgroundHero}
          className="w-full h-full object-cover"
          alt="Bg Triangle"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8">
        <div className="text-white text-center max-w-[800px] w-full">
          <div className="text-2xl sm:text-3xl md:text-4xl font-black leading-relaxed">
            <h2 className="mb-2 sm:mb-4">
              <i>«{dictionary.hero.tagline}.»</i>
            </h2>
            <h1>{title}</h1>
          </div>
          <p className="max-w-[500px] mx-auto text-sm sm:text-base lg:text-lg mt-4 sm:mt-6">
            {description}
          </p>
        </div>
        <Button variant="gradient" href={`/${lang}/contact`}>
          {dictionary.hero.ctaButton}
        </Button>
      </div>
    </div>
  );
}
