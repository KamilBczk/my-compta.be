import React, { ReactNode } from "react";

interface CtaImagesItem {
  icon: ReactNode;
  text: string;
  description: {
    title: string;
    points: string[];
  };
}

interface CtaImagesProps {
  title: ReactNode;
  items: CtaImagesItem[];
  content: string[];
  button: ReactNode;
  reverse?: boolean;
}

// Composant pour une carte individuelle avec animation flip
function FlipCard({ item }: { item: CtaImagesItem }) {
  return (
    <div className="group [perspective:1000px] h-64 w-full">
      <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Face avant */}
        <div className="absolute inset-0 h-full w-full bg-white border-[1px] border-gray-200 rounded-2xl p-6 shadow-sm [backface-visibility:hidden] flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mb-4">
            {item.icon}
          </div>
          <p className="text-[#0F2137] font-medium text-center">{item.text}</p>
        </div>

        {/* Face arrière */}
        <div className="absolute inset-0 h-full w-full bg-[#025EAC] text-white border-[1px] border-gray-200 rounded-2xl p-4 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] overflow-y-auto">
          <div className="h-full flex flex-col justify-center">
            <h4 className="text-base font-semibold mb-3 text-center">
              {item.description.title}
            </h4>
            <ul className="space-y-1 text-sm">
              {item.description.points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <span className="flex-1 leading-tight">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
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
                <FlipCard item={items[0]} />
              </div>
              <div className="py-3 sm:py-4">
                <FlipCard item={items[1]} />
              </div>
            </div>
            <div className="w-full px-3 sm:px-4 xl:w-1/2">
              <div className="relative z-10 my-4">
                <FlipCard item={items[2]} />
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
