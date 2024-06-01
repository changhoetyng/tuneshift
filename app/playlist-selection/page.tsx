"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";
import FloatingCard from "@/app/_ui/card/FloatingCard";
import NavigationButton from "@/app/_ui/buttons/NavigationButton";
import { PlaylistHelper } from "@/interfaces/PlaylistHelper";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { UserPlaylist } from "@/types/playlists";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";
import FloatingIsland from "@/app/_ui/buttons/FloatingIsland";

export default function PlaylistSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [apiHelper, setApiHelper] = useState<PlaylistHelper | null>(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set()
  );
  const selectedPlaylistLength = useMemo(() => {
    const size = selectedPlaylists.size;
    if (size == 0) {
      return null;
    }

    return size + " Selected";
  }, [selectedPlaylists]);

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

  // Playlists Data
  const [offset] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>();
  const LIMIT = 6;

  const { canMigrate } = useUIStateStore((state) => ({
    canMigrate: state.canMigrate,
    updateCanMigrate: state.updateCanMigrate,
  }));

  function backToFlow() {
    router.push("/" + from);
  }
  useEffect(() => {
    function getApiHelper() {
      if (from === "spotify-to-apple-music") {
        return spotifyApiHelper;
      }

      return null;
    }

    function checkRoute() {
      const VALID_MODE = ["spotify-to-apple-music"];
      if (from === null || !VALID_MODE.includes(from)) router.push("/");
      if (!canMigrate) router.push("/");
    }

    checkRoute();
    setApiHelper(getApiHelper());
  }, [canMigrate, from, router, spotifyApiHelper]);

  const onSetSelectedPlaylists = (id: string) => {
    if (selectedPlaylists.has(id)) {
      selectedPlaylists.delete(id);
      setSelectedPlaylists((prevState) => {
        const newState = new Set(prevState);
        newState.delete(id);
        return newState;
      });
    } else {
      setSelectedPlaylists((prevState) => {
        const newState = new Set(prevState);
        newState.add(id);
        return newState;
      });
    }
  };

  useEffect(() => {
    async function getPlaylists() {
      const playlists: UserPlaylist[] | undefined =
        await apiHelper?.getPlaylist(LIMIT, offset);
      if (playlists === undefined) {
        updateNotificationRendererKey();
        updateNotificationTitle("Error!");
        updateNotificationMessage(
          "Failed to fetch playlists. Please try again."
        );
        router.back();
        return;
      }

      setUserPlaylists(playlists);
    }

    if (apiHelper) {
      getPlaylists();
    }
  }, [
    apiHelper,
    offset,
    router,
    updateNotificationMessage,
    updateNotificationRendererKey,
    updateNotificationTitle,
  ]);

  return (
    <div className="mt-6 min-h-fit min-w-fit overflow-auto">
      <FloatingCard
        className="pl-20 pr-20 pb-14 pt-8 relative"
        optionsBar={
          <NavigationButton className="mb-6" onClick={() => backToFlow()}>
            Back to Flow
          </NavigationButton>
        }
      >
        <div className="grid grid-cols-3 gap-6" style={{ minWidth: "860px" }}>
          {userPlaylists?.map((playlist, index) => (
            <PlaylistCard
              onClick={() => onSetSelectedPlaylists(playlist.id)}
              isSelected={selectedPlaylists.has(playlist.id)}
              src={playlist.image}
              name={playlist.name}
              key={"playlist-image-" + index}
              id={"playlist-image-" + index}
            />
          ))}
        </div>
        <FloatingIsland islandText={selectedPlaylistLength} />
      </FloatingCard>
    </div>
  );
}
