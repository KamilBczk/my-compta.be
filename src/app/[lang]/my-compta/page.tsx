import Container from "@/components/kago-ui/Container";
import Button from "@/components/kago-ui/button";
import CtaImage from "@/components/kago-ui/cta-image";
import Section from "@/components/kago-ui/section";
import Separator from "@/components/separator";
import Competences from "@/components/sections/competences";
import Services from "@/components/sections/services";
import getImages from "@/utils/getImages";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";
import React from "react";

interface PageProps {
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
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "myCompta" });
}

export default async function page({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");
  const { founder, myCompta } = getImages();
  return (
    <div>
      <Section>
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">
                {dictionary.pages.myCompta.title}
              </h3>
            }
            image={myCompta}
            content={dictionary.pages.myCompta.description}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.myCompta.ctaButton}
              </Button>
            }
          />
        </Container>
      </Section>
      <Competences lang={lang as "fr" | "en"} reverse dictionary={dictionary} />
      <Services lang={lang as "fr" | "en"} dictionary={dictionary} />
      <Section color="gray">
        <Container>
          <>
            <CtaImage
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  {dictionary.pages.myCompta.founder.title}
                </h3>
              }
              image={founder}
              content={dictionary.pages.myCompta.founder.description}
              button={
                <Button variant="gradient" href={`/${lang}/contact`}>
                  {dictionary.pages.myCompta.ctaButton}
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
