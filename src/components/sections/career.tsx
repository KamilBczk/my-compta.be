import React from "react";
import Container from "@/components/kago-ui/Container";
import Section from "@/components/kago-ui/section";
import Separator from "@/components/separator";
import { Sparkles, Zap, Gem } from "lucide-react";
import CtaImages from "@/components/kago-ui/cta-images";
import Button from "@/components/kago-ui/button";
import { Dictionary } from "@/utils/useDictionary";

interface CareerProps {
  dictionary: Dictionary;
}

export default function Career({ dictionary }: CareerProps) {
  return (
    <div>
      <Section color="gray">
        <>
          <Container>
            <CtaImages
              title={
                <h3 className="text-3xl font-medium text-[#0F2137]">
                  {dictionary.career.title}
                </h3>
              }
              items={[
                {
                  icon: (
                    <Sparkles size={48} className="text-[#28D1DC] size-28" />
                  ),
                  text: dictionary.career.vision.title,
                  description: {
                    title: dictionary.career.vision.title,
                    points: dictionary.career.vision.points,
                  },
                },
                {
                  icon: <Zap size={48} className="text-[#FA578E] size-28" />,
                  text: dictionary.career.methods.title,
                  description: {
                    title: dictionary.career.methods.title,
                    points: dictionary.career.methods.points,
                  },
                },
                {
                  icon: <Gem size={48} className="text-[#28DCB2] size-28" />,
                  text: dictionary.career.values.title,
                  description: {
                    title: dictionary.career.values.title,
                    points: dictionary.career.values.points,
                  },
                },
              ]}
              content={dictionary.career.description}
              button={
                <Button variant="gradient" href="#services">
                  {dictionary.career.ctaButton}
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
