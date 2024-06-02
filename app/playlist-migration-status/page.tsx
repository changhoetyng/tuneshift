"use client";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";
import FloatingCard from "../_ui/card/FloatingCard";
import { animated, useSprings } from "@react-spring/web";

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

  function initialState(index: number) {
    if (index === selectedIndex) {
      return {
        height: "253px",
        width: "262px",
        minWidth: "262px",
        opacity: 1,
        translateX: DEFAULT_ROTATION * selectedIndex,
        filter: "grayscale(0%)",
      };
    } else {
      return {
        height: "235px",
        width: "235px",
        minWidth: "235px",
        opacity: 1,
        translateX: DEFAULT_ROTATION * selectedIndex,
        filter: "grayscale(100%)",
      };
    }
  }

  let selectedIndex = 0;
  const DEFAULT_ROTATION = -278;

  const [springs, api] = useSprings(6, (index) => initialState(index));

  async function animate() {
    await api.start((index) => {
      return initialState(index);
    });
    selectedIndex += 1;
    selectedIndex %= 6;
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
                style={springs[index]}
              />
            ))}
          </div>
        </div>
        <button onClick={animate}>Hello</button>
      </FloatingCard>
    </div>
  );
}
