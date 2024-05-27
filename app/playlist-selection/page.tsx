"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";
import FloatingCard from "@/app/_ui/card/FloatingCard";
import NavigationButton from "@/app/_ui/buttons/NavigationButton";
import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { UserPlaylist } from "@/types/playlists";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";

export default function PlaylistSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [apiHelper, setApiHelper] = useState<PlaylistHelper | null>(null);

  const {
    updateNotificationMessage,
    updateNotificationTitle,
    updateNotificationRendererKey,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,
  }));

  const { spotifyApiHelper } = useCredentialsStore((state) => ({
    spotifyApiHelper: state.spotifyApiHelper,
  }));

  function getApiHelper() {
    console.log(spotifyApiHelper);
    if (from === "spotify-to-apple-music") {
      return spotifyApiHelper;
    }

    return null;
  }
  // Playlists Data
  const [offset, setOffset] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>();
  const LIMIT = 6;

  const { canMigrate, updateCanMigrate } = useUIStateStore((state) => ({
    canMigrate: state.canMigrate,
    updateCanMigrate: state.updateCanMigrate,
  }));

  function checkRoute() {
    const VALID_MODE = ["spotify-to-apple-music"];
    if (from === null || !VALID_MODE.includes(from)) router.push("/");
    if (!canMigrate) router.push("/");
  }

  function backToFlow() {
    router.push("/" + from);
  }

  async function getPlaylists() {
    console.log(apiHelper);
    const playlists: UserPlaylist[] | undefined = await apiHelper?.getPlaylist(
      LIMIT,
      offset
    );
    if (playlists === undefined) {
      updateNotificationRendererKey();
      updateNotificationTitle("Error!");
      updateNotificationMessage("Failed to fetch playlists. Please try again.");
      router.back();
      return;
    }

    console.log(playlists);
    setUserPlaylists(playlists);
  }

  useEffect(() => {
    checkRoute();
    setApiHelper(getApiHelper());
  }, []);

  useEffect(() => {
    if (apiHelper) {
      getPlaylists();
    }
  }, [apiHelper]);

  return (
    <div>
      <FloatingCard
        className="pl-14 pr-14 pb-14 pt-8"
        optionsBar={
          <NavigationButton onClick={() => backToFlow()}>
            Back to Flow
          </NavigationButton>
        }
      >
        <div className="grid grid-cols-3 gap-6">
          {userPlaylists?.map((playlist, index) => (
            <PlaylistCard
              src={playlist.image}
              name={playlist.name}
              key={"playlist-image-" + index}
              id={"playlist-image-" + index}
            />
          ))}
        </div>
      </FloatingCard>
    </div>
  );
}
