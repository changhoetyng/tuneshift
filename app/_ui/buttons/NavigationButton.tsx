import clsx from "clsx";
import BackArrow from "@/public/BackArrow.svg";
import Image from "next/image";

interface NavigationButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export default function NavigationButton({
  children,
  className,
  ...rest
}: NavigationButtonProps) {
  return (
    <div
      className={clsx(
        "pl-2 pr-4 pt-2 pb-2 text-xs rounded-lg bg-card text-white text-opacity-70 flex flex-row relative justify-center items-center w-fit",
        className
      )}
      {...rest}
    >
      <Image
        src={BackArrow}
        alt="BackArrow"
        height={18}
        className="absolute left-2 cursor-pointer"
      />
      <div className="ml-6">{children}</div>
    </div>
  );
}
