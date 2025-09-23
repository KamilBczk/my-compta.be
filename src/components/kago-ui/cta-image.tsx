import React, { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import { CircleCheck } from "lucide-react";

interface CtaProps {
  reverse?: boolean;
  title: ReactNode;
  image: StaticImageData;
  content: ReactNode[];
  button: ReactNode;
  hideButton?: boolean;
  darken?: boolean;
  steps?: boolean;
}

export default function CtaImage({
  reverse = false,
  title,
  image,
  content,
  button,
  hideButton = false,
  darken = false,
  steps = false,
}: CtaProps) {
  return (
    <div
      className={`flex flex-col md:flex-row w-full gap-12 md:gap-24 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full relative md:w-1/2 aspect-[16/9] md:aspect-auto">
        {darken && (
          <div className="absolute inset-0 bg-[#193175] opacity-30 z-10 rounded-xl md:rounded-2xl" />
        )}
        <Image
          className="w-full h-full object-cover rounded-xl md:rounded-2xl"
          alt="Image descriptive"
          src={image}
          layout="fill"
        />
      </div>
      <div className="w-full md:w-1/2 py-4 md:py-24 px-4 md:px-0">
        <div className="text-left">{title}</div>
        {content.map((elem, index) => (
          <div
            key={index}
            className="mt-2 md:mt-4 text-left flex items-center gap-2"
          >
            {steps && (
              <span className="text-sm font-medium text-[#28DCB2]">
                <CircleCheck />
              </span>
            )}
            {elem}
          </div>
        ))}

        <div
          className={`${
            hideButton === true ? "hidden" : ""
          } mt-6 md:mt-8 flex justify-start`}
        >
          {button}
        </div>
      </div>
    </div>
  );
}
