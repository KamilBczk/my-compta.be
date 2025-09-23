import React from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import CtaImage from "../kago-ui/cta-image";
import Button from "../kago-ui/button";
import getImages from "@/utils/getImages";
import Separator from "../separator";
import { Dictionary } from "@/utils/useDictionary";

interface CompetencesProps {
  reverse?: boolean;
  lang?: "fr" | "en";
  dictionary: Dictionary;
}

export default function Competences({
  reverse = false,
  lang,
  dictionary,
}: CompetencesProps) {
  const { competences } = getImages();

  return (
    <div id="kago-ui-competences">
      <Section color="gray">
        <>
          <Container>
            <CtaImage
              reverse={reverse}
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  {dictionary.competences.title}
                </h3>
              }
              image={competences}
              content={dictionary.competences.description}
              button={
                <Button variant="gradient" href={`/${lang}/contact`}>
                  {dictionary.competences.ctaButton}
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
