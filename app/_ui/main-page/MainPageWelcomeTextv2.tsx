"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  className?: string;
}

/**
 * Renders a component that displays a typewriter effect for the welcome text.
 * @param {ButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
export default function MainPageWelcomeText(props: ButtonProps) {
  const text = props.text || "";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setTypedText((prevTypedText) => prevTypedText + text.charAt(index));
        setIndex((prevIndex) => prevIndex + 1);
      }, 50);

      return () => clearTimeout(timeout); // Clean up on unmount
    }
  }, [index, text]);

  return (
    <div className="flex flex-row">
      <h1 className={clsx(props.className)}>{typedText.split("").map((e) => e == " " ? <p className="p-2"></p> : <p className="animate-popIntoLong">{e}</p> )}</h1>
      <h1 className={clsx("cursor ml-3", props.className)}>|</h1>
    </div>
  );
}
