"use client";
import { useEffect } from "react";
import { AppleMusicAuthentication } from "@/app/_utils/apple-music-api-wrapper/apple-music-authentication";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { usePathname } from "next/navigation";

export default function MigrateToAppleMusic() {
  const pathname = usePathname();
  const { updateMusicKitInstance } = useCredentialsStore((state) => ({
    updateMusicKitInstance: state.updateMusicKitInstance,
  }));

  useEffect(() => {
    async function authenticateDeveloperAPI() {
      updateMusicKitInstance(await AppleMusicAuthentication());
    }
    authenticateDeveloperAPI();
  }, [updateMusicKitInstance, pathname]);

  return <div className="w-full"></div>;
}
