import React from "react";
import Image from "next/image";

import getImages from "@/utils/getImages";
import Button from "@/components/kago-ui/button";

interface HeroProps {
  lang: "fr" | "en";
}

export default function Hero({ lang }: HeroProps) {
  const { backgroundHero } = getImages();
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
            <h2>“Ensemble vers la réussite de vos projets”</h2>
            <h1>Expert comptable à Laeken</h1>
          </div>
          <p className="max-w-[500px] mx-auto">
            My Compta, expert comptable à Laeken, accompagne particuliers et
            entreprises dans leurs démarches comptables, fiscales et de création
            d’entreprise avec rigueur et proximité.
          </p>
        </div>
        <Button variant="gradient" href="/contact">
          Contactez-nous
        </Button>
      </div>
    </div>
  );
}
