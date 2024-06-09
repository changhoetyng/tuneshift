import clsx from "clsx";
import Arrow from "@/public/Arrow.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
interface IslandProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  islandText?: string | null;
  onClick?: () => void;
}
/**
 * A floating island component.
 *
 * @component
 * @param {IslandProps} props - The island props.
 * @param {React.ReactNode} props.children - The content of the island.
 * @param {string} props.islandClassName - The additional class name for the island.
 * @param {string} props.buttonClassName - The additional class name for the button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.rest - The rest of the button attributes.
 * @returns {JSX.Element} The rendered island component.
 */
export default function FloatingIsland({
  islandText,
  onClick,
}: Readonly<IslandProps>) {
  const [key, setKey] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    const toggleAnimation = () => {
      setIsExpanding(!isExpanding);
      setKey(!key);
    };
    if (
      (islandText && islandText.length > 0 && !isExpanding) ||
      ((!islandText || islandText.length == 0) && isExpanding)
    ) {
      toggleAnimation();
    }
  }, [isExpanding, islandText, key]);

  return (
    <div className={clsx("absolute inset-x-0 bottom-8 flex justify-center")}>
      <div
        data-testid="floating-island"
        className={clsx(
          "rounded-full h-12 w-40 bg-secondary relative flex mr-4 justify-center items-center",
          isExpanding ? "expand-animation" : "shrink-animation"
        )}
      >
        <div
          className={clsx(
            "rounded-full bg-primary h-4 w-4 absolute left-4",
            isExpanding ? "show-word" : "hide-icon"
          )}
        ></div>
        <h1
          className={clsx(
            "ml-6 font-bold",
            isExpanding ? "show-word" : "hide-word"
          )}
        >
          {islandText}
        </h1>
      </div>
      <button
        className={clsx(
          "transition-all rounded-full h-12 w-12 bg-secondary flex justify-center items-center cursor-pointer"
        )}
        data-testid="arrow-button"
        onClick={onClick}
      >
        <Image src={Arrow} alt="Arrow" height={18} />
      </button>
    </div>
  );
}
