"use client";
import { useState } from "react";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import credentialsStore from "@/stores/credentialsStore";
import MusicKitInitializer from "@/app/_utils/apple-music-api-wrapper/MusicKitInitializer";

export default function MigrateToAppleMusic() {
  const [key, setKey] = useState(2);
  const { musicKitInstance } = credentialsStore((state) => ({
    musicKitInstance: state.musicKitInstance,
  }));

  async function fetchData() {
    if (musicKitInstance) {
      musicKitInstance.authorize();
    } else {
      setKey((prevKey) => prevKey + 1);
      if (musicKitInstance) {
        musicKitInstance.authorize();
      }
    }

    console.log(musicKitInstance.isAuthorized);
  }

  async function getLibrary() {
    console.log(musicKitInstance.isAuthorized);
    if (musicKitInstance && musicKitInstance.isAuthorized) {
      const library = await musicKitInstance.api.music(
        "v1/me/library/playlists"
      );
      console.log("Library", library);
    }
  }

  return (
    <div>
      <MusicKitInitializer key={key} />
      <RountedButton className="mt-10" onClick={fetchData}>
        Log in to Apple Music
      </RountedButton>
      <RountedButton className="mt-10" onClick={getLibrary}>
        Test Apple Music API
      </RountedButton>
    </div>
  );
}
