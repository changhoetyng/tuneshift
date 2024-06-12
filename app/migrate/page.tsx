"use client";
import DestinationSelection from "@/app/migrate/_ui/DestinationSelection";
import SpotifyToAppleImage from "@/public//Spotify-Apple.png";
import AppleToSpotifyImage from "@/public//Apple-Spotify.png";
import LoadingComponent from "../_ui/global/LoadingComponent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function Migrate() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("Build:", process.env.NEXT_PUBLIC_APP_BUILD);
  }, []);

  const { updateMigrationMethod } = useUIStateStore((state) => ({
    updateMigrationMethod: state.updateMigrationMethod,
  }));

  const handleClick = (e: React.MouseEvent, destination: string) => {
    e.preventDefault();
    const routerTimeout = setTimeout(() => {
      updateMigrationMethod(destination);
      router.push("/migration-steps");
    }, 250);

    const loadingTimeout = setTimeout(() => {
      setLoading(true);
    }, 350);
  };

  return !loading ? (
    <div
      className={`flex flex-col justify-center items-center h-full w-full transition-all ease-in-out animate-fadeInUpFast ${
        isAnimating ? "animate-fadeOutUpFast" : ""
      }`}
    >
      <h1 className="text-3xl text-center font-bold p-6">Migrate Playlists</h1>
      <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-2 gap-12 mt-6">
        <a
          onClick={(e) => {
            handleClick(e, "apple-music-to-spotify");
            setIsAnimating(true);
          }}
        >
          <DestinationSelection
            logo={AppleToSpotifyImage}
            className="cursor-pointer bg-white/15 transition-none hover:bg-white/15"
            title="Apple Music \n to"
            titleHighlight="Spotify"
          />
        </a>
        <a
          onClick={(e) => {
            handleClick(e, "spotify-to-apple-music");
            setIsAnimating(true);
          }}
        >
          <DestinationSelection
            logo={SpotifyToAppleImage}
            className="cursor-pointer bg-white/15 transition-none hover:bg-white/15"
            title="Spotify \n to"
            titleHighlight="Apple Music"
          />
        </a>
      </div>
    </div>
  ) : (
    <div className="flex justify-center h-full">
      <LoadingComponent
        size="small"
        type="apple-to-spotify"
        className="m-auto"
      />
    </div>
  );
}
