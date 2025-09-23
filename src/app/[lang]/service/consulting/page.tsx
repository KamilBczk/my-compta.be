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
    service: "consulting",
  });
}

export default async function page({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as "fr" | "en");
  const { consulting, steps, consultingPartnership } = getImages();
  return (
    <div>
      <Section>
        <Container>
          <CtaImage
            title={
              <h3 className="text-3xl font-medium text-[#0F2137]">
                {dictionary.pages.consulting.hero.title}
              </h3>
            }
            image={consulting}
            content={dictionary.pages.consulting.hero.description}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.consulting.ctaButton}
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
                {dictionary.pages.consulting.steps.title}
              </h3>
            }
            image={steps}
            content={dictionary.pages.consulting.steps.list}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.consulting.ctaButton}
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
                {dictionary.pages.consulting.partnership.title}
              </h3>
            }
            image={consultingPartnership}
            content={dictionary.pages.consulting.partnership.description}
            button={
              <Button variant="gradient" href={`/${lang}/contact`}>
                {dictionary.pages.consulting.ctaButton}
              </Button>
            }
            reverse
          />
        </Container>
      </Section>
    </div>
  );
}
