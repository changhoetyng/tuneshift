/* eslint-disable @next/next/no-img-element */
import styles from "./PlaylistCard.module.css";
import ColorThief from "colorthief";
import { useRef, useState, useEffect } from "react";
import clsx from "clsx";
import spotifyImg from "@/public/spotify.png";
import NextImage from "next/image";

export default function PlaylistCard({
  src,
  name,
  id,
  onClick,
  isSelected,
  customStyle,
  className,
  style,
  isSpotify,
  originalLink,
}: Readonly<{
  src: string;
  name: string;
  id: string;
  isSelected?: boolean;
  customStyle?: React.CSSProperties;
  className?: string;
  originalLink?: string;
  isSpotify?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}>) {
  const imgRef = useRef(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    if (imgRef.current && (imgRef.current as HTMLImageElement).complete) {
      extractImagePalette();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onClickSpotifyLogo(e: React.MouseEvent<HTMLImageElement>) {
    e.stopPropagation();
    window.open(originalLink, "_blank");
  }

  function extractImagePalette() {
    let color_thief = new ColorThief();
    let sample_image = new Image();

    sample_image.onload = () => {
      const data = color_thief.getPalette(sample_image);
      const color1 = data[0];
      const color2 = data[1];
      const color3 = data[2];
      const newBackgroundStyle = data
        ? {
            background: `linear-gradient(162deg, rgb(${data[0]}) -25%, rgb(${data[1]}) 40%, rgba(${data[0]}, 0.5) 65%, rgb(${data[2]}) 90%, rgb(${data[1]}) 115%)`,
          }
        : {};

      // Calculate brightness of the first color in the palette
      const brightness1 =
        (color1[0] / 255.0) * 0.3 +
        (color1[1] / 255.0) * 0.59 +
        (color1[2] / 255.0) * 0.11;

      const brightness2 =
        (color2[0] / 255.0) * 0.3 +
        (color2[1] / 255.0) * 0.59 +
        (color2[2] / 255.0) * 0.11;

      const brightness3 =
        (color3[0] / 255.0) * 0.3 +
        (color3[1] / 255.0) * 0.59 +
        (color3[2] / 255.0) * 0.11;

      const brightness = (brightness1 + brightness2 + brightness3) / 3;
      if (brightness > 0.5) {
        setTextColor("black");
      } else {
        setTextColor("white");
      }
      setBackgroundStyle(newBackgroundStyle);
    };

    sample_image.crossOrigin = "anonymous";
    const playlistImage = document.getElementById(id) as HTMLImageElement;

    if (playlistImage) {
      sample_image.src = playlistImage.src;
    }
  }

  return (
    <button
      className={clsx(
        styles["playlist-card"],
        className,
        isSelected ? "border-2 border-primary" : "",
        "w-[262px] h-[253px] overflow-visible group"
      )}
      style={{
        ...customStyle,
        ...style,
      }}
      onClick={onClick}
    >
      <div
        className={`flex flex-col relative z-[0] w-[262px] h-[253px] justify-center align-middle content-center transition-all duration-300 overflow-hidden ${
          isSelected ? "scale-90 rounded-[5px]" : "rounded-[11px]"
        }`}
      >
        <div
          className={`absolute w-full h-full z-[-1] transition-all duration-1200 blur-lg ${
            isSelected ? "scale-[1.5] opacity-70" : "scale-100 opacity-40"
          } group-hover:rotate-12 group-hover:scale-150 duration-700 group-hover:opacity-90`}
          style={{
            ...backgroundStyle,
          }}
        ></div>

        <div
          className={`absolute w-full h-full z-[-1] transition-all duration-700 rotate-90 blur-lg ${
            isSelected ? "scale-[3] opacity-40" : "scale-125 opacity-70"
          }`}
          style={{
            ...backgroundStyle,
          }}
        ></div>

        <div
          className={`absolute w-full h-full z-[-1] transition-all duration-2500 rotate-45 blur-lg ${
            isSelected ? "scale-[3] opacity-20" : "scale-150 opacity-50"
          }`}
          style={{
            ...backgroundStyle,
          }}
        ></div>
        <img
          ref={imgRef}
          src={src}
          id={id}
          onLoad={extractImagePalette}
          width={130}
          alt="playlist"
          className={`m-auto mb-0 mt-0 transition-all duration-700 ${
            isSelected ? "scale-[1.02]" : "scale-100"
          }`}
        />
        <h3
          className="mt-4 p-2 mix-blend-overlay"
          style={{ color: textColor, fontWeight: "bold", opacity: "0.8" }}
        >
          {name}
        </h3>
        {isSpotify && (
          <NextImage
            src={spotifyImg}
            alt="Spotify Logo"
            className="absolute top-5 left-5"
            onClick={onClickSpotifyLogo}
            width={24}
            height={24}
          />
        )}
      </div>
    </button>
  );
}
