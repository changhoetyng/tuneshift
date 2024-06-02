"use client";
import DestinationSelection from "@/app/migrate/_ui/DestinationSelection";
import SpotifyToAppleImage from "@/public//Spotify-Apple.png";
import AppleToSpotifyImage from "@/public//Apple-Spotify.png";
import LoadingComponent from "../_ui/global/LoadingComponent";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Migrate() {

  const [isAnimating, setIsAnimating] = useState(false);
  const [countDown, setCountDown] = useState(0);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, destination: string) => {
    e.preventDefault();
    setTimeout(() => {
      router.push(destination);
    }, 250);

    setInterval(() => {
      setCountDown(countDown + 33.3)
    }, 33.3)
  };



  return (countDown <= 250 ?
    <div className={`flex flex-col justify-center items-center h-full transition-all ease-in-out animate-fadeInUpFast ${isAnimating ? "animate-fadeOutUpFast" : ""}`}>
      <h1 className="text-3xl text-center font-bold p-6">Migrate Playlists</h1>
      <div className="grid grid-cols-1 pb-10 sm:grid-cols-2 md:grid-cols-2 gap-12 mt-6">

          <DestinationSelection
            logo={AppleToSpotifyImage}
            className="cursor-not-allowed "
            title="Apple Music \n to"
            titleHighlight="Spotify"
            
          />
        <a onClick = {(e) => {
          handleClick(e, "/spotify-to-apple-music")
          setIsAnimating(true)
        }}>
          <DestinationSelection
            logo={SpotifyToAppleImage}
            className="cursor-pointer bg-white/15 transition-none hover:bg-white/15"
            title="Spotify \n to"
            titleHighlight="Apple Music"
          />
        </a>
        
        {/* <RoundedBorderCard className="flex flex-col justify-center items-center">
          <h1 className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            More destinations coming soon!
          </h1>
        </RoundedBorderCard> */}
      </div>
    </div>
    :
    <div className="flex justify-center h-full">
      <LoadingComponent size="small" type="apple-to-spotify"/>
    </div>
    
  );
}
