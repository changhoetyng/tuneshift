import clsx from "clsx";
import Image from "next/image";
import RightArrow from "@/public/RightArrow.svg";

interface LongRoundedButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean; // Added disabled prop
}

export default function LongRoundedButton({
  children,
  className,
  disabled = false, // Default value for disabled prop
}: LongRoundedButtonProps) {
  return (
    <div
      style={{ width: "300px" }}
      className={clsx(
        "rounded-lg h-9 font-bold pl-4 pr-4 pt-1 pb-1 bg-secondary border border-white text-white flex justify-between items-center",
        className,
        {
          "opacity-50 cursor-not-allowed": disabled,
          "cursor-pointer": !disabled,
        } // Apply disabled styles
      )}
      // Disable the button if disabled prop is true
      // You can also add other event handlers if needed
      onClick={!disabled ? () => {} : undefined}
    >
      <div>{children}</div>
      <div>
        <Image src={RightArrow} alt="RightArrow" height={15} />
      </div>
    </div>
  );
}
