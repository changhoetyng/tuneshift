import Image, { StaticImageData } from "next/image";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import Link from "next/link";

interface DestinationSelectionProps {
  logo?: StaticImageData;
  onClickLink: string;
  title: string;
  titleHighlight: string;
}

export default async function DestinationSelection({
  logo,
  onClickLink,
  title,
  titleHighlight
}: DestinationSelectionProps) {
  return (
    <RoundedBorderCard className="flex flex-nowrap flex-col justify-between items-stretch"> {/* < Tailwind here doesnt work */}
    
      {logo && (
        <Image
          src={logo}
          alt="Github Logo"
          width={500}
          height={500}
          className="w-full h-auto cursor-pointer"
          priority
        />
      )}
      {title && <h2 className="block w-full self-center self-end font-bold text-xl mt-auto leading-6">
          {title.split('\\n').map((line, index) => ( //To insert line break from string
            <span className="opacity-50" key={index}>{line}<br /></span>
          ))}
          {titleHighlight.split('\\n').map((line, index) => ( //To insert line break from string
            <span key={index}>{line}<br /></span>
          ))}
      </h2>}
      
    </RoundedBorderCard>
  );
}
