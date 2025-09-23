import Button from "@/components/kago-ui/button";
import CtaImage from "@/components/kago-ui/cta-image";
import React from "react";
import Section from "@/components/kago-ui/section";
import Container from "@/components/kago-ui/Container";
import getImages from "@/utils/getImages";
import Services from "@/components/sections/services";
import { getDictionary } from "@/dictionaries/getDictionary";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";

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
  return generateSEOMetadata({
    lang: lang as "fr" | "en",
    service: "accounting",
  });
}

export default async function page({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");
  const { backgroundHero, accounting, steps, accountingDigital } = getImages();
  return (
    <div>
      <Section>
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">
                {dictionary.pages.accounting.hero.title}
              </h3>
            }
            image={accounting}
            content={dictionary.pages.accounting.hero.description}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.accounting.ctaButton}
              </Button>
            }
            reverse
          />
        </Container>
      </Section>
      <Section color="gray">
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">
                {dictionary.pages.accounting.steps.title}
              </h3>
            }
            image={steps}
            content={dictionary.pages.accounting.steps.list}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.accounting.ctaButton}
              </Button>
            }
            steps
          />
        </Container>
      </Section>
      <Services lang={lang as "fr" | "en"} dictionary={dictionary} />
      <Section color="gray">
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">
                {dictionary.pages.accounting.digital.title}
              </h3>
            }
            image={accountingDigital}
            content={dictionary.pages.accounting.digital.description}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.accounting.ctaButton}
              </Button>
            }
            reverse
          />
        </Container>
      </Section>
    </div>
  );
}
