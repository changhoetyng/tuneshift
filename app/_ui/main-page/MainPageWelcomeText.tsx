"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  className?: string;
}

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
    <div>
      <h1 className={clsx(props.className)}>
        {typedText} <span className="cursor">|</span>
      </h1>
    </div>
  );
}
