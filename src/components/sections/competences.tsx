import React from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import CtaImage from "../kago-ui/cta-image";
import Button from "../kago-ui/button";
import getImages from "@/utils/getImages";
import Separator from "../separator";

interface CompetencesProps {
  reverse?: boolean;
}

export default function Competences({ reverse = false }: CompetencesProps) {
  const { backgroundHero } = getImages();

  return (
    <div id="kago-ui-competences">
      <Section color="gray">
        <>
          <Container>
            <CtaImage
              reverse={reverse}
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  Nos compétences
                </h3>
              }
              image={backgroundHero}
              content={[
                "Votre conseiller fiscal veille au respect des normes, choisit le régime le plus adapté et défend vos intérêts.",
                "Il vous accompagne dans la déclaration de vos revenus, de votre patrimoine et de vos placements, en simplifiant chaque démarche.",
                "Grâce à son expertise, il optimise votre fiscalité en toute transparence pour préserver et valoriser votre patrimoine.",
              ]}
              button={
                <Button variant="gradient" href="/contact">
                  Découvrir
                </Button>
              }
            />
          </Container>
          <div className="h-[30px] absolute bottom-0 left-0 right-0">
            <Separator align="left" />
          </div>
        </>
      </Section>
    </div>
  );
}
