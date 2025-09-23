import React from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import { Rocket, Calculator, PiggyBank, Lightbulb } from "lucide-react";
import Button from "../kago-ui/button";
import Separator from "../separator";
import { Dictionary } from "@/utils/useDictionary";

interface ServicesProps {
  lang: "fr" | "en";
  dictionary: Dictionary;
}

export default function Services({ lang, dictionary }: ServicesProps) {
  const services = [
    {
      icon: <Rocket className="text-[#28D1DC] size-14" />,
      title: dictionary.services.businessSetup.title,
      description: dictionary.services.businessSetup.description,
      href: `/${lang}/service/business-setup`,
    },
    {
      icon: <Calculator className="text-[#FF753A] size-14" />,
      title: dictionary.services.accounting.title,
      description: dictionary.services.accounting.description,
      href: `/${lang}/service/accounting`,
    },
    {
      icon: <PiggyBank className="text-[#FA578E] size-14" />,
      title: dictionary.services.taxation.title,
      description: dictionary.services.taxation.description,
      href: `/${lang}/service/taxation`,
    },
    {
      icon: <Lightbulb className="text-[#28DCB2] size-14" />,
      title: dictionary.services.consulting.title,
      description: dictionary.services.consulting.description,
      href: `/${lang}/service/consulting`,
    },
  ];

  return (
    <div id="services">
      <Section>
        <>
          <Container>
            <div className="flex flex-col gap-16">
              <div className="max-w-[500px] mx-auto">
                <h2 className="text-3xl font-medium text-[#0F2137] text-center">
                  {dictionary.services.title}
                </h2>
                <p className="text-base font-regular text-[#02073E] text-center mt-4">
                  {dictionary.services.description}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <ServiceItem
                    key={index}
                    {...service}
                    dictionary={dictionary}
                  />
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
  href: string;
  dictionary: Dictionary;
}

function ServiceItem({
  icon,
  title,
  description,
  href,
  dictionary,
}: ServiceItemProps) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="bg-[#F9FAFC] rounded-full p-4 flex items-center justify-center size-[115px] border-[1px] border-gray-200">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-medium text-[#0F2137]">{title}</h3>
        <p className="text-sm font-regular text-[#343D48]">{description}</p>
      </div>
      <Button variant="gradient" href={href}>
        {dictionary.services.ctaButton}
      </Button>
    </div>
  );
}
