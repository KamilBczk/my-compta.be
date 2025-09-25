"use client";
import React, { useState } from "react";
import Container from "../kago-ui/Container";
import Section from "../kago-ui/section";
import Button from "../kago-ui/button";
import CallbackPopup from "../callback-popup";
import { Dictionary } from "@/utils/useDictionary";

export default function FooterCta({
  lang,
  dictionary,
}: {
  lang: "fr" | "en";
  dictionary: Dictionary;
}) {
  const [isCallbackPopupOpen, setIsCallbackPopupOpen] = useState(false);

  const handleCallbackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCallbackPopupOpen(true);
  };

  return (
    <div id="kago-ui-footer-cta">
      <Section withBorder={false}>
        <Container>
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center gap-8 max-w-[500px] mx-auto text-center">
              <div className="flex flex-col gap-4">
                <h2 className="text-3xl font-medium text-[#0F2137]">
                  {dictionary.footerCta.title}
                </h2>
                <p className="text-base font-regular text-[#02073E]">
                  {dictionary.footerCta.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full sm:w-auto">
                <button
                  onClick={handleCallbackClick}
                  className="inline-block cursor-pointer px-8 py-3 rounded-md transition-all duration-300 ease-in-out border-2 border-[#025EAC] text-[#025EAC] bg-transparent hover:bg-[#025EAC] hover:text-white w-full sm:w-auto"
                >
                  {dictionary.footerCta.callbackButton}
                </button>
                <Button variant="gradient" href={`/${lang}/contact`}>
                  {dictionary.footerCta.contactButton}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <CallbackPopup
        isOpen={isCallbackPopupOpen}
        onClose={() => setIsCallbackPopupOpen(false)}
        lang={lang}
        dictionary={dictionary}
      />
    </div>
  );
}
