/* eslint-disable @next/next/no-img-element */
import styles from "./PlaylistCard.module.css";
import ColorThief from "colorthief";
import { useRef, useEffect, useState } from "react";
import clsx from "clsx";

export default function PlaylistCard() {
  const imgRef = useRef(null);
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [textColor, setTextColor] = useState("white");

  useEffect(() => {
    if (imgRef.current && (imgRef.current as HTMLImageElement).complete) {
      extractImagePalette();
    }
  }, []);

  function extractImagePalette() {
    let color_thief = new ColorThief();
    let sample_image = new Image();

    sample_image.onload = () => {
      const data = color_thief.getPalette(sample_image);
<<<<<<< Updated upstream:app/_utils/playlist-card/PlaylistCard.tsx
      const color = color_thief.getColor(sample_image);
      console.log("Color", color);
=======
      const color1 = data[0];
      const color2 = data[1];
      const color3 = data[2];
>>>>>>> Stashed changes:app/_ui/card/PlaylistCard.tsx
      const newBackgroundStyle = data
        ? {
            background: `linear-gradient(0.3turn, rgb(${data[0]}), rgb(${data[1]}), rgb(${data[2]}))`,
          }
        : {};
      setBackgroundStyle(newBackgroundStyle);
      // Calculate brightness of the first color in the palette
      const brightness = (color[0] / 255.0) * 0.3 + (color[1] / 255.0) * 0.59 + (color[2] / 255.0) * 0.11;
      // If brightness is above 125, set text color to white
      console.log("Brightness", brightness);
      if (brightness > 0.4) {
        setTextColor("black");
      } else {
        setTextColor("white");
      }
      console.log("Background Style", newBackgroundStyle);
    };

    sample_image.crossOrigin = "anonymous";
<<<<<<< Updated upstream:app/_utils/playlist-card/PlaylistCard.tsx
    const playlistImage = document.getElementById("playlist-image") as HTMLImageElement;
=======
    const playlistImage = document.getElementById(id) as HTMLImageElement;

>>>>>>> Stashed changes:app/_ui/card/PlaylistCard.tsx
    if (playlistImage) {
      sample_image.src = playlistImage.src;
    }
  }

  return (
    <div className={clsx(styles["playlist-card"])} style={backgroundStyle}>
      {/* <div className={styles["playlist-card"], style={backgroundStyle}}> */}
      <img
        ref={imgRef}
        src="https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da848c816e34bfa173c33187b6bf"
        id="playlist-image"
        width={130}
        alt="playlist"
      />
      <h3 className="mt-3" style={{ color: textColor }}>Playlist Name</h3>
    </div>
  );
}
