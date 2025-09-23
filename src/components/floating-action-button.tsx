import React from "react";
import getImages from "@/utils/getImages";
import Image from "next/image";

export default function FloatingActionButton({ lang }: { lang: "fr" | "en" }) {
  const { whatsappIcon } = getImages();
  return (
    <a
      id="kago-ui-floating-action-button"
      className="fixed right-[5%] bottom-[5%] z-50 bg-[#025EAC] rounded-full p-4 text-white shadow-[0_0_5px_0_#fff]"
      href={`https://wa.me/+32496804752`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src={whatsappIcon} alt="Whatsapp" className="size-8" />
    </a>
  );
}
