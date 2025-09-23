import React from "react";
import Contact from "@/components/contact";
import OpeningHours from "@/components/opening-hours";
import { getDictionary } from "@/dictionaries/getDictionary";
import getImages from "@/utils/getImages";
import { generateMetadata as generateSEOMetadata } from "@/utils/generateMetadata";
import Section from "@/components/kago-ui/section";
import Container from "@/components/kago-ui/Container";

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
  return generateSEOMetadata({ lang: lang as "fr" | "en", page: "contact" });
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params;
  const { backgroundHero } = getImages();

  const dictionary = await getDictionary(lang as "en" | "fr");

  return (
    <div>
      <Contact dictionary={dictionary} bannerImage={backgroundHero} />
      <div>
        <Section withBorder={false}>
          <Container>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-1">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.7824055228866!2d4.329847977155622!3d50.90025427168156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c3d3643a898b%3A0xb554d9f869c9e8f6!2sComptable%20Libanais%20Bruxelles!5e1!3m2!1sfr!2sbe!4v1758627908806!5m2!1sfr!2sbe"
                  width="600"
                  height="450"
                  className="border-0 w-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="lg:w-80">
                <OpeningHours dictionary={dictionary} />
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
