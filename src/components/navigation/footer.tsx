import React from "react";
import Container from "../kago-ui/Container";
import getImages from "@/utils/getImages";
import Image from "next/image";
import Separator from "../separator";
import { Dictionary } from "@/utils/useDictionary";

interface FooterProps {
  dictionary: Dictionary;
}

export default function Footer({ dictionary }: FooterProps) {
  const { logoFooter } = getImages();

  const footerItems = [
    [
      {
        label: dictionary.footer.address.title,
        href: null,
        target: null,
      },
      {
        label: dictionary.footer.address.street,
        href: "https://maps.app.goo.gl/bAh6maEzH1q4RDFn9",
        target: "_blank",
      },
      {
        label: dictionary.footer.address.city,
        href: "https://maps.app.goo.gl/bAh6maEzH1q4RDFn9",
        target: "_blank",
      },
    ],
    [
      {
        label: dictionary.footer.contact.title,
        href: null,
        target: null,
      },
      {
        label: dictionary.footer.contact.email,
        href: "mailto:info@my-compta.be",
        target: null,
      },
      {
        label: dictionary.footer.contact.phone,
        href: "tel:+3228968911",
        target: null,
      },
    ],
    [
      {
        label: dictionary.footer.certification.title,
        href: null,
        target: null,
      },
      {
        label: dictionary.footer.certification.organization,
        href: null,
        target: null,
      },
      {
        label: dictionary.footer.certification.number,
        href: null,
        target: null,
      },
    ],
    [
      {
        label: dictionary.footer.links.title,
        href: null,
        target: null,
      },
      {
        label: dictionary.footer.links.sitemap,
        href: "/sitemap.xml",
        target: null,
      },
      {
        label: dictionary.footer.links.legal,
        href: "/mentions-legales",
        target: null,
      },
      {
        label: dictionary.footer.links.privacy,
        href: "/politique-de-confidentialite",
        target: null,
      },
    ],
  ];

  return (
    <div id="kago-navigation-footer">
      <div className="relative">
        <div className="h-[30px] absolute bottom-0 left-0 right-0">
          <Separator align="right" />
        </div>
      </div>
      <div className="bg-[#025EAC] py-[75px]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-white">
            <div>
              <Image src={logoFooter} alt="Logo" />
              <p className="font-medium mt-4">
                {dictionary.footer.companyNumber}
              </p>
            </div>
            {footerItems.map((item, index) => (
              <div key={index} className="text-center">
                {item.map((item, index) => (
                  <div key={index}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target || undefined}
                        rel={
                          item.target === "_blank"
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={`${
                          index === 0 ? "font-bold underline" : ""
                        } ${item.href ? "hover:underline cursor-pointer" : ""}`}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span
                        className={`${
                          index === 0 ? "font-bold underline" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </div>
      <div className="mt-[2px] bg-[#025EAC] py-[25px] text-white">
        <Container>
          <div className="flex justify-between items-center">
            <p>
              {dictionary.footer.credits.madeBy}{" "}
              <a
                href="https://kago-group.com/?utm_source=my-compta"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {dictionary.footer.credits.company}
              </a>
            </p>
            <p className="absolute left-1/2 transform -translate-x-1/2">
              {dictionary.footer.credits.copyright}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
