import React from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import { Rocket, Calculator, PiggyBank, Lightbulb } from "lucide-react";
import Button from "../kago-ui/button";
import Separator from "../separator";

export default function Services() {
  const services = [
    {
      icon: <Rocket className="text-[#28D1DC] size-14" />,
      title: "Création / liquidation entreprise",
      description:
        "Accompagnement complet pour lancer ou fermer votre société en toute sérénité.",
      href: "/creation-liquidation-entreprise",
    },
    {
      icon: <Calculator className="text-[#FF753A] size-14" />,
      title: "Comptabilité",
      description:
        "Gestion comptable fiable pour piloter efficacement votre activité.",
      href: "/creation-liquidation-entreprise",
    },
    {
      icon: <PiggyBank className="text-[#FA578E] size-14" />,
      title: "Fiscalité",
      description:
        "Conseils fiscaux personnalisés pour optimiser vos obligations et vos coûts.",
      href: "/creation-liquidation-entreprise",
    },
    {
      icon: <Lightbulb className="text-[#28DCB2] size-14" />,
      title: "Conseil",
      description:
        "Un accompagnement stratégique pour développer votre entreprise.",
      href: "/creation-liquidation-entreprise",
    },
  ];

  return (
    <div id="kago-ui-services">
      <Section>
        <>
          <Container>
            <div className="flex flex-col gap-16">
              <div className="max-w-[500px] mx-auto">
                <h2 className="text-3xl font-medium text-[#0F2137] text-center">
                  Explorez nos domaines d'expertise
                </h2>
                <p className="text-base font-regular text-[#02073E] text-center mt-4">
                  Nous proposons des services sur mesure pour répondre à vos
                  besoins et vous accompagner à chaque étape de vos projets.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <ServiceItem key={index} {...service} />
                ))}
              </div>
            </div>
          </Container>
          <div className="h-[30px] absolute bottom-0 left-0 right-0">
            <Separator align="right" />
          </div>
        </>
      </Section>
    </div>
  );
}

interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ServiceItem({ icon, title, description }: ServiceItemProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="bg-[#F9FAFC] rounded-full p-4 flex items-center justify-center size-[115px] border-[1px] border-gray-200">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-[#0F2137]">{title}</h3>
        <p className="text-sm font-regular text-[#343D48]">{description}</p>
      </div>
      <Button variant="gradient" href="">
        Découvrir
      </Button>
    </div>
  );
}
