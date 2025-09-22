import React from "react";
import Container from "../kago-ui/Container";
import getImages from "@/utils/getImages";
import Image from "next/image";
import Separator from "../separator";

export default function Footer() {
  const { logoFooter } = getImages();

  const footerItems = [
    [
      {
        label: "Notre adresse",
        href: null,
        target: null,
      },
      {
        label: "Rue des Genévriers 56",
        href: "https://maps.app.goo.gl/bAh6maEzH1q4RDFn9",
        target: "_blank",
      },
      {
        label: "1020 Bruxelles",
        href: "https://maps.app.goo.gl/bAh6maEzH1q4RDFn9",
        target: "_blank",
      },
    ],
    [
      {
        label: "Contact",
        href: null,
        target: null,
      },
      {
        label: "info@my-compta.be",
        href: "mailto:contact@mycompta.be",
        target: null,
      },
      {
        label: "028 96 89 11",
        href: "tel:+3228968911",
        target: null,
      },
    ],
    [
      {
        label: "Membre ITAA",
        href: null,
        target: null,
      },
      {
        label: "Institute for Tax Advisors and Accountants",
        href: null,
        target: null,
      },
      {
        label: "N° 50.63.60.20",
        href: null,
        target: null,
      },
    ],
    [
      {
        label: "Liens utiles",
        href: null,
        target: null,
      },
      {
        label: "Plan du site",
        href: "/sitemap.xml",
        target: null,
      },
      {
        label: "Mentions légales",
        href: "/mentions-legales",
        target: null,
      },
      {
        label: "Politique de confidentialité",
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
              <p className="font-medium mt-4">N° d'entreprise BE0746.708.869</p>
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
              Réalisé par:{" "}
              <a
                href="https://kago.group"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Kago Group
              </a>
            </p>
            <p className="absolute left-1/2 transform -translate-x-1/2">
              © 2025. My Compta. All rights reserved.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}
