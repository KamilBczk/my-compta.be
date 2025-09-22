import React from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import Button from "../kago-ui/button";

export default function FooterCta() {
  return (
    <div id="kago-ui-footer-cta">
      <Section withBorder={false}>
        <Container>
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center gap-8 max-w-[500px] mx-auto text-center">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-medium text-[#0F2137]">
                  Contactez-nous dès aujourd’hui
                </h2>
                <p className="text-base font-regular text-[#02073E]">
                  Notre équipe est à votre écoute pour répondre à vos questions
                  et vous guider dans vos démarches.
                </p>
              </div>
              <div className="flex gap-8">
                <Button variant="border" href="/contact">
                  On vous rapelle
                </Button>
                <Button variant="gradient" href="/contact">
                  Contactez-nous
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
