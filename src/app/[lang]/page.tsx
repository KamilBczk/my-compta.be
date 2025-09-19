import Hero from "@/components/sections/hero";
import CtaImages from "@/components/kago-ui/cta-images";
import Button from "@/components/kago-ui/button";
import getImages from "@/utils/getImages";
import Container from "@/components/kago-ui/Container";
import Section from "@/components/kago-ui/section";
import Separator from "@/components/separator";
import { Sparkles, Zap, Gem } from "lucide-react";

interface HomeProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const { backgroundHero } = getImages();
  return (
    <div>
      <Hero lang={lang as "fr" | "en"} />
      <div>
        <Section color="gray">
          <Container>
            <CtaImages
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  Le parcours de votre expert
                </h3>
              }
              items={[
                {
                  icon: (
                    <Sparkles size={48} className="text-[#28D1DC] size-28" />
                  ),
                  text: "Vision",
                },
                {
                  icon: <Zap size={48} className="text-[#FA578E] size-28" />,
                  text: "Méthodes",
                },
                {
                  icon: <Gem size={48} className="text-[#28DCB2] size-28" />,
                  text: "Valeurs",
                },
              ]}
              content={[
                "Avec 16 ans d'expérience, votre expert vous accompagne en comptabilité, fiscalité, déclarations TVA et création d'entreprise à Bruxelles.",
                "Rigueur, indépendance et confidentialité sont au cœur de ses services pour optimiser votre gestion et sécuriser vos obligations.",
              ]}
              button={
                <Button variant="gradient" href="/contact">
                  Contactez-nous
                </Button>
              }
            />
          </Container>
        </Section>
        <div className="h-[30px] relative">
          <Separator align="left" />
        </div>
      </div>
    </div>
  );
}
