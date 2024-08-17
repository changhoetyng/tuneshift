"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./GradientTextShadow.module.css";
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
  const [gradients, setGradients] = useState([]);
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLHeadingElement>(null);

  const [gradientColors, setGradientColors] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Update the state based on window size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Assuming 768px is the breakpoint for mobile
    };

    checkScreenSize(); // Initial check
    window.addEventListener('resize', checkScreenSize); // Update on resize

    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
      let r = 0,
        g = 0,
        b = 0;
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      return { r, g, b };
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    };

    const interpolateColor = (
      color1: { r: number; g: number; b: number },
      color2: { r: number; g: number; b: number },
      factor: number
    ): { r: number; g: number; b: number } => {
      return {
        r: Math.round(color1.r + factor * (color2.r - color1.r)),
        g: Math.round(color1.g + factor * (color2.g - color1.g)),
        b: Math.round(color1.b + factor * (color2.b - color1.b)),
      };
    };

    const generateColorGradient = (
      startColor: string,
      endColor: string,
      steps: number
    ): string[] => {
      const start = hexToRgb(startColor);
      const end = hexToRgb(endColor);
      const gradient: string[] = [];

      for (let i = 0; i < steps; i++) {
        const factor = i / (steps - 1);
        const interpolatedColor = interpolateColor(start, end, factor);
        gradient.push(
          rgbToHex(
            interpolatedColor.r,
            interpolatedColor.g,
            interpolatedColor.b
          )
        );
      }
      return gradient;
    };

    const startColor = "#AB58FE";
    const endColor = "#ff00FF";
    const steps = 10;
    const gradient = generateColorGradient(startColor, endColor, steps);

    setGradientColors(gradient);
  }, []);

  useEffect(() => {
    const setGradientTextShadow = (element: HTMLElement, colors: string[]) => {
      const shadowStep = 1; // Distance between shadows
      let shadows = "";

      for (let i = 0; i < colors.length; i++) {
        const x = (i + 1) * shadowStep;
        const y = (i + 1) * shadowStep;
        shadows += `${x}px ${y}px 0 ${colors[i]}`;
        if (i < colors.length - 1) {
          shadows += ", ";
        }
      }

      element.style.textShadow = shadows;
    };

    const gradientTextElement = textRef.current;
    if (gradientTextElement && gradientColors.length > 0) {
      setGradientTextShadow(gradientTextElement, gradientColors);
    }
  }, [gradientColors]);

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
    <div className="flex flex-row min-h-56 md:min-h-0 h-15 pr-4">
      <h1 className={clsx("flex flex-wrap text-align-middle font-default mb-5", props.className)}>
      {typedText.split("").map((e, i) =>
          e == " " ? (
            <p className="p-1 w-full m-0 md:p-2 md:w-auto" key={i}></p>
          ) : (
            <p
              id={`text${i}`}
              key={i}
              style={
                i > 10
                  ? isMobile
                    ? {
                        mixBlendMode: "screen",
                        textShadow: `0px 0px 50px #ff00ff`,
                      }
                    : {
                        mixBlendMode: "screen",
                        textShadow: `0px 0px 100px ${gradientColors[i - 10]}, 0px 0px 200px ${gradientColors[i - 10]}, 0px 0px 50px ${gradientColors[i - 10]}`,
                      }
                  : { opacity: "70%" }
              }
              className={`animate-popIntoMobileLong md:animate-popIntoLong tracking-tight align-center hover:translate-y-10`}
            >
              {e}
            </p>
          )
        )}
      </h1>
      <h1 className={clsx("cursor ml-3 hidden sm:flex", props.className)}>|</h1>
    </div>
  );
}
