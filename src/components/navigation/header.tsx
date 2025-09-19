import React from "react";
import Image from "next/image";

import Container from "../kago-ui/Container";
import getImages from "@/utils/getImages";
import HeaderItems from "./header-items";
import Separator from "../separator";

interface HeaderProps {
  lang: "fr" | "en";
}

export default function Header({ lang }: HeaderProps) {
  console.log(lang);
  const links = HeaderItems({ lang });
  const { logoHeader } = getImages();
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
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
                {links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href}>{link.label}</a>
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
