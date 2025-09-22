import Container from "@/components/kago-ui/Container";
import Button from "@/components/kago-ui/button";
import CtaImage from "@/components/kago-ui/cta-image";
import Section from "@/components/kago-ui/section";
import Separator from "@/components/separator";
import Competences from "@/components/sections/competences";
import Services from "@/components/sections/services";
import getImages from "@/utils/getImages";
import React from "react";

export default function page() {
  const { backgroundHero } = getImages();
  return (
    <div>
      <Section>
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">My Compta</h3>
            }
            image={backgroundHero}
            content={[
              "My Compta est un cabinet comptable et fiscal situé à Bruxelles, fondé en 2020 par M. Abou Farhat, expert-comptable inscrit au tableau de l’ordre. Fort de plus de 16 années d’expérience en comptabilité, fiscalité et conseil en gestion d’entreprise, il met ses compétences au service des indépendants, professions libérales, TPE et particuliers dans toute la Belgique, notamment à Laeken, Anderlecht et Jette.",
            ]}
            button={
              <Button variant="gradient" href="/contact">
                Contactez-nous
              </Button>
            }
          />
        </Container>
      </Section>
      <Competences reverse />
      <Services />
      <Section color="gray">
        <Container>
          <>
            <CtaImage
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  La vision du fondateur
                </h3>
              }
              image={backgroundHero}
              content={[
                "Fondateur de My Compta, M. Abou Farhat est expert-comptable inscrit au tableau de l’ordre et dispose de plus de 16 ans d’expérience en comptabilité, fiscalité et gestion d’entreprise.",
                "Rigoureux et à l’écoute, il a créé My Compta en 2020 pour offrir un accompagnement personnalisé et digitalisé aux indépendants, TPE et particuliers partout en Belgique.",
              ]}
              button={
                <Button variant="gradient" href="/contact">
                  Contactez-nous
                </Button>
              }
            />
            <div className="h-[30px] absolute bottom-0 left-0 right-0">
              <Separator align="left" />
            </div>
          </>
        </Container>
      </Section>
    </div>
  );
}
