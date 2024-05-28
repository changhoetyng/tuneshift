import Image, { StaticImageData } from "next/image";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";
import clsx from "clsx";

interface DestinationSelectionProps {
  logo?: StaticImageData;
  className: string;
  title: string;
  titleHighlight: string;
}

export default function DestinationSelection({
  logo,
  className,
  title,
  titleHighlight,
  ...rest
}: DestinationSelectionProps) {
  return (
    <RoundedBorderCard
      className={clsx(
        "flex flex-nowrap flex-col justify-between items-stretch",
        className
      )}
    >
      {" "}
      {/* < Tailwind here doesnt work */}
      {logo && (
        <Image
          src={logo}
          alt="Github Logo"
          width={500}
          height={500}
          className="w-full h-auto"
          priority
        />
      )}
      {title && (
        <h2 className="block w-full self-end font-bold text-xl mt-auto leading-6">
          {title.split("\\n").map(
            (
              line,
              index //To insert line break from string
            ) => (
              <span className="opacity-50" key={index}>
                {line}
                <br />
              </span>
            )
          )}
          {titleHighlight.split("\\n").map(
            (
              line,
              index //To insert line break from string
            ) => (
              <span key={index}>
                {line}
                <br />
              </span>
            )
          )}
        </h2>
      )}
    </RoundedBorderCard>
  );
}
