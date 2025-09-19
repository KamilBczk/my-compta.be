import React, { ReactNode } from "react";

interface CtaImagesItem {
  icon: ReactNode;
  text: string;
}

interface CtaImagesProps {
  title: ReactNode;
  items: CtaImagesItem[];
  content: string[];
  button: ReactNode;
  reverse?: boolean;
}

export default function CtaImages({
  title,
  items,
  content,
  button,
  reverse = false,
}: CtaImagesProps) {
  return (
    <div className="container mx-auto">
      <div
        className={`flex flex-wrap items-center justify-between -mx-4 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        <div className="w-full px-4 lg:w-6/12">
          <div className="flex items-center -mx-3 sm:-mx-4">
            <div className="w-full px-3 sm:px-4 xl:w-1/2">
              <div className="py-3 sm:py-4">
                <div className="w-full bg-white border-[1px] border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex justify-center items-center aspect-square">
                    {items[0].icon}
                  </div>
                  <p className="text-[#0F2137] font-medium mt-4 text-center">
                    {items[0].text}
                  </p>
                </div>
              </div>
              <div className="py-3 sm:py-4">
                <div className="w-full bg-white border-[1px] border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex justify-center items-center aspect-square">
                    {items[1].icon}
                  </div>
                  <p className="text-[#0F2137] font-medium mt-4 text-center">
                    {items[1].text}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-3 sm:px-4 xl:w-1/2">
              <div className="relative z-10 my-4">
                <div className="w-full bg-white border-[1px] border-gray-200 rounded-2xl p-8 shadow-sm">
                  <div className="flex justify-center items-center aspect-square">
                    {items[2].icon}
                  </div>
                  <p className="text-[#0F2137] font-medium mt-4 text-center">
                    {items[2].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
          <div className="mt-10 lg:mt-0">
            <div className="mb-5">{title}</div>

            {content.map((item, index) => (
              <p
                key={index}
                className="mb-5 text-base font-regular text-[#02073E]"
              >
                {item}
              </p>
            ))}
            <div className="flex">{button}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
