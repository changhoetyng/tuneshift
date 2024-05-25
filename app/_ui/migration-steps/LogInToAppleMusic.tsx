"use client";
import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";
import { useState, useEffect } from "react";
import { useCredentialsStore } from "@/stores/credentialsStore";
import MusicKitInitializer from "@/app/_utils/apple-music-api-wrapper/MusicKitInitializer";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function LoginToAppleMusic() {
  const [key, setKey] = useState(2);
  const {
    musicKitInstance,
    isMusicKitInstanceAuthorized,
    updateIsMusicKitAuthorized,
  } = useCredentialsStore((state) => ({
    musicKitInstance: state.musicKitInstance,
    isMusicKitInstanceAuthorized: state.isMusicKitInstanceAuthorized,
    updateIsMusicKitAuthorized: state.updateIsMusicKitAuthorized,
  }));
  //   const [isAppleMusicLoggedIn, setIsAppleMusicLoggedIn] = useState(false);
  const { updateErrorMessage, updateErrorTitle, updateErrorRendererKey } =
    useUIStateStore((state) => ({
      updateErrorMessage: state.updateErrorMessage,
      updateErrorTitle: state.updateErrorTitle,
      updateErrorRendererKey: state.updateErrorRendererKey,
    }));

  useEffect(() => {
    updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
    console.log(musicKitInstance);
  }, [musicKitInstance, updateIsMusicKitAuthorized]);

  async function onLoginAppleMusic() {
    console.log("LOGGING IN TO APPLE MUSIC");
    if (musicKitInstance) {
      await musicKitInstance.authorize().catch(() => {
        updateErrorRendererKey();
        updateErrorTitle("Error");
        updateErrorMessage("Error logging in to Apple Music");
      });
    } else {
      setKey((prevKey) => prevKey + 1);
      if (musicKitInstance) {
        await musicKitInstance.authorize().catch(() => {
          console.log("LOGGED IN DONE TO APPLE MUSIC");
        });
      }
    }
    updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
    console.log("LOGGED IN SUCCESS TO APPLE MUSIC");
    console.log(musicKitInstance.isAuthorized);
  }
  async function onLogoutAppleMusic() {
    if (musicKitInstance) {
      await musicKitInstance.unauthorize();
      updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
    }
  }

  return (
    <div>
      <MusicKitInitializer key={key} />
      {!isMusicKitInstanceAuthorized && (
        <LongRoundedButton onClick={onLoginAppleMusic}>
          Log In to Apple Music
        </LongRoundedButton>
      )}
      {isMusicKitInstanceAuthorized && (
        <LongRoundedButton onClick={onLogoutAppleMusic}>
          Logged In to Apple Music
        </LongRoundedButton>
      )}
    </div>
  );
}
