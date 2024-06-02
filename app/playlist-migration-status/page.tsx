"use client";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";
import FloatingCard from "../_ui/card/FloatingCard";
import { useSpring, animated } from "@react-spring/web";

export default function PlaylistMigrationStatusPage() {
  const SELECTED_DATA = [
    {
      id: "4exDLLPRSHk3oMD6LM97bj",
      name: "chai",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d341c654594e1ac355739bee",
    },
    {
      id: "4exDLLPRSHk3oMD6LM97bj",
      name: "chai",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d341c654594e1ac355739bee",
    },
    {
      id: "6orLHWtXuqPFxJRzZfqEUI",
      name: "🧸",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da8456729b03951b546ff30ec2cc",
    },
    {
      id: "2AlXUwTubfHSowAptDqsQV",
      name: "lao",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84f7c82ea9ad8273db54956586",
    },
    {
      id: "4exDLLPRSHk3oMD6LM97bj",
      name: "chai",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d341c654594e1ac355739bee",
    },
    {
      id: "4exDLLPRSHk3oMD6LM97bj",
      name: "chai",
      image:
        "https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84d341c654594e1ac355739bee",
    },
  ];

  const props = useSpring({
    from: {
      height: "253px",
      width: "262px",
      minWidth: "262px",
      opacity: 1,
      translateX: 0,
      filter: "grayscale(0%)",
    },
    to: {
      height: "235px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: -278,
      filter: "grayscale(100%)",
    },
    config: { duration: 2500 },
  });

  const props2 = useSpring({
    from: {
      height: "235px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: 0,
      filter: "grayscale(100%)",
    },
    to: {
      height: "235px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: -278,
      filter: "grayscale(100%)",
    },
    config: { duration: 2500 },
  });

  const props3 = useSpring({
    from: {
      height: "235px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: 0,
      filter: "grayscale(100%)",
    },
    to: {
      height: "253px",
      width: "262px",
      minWidth: "262px",
      opacity: 1,
      translateX: -278,
      filter: "grayscale(0%)",
    },
    config: { duration: 2500 },
  });

  function propsSelection(index: number) {
    if (index === 0) {
      return props;
    } else if (index === 1) {
      return props3;
    }
    return props2;
  }

  const AnimatedDialog = animated(PlaylistCard);

  return (
    <div>
      <h1>Playlist Migration Status</h1>
      <FloatingCard className="pl-20 pr-20 pb-14 pt-8 relative">
        <div
          className="items-center h-full"
          style={{
            width: "1000px",
            overflowX: "hidden",
            background: "#f4f4f4",
          }}
        >
          <div
            style={{
              marginLeft: "420px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {SELECTED_DATA?.map((playlist, index) => (
              <AnimatedDialog
                src={playlist.image}
                name={playlist.name}
                key={"playlist-image-migration-" + index}
                id={"playlist-image-migration-" + index}
                className="mr-4"
                style={propsSelection(index)}
              />
            ))}
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}
