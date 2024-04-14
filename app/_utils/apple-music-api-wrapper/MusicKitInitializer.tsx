"use client";
import { useEffect } from "react";
import { AppleMusicAuthentication } from "@/app/_utils/apple-music-api-wrapper/apple-music-authentication";
import credentialsStore from "@/stores/credentialsStore";
import { usePathname } from "next/navigation";
import path from "path";

export default function MigrateToAppleMusic() {
  const pathname = usePathname();
  const { updateMusicKitInstance } = credentialsStore((state) => ({
    updateMusicKitInstance: state.updateMusicKitInstance,
  }));
  useEffect(() => {
    async function authenticateDeveloperAPI() {
      updateMusicKitInstance(await AppleMusicAuthentication());
    }
    authenticateDeveloperAPI();
  }, [updateMusicKitInstance, pathname]);

  return (
    <div>
      <script
        src="https://js-cdn.music.apple.com/musickit/v3/musickit.js"
        data-web-components
        async
      ></script>
    </div>
  );
}
