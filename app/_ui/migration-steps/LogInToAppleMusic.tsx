"use client";
import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";
import { useState, useEffect } from "react";
import { useCredentialsStore } from "@/stores/credentialsStore";
import MusicKitInitializer from "@/app/_utils/apple-music-api-wrapper/MusicKitInitializer";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function LoginToAppleMusic({
  disabled,
}: {
  disabled?: boolean;
}) {
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
  const {
    updateNotificationMessage,
    updateNotificationTitle,
    updateNotificationRendererKey,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,
  }));

  useEffect(() => {
    updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
    console.log(musicKitInstance);
  }, [musicKitInstance, updateIsMusicKitAuthorized]);

  async function onLoginAppleMusic() {
    if (musicKitInstance) {
      await musicKitInstance
        .authorize()
        .then(() => {
          updateNotificationRendererKey();
          updateNotificationTitle("Success!");
          updateNotificationMessage("Logged in to Apple Music");
        })
        .catch(() => {
          updateNotificationRendererKey();
          updateNotificationTitle("Error!");
          updateNotificationMessage("Error logging in to Apple Music");
        });
    } else {
      setKey((prevKey) => prevKey + 1);
      if (musicKitInstance) {
        await musicKitInstance
          .authorize()
          .then(() => {
            updateNotificationRendererKey();
            updateNotificationTitle("Success!");
            updateNotificationMessage("Logged in to Apple Music");
          })
          .catch(() => {
            updateNotificationRendererKey();
            updateNotificationTitle("Error!");
            updateNotificationMessage("Error logging in to Apple Music");
          });
      }
    }
    updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
  }
  async function onLogoutAppleMusic() {
    if (musicKitInstance) {
      await musicKitInstance.unauthorize();
      updateNotificationRendererKey();
      updateNotificationTitle("Success!");
      updateNotificationMessage("Logged out from Apple Music");
      updateIsMusicKitAuthorized(musicKitInstance?.isAuthorized);
    }
  }

  return (
    <div>
      <MusicKitInitializer key={key} />
      {!isMusicKitInstanceAuthorized && (
        <LongRoundedButton onClick={onLoginAppleMusic} disabled={disabled}>
          Log In to Apple Music
        </LongRoundedButton>
      )}
      {isMusicKitInstanceAuthorized && (
        <LongRoundedButton onClick={onLogoutAppleMusic} disabled={disabled}>
          Logged In to Apple Music
        </LongRoundedButton>
      )}
    </div>
  );
}
