import Image from "next/image";
import getImages from "@/utils/getImages";

export default function Home() {
  const { backgroundHero } = getImages();
  return (
    <div className="max-h-[1080px] min-h-screen w-full flex items-center justify-center">
      <div className="text-white">
        <h1>Deed</h1>
        <p>Deed is a platform for creating and managing your digital assets.</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <Image
          src={backgroundHero}
          className="w-full h-full object-cover"
          alt="Bg Triangle"
        />
      </div>
    </div>
  );
}
