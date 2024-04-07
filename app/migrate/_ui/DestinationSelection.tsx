import Image, { StaticImageData } from "next/image";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import Link from "next/link";

interface DestinationSelectionProps {
  logo?: StaticImageData;
  onClickLink: string;
}

export default async function DestinationSelection({
  logo,
  onClickLink,
}: DestinationSelectionProps) {
  return (
    <RoundedBorderCard className="flex flex-col justify-center items-center">
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
      <div className="flex flex-row justify-center self-center mt-16">
        <Link href={onClickLink}>
          <RountedButton className="w-24">Migrate</RountedButton>
        </Link>
      </div>
    </RoundedBorderCard>
  );
}
