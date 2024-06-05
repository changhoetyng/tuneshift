/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";

type LoadingComponentProps = {
  type?: "default" | "spotify-to-apple" | "apple-to-spotify";
  speed?: string;
  size?: "small" | "large";
  [key: string]: any;
};

const LoadingComponent: React.FC<LoadingComponentProps> = ({
  type = "spotify-to-apple",
  speed = "1s",
  size = "small",
}) => {
  const [sequence, setSequence] = useState(0);

  useEffect(() => {
    const thisInterval = setInterval(() => {
      const currentSequence = sequence + 1;
      setSequence(currentSequence % 4);
    }, 500);
    return () => clearInterval(thisInterval);
  }, [sequence]);

  return type == "apple-to-spotify" ? (
    <div
      className={clsx(
        "m-auto flex grid-cols-4 w-max",
        size == "small" ? "gap-1" : "gap-2"
      )}
    >
      <img
        src="loading-1.svg"
        className={clsx(
          "animate-fadeInOut1",
          size == "small" ? "max-w-5" : "max-w-10"
        )}
        alt=""
      />
      <img
        src="loading-2.svg"
        className={clsx(
          "animate-fadeInOut2",
          size == "small" ? "max-w-4" : "max-w-8"
        )}
        alt=""
      />
      <img
        src="loading-3.svg"
        className={clsx(
          "animate-fadeInOut3",
          size == "small" ? "max-w-4" : "max-w-8"
        )}
        alt=""
      />
      <img
        src="loading-4.svg"
        className={clsx(
          "animate-fadeInOut4",
          size == "small" ? "max-w-5" : "max-w-10"
        )}
        alt=""
      />
    </div>
  ) : (
    <div
      className={clsx(
        "m-auto flex grid-cols-4 ",
        size == "small" ? "gap-1" : "gap-2"
      )}
    >
      <img
        src="loading-4.svg"
        className={clsx(
          "animate-fadeInOut1",
          size == "small" ? "max-w-5" : "max-w-10"
        )}
        alt=""
      />
      <img
        src="loading-3.svg"
        className={clsx(
          "animate-fadeInOut2",
          size == "small" ? "max-w-4" : "max-w-8"
        )}
        alt=""
      />
      <img
        src="loading-2.svg"
        className={clsx(
          "animate-fadeInOut3",
          size == "small" ? "max-w-4" : "max-w-8"
        )}
        alt=""
      />
      <img
        src="loading-1.svg"
        className={clsx(
          "animate-fadeInOut4",
          size == "small" ? "max-w-5" : "max-w-10"
        )}
        alt=""
      />
    </div>
  );
};

export default LoadingComponent;
