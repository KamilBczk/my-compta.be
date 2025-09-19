import React from "react";
import Image from "next/image";
import getImages from "@/utils/getImages";

interface SeparatorProps {
  align: "left" | "right";
}

export default function Separator({ align }: SeparatorProps) {
  const { bgTriangle } = getImages();
  if (align === "right") {
    return (
      <div className="absolute bottom-0 right-0 h-full w-[calc((100%-245px)-100px)] xl:w-[calc(((100%-1216px)/2)+900px)] overflow-y-hidden">
        <Image
          src={bgTriangle}
          className="h-full w-full object-cover object-left"
          alt="Bg Triangle"
        />
      </div>
    );
  } else {
    return (
      <div className="absolute bottom-0 left-0 h-full w-[calc((100%-245px)-100px)] xl:w-[calc(((100%-1216px)/2)+900px)] overflow-y-hidden">
        <Image
          src={bgTriangle}
          className="h-full w-full object-cover object-left scale-x-[-1]"
          alt="Bg Triangle"
        />
      </div>
    );
  }
}
