/* eslint-disable @next/next/no-img-element */
import styles from "./PlaylistCard.module.css";
import ColorThief from "colorthief";
import { useRef, useState } from "react";
import clsx from "clsx";

export default function PlaylistCard({
  src,
  name,
  id,
  onClick,
  isSelected,
}: Readonly<{
  src: string;
  name: string;
  id: string;
  isSelected?: boolean;
  onClick?: () => void;
}>) {
  const imgRef = useRef(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [textColor, setTextColor] = useState("white");

  // useEffect(() => {
  //   if (imgRef.current && (imgRef.current as HTMLImageElement).complete) {
  //     extractImagePalette();
  //   }
  // }, []);

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
            background: `linear-gradient(0.3turn, rgb(${data[0]}), rgb(${data[1]}), rgb(${data[2]}))`,
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
        isSelected ? "border-2 border-primary" : ""
      )}
      style={backgroundStyle}
      onClick={onClick}
    >
      <img
        ref={imgRef}
        src={src}
        id={id}
        onLoad={extractImagePalette}
        width={130}
        alt="playlist"
      />
      <h3 className="mt-4" style={{ color: textColor, fontWeight: "bold" }}>
        {name}
      </h3>
    </button>
  );
}
