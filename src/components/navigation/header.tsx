"use client";
import React, { useState } from "react";
import Image from "next/image";

import Container from "../kago-ui/Container";
import getImages from "@/utils/getImages";
import HeaderItems from "./header-items";
import Separator from "../separator";
import { Dictionary } from "@/utils/useDictionary";

interface HeaderProps {
  lang: "fr" | "en";
  dictionary: Dictionary;
}

export default function Header({ lang, dictionary }: HeaderProps) {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const links = HeaderItems({ lang, dictionary });
  const { logoHeader } = getImages();

  const services = [
    {
      title: dictionary.services.businessSetup.title,
      href: `/${lang}/service/business-setup`,
    },
    {
      title: dictionary.services.accounting.title,
      href: `/${lang}/service/accounting`,
    },
    {
      title: dictionary.services.taxation.title,
      href: `/${lang}/service/taxation`,
    },
    {
      title: dictionary.services.consulting.title,
      href: `/${lang}/service/consulting`,
    },
  ];
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-md">
      <div className="py-4 relative">
        <Separator align="right" />
        <div className="z-index-10 relative">
          <Container>
            <div className="flex items-center justify-between">
              <div>
                <a href={`/${lang}`}>
                  <Image className="h-12" src={logoHeader} alt="Logo" />
                </a>
              </div>
              <ul className="flex items-center gap-4 text-white">
                {links.map((link, index) => (
                  <li key={index} className="relative">
                    {index === links.length - 1 ? (
                      <a
                        href={link.href}
                        className="bg-white text-[#025EAC] px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : link.label === dictionary.navigation.services ? (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setIsServicesDropdownOpen(!isServicesDropdownOpen)
                          }
                          onMouseEnter={() => setIsServicesDropdownOpen(true)}
                          className="flex items-center gap-1 hover:text-gray-200 transition-colors duration-200"
                        >
                          {link.label}
                          <svg
                            className={`w-4 h-4 transform transition-transform duration-200 ${
                              isServicesDropdownOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {isServicesDropdownOpen && (
                          <div
                            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50"
                            onMouseLeave={() =>
                              setIsServicesDropdownOpen(false)
                            }
                          >
                            {services.map((service, serviceIndex) => (
                              <a
                                key={serviceIndex}
                                href={service.href}
                                className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="font-medium text-sm">
                                  {service.title}
                                </div>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="hover:text-gray-200 transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
