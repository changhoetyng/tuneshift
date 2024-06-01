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
import InfiniteScrolling from "../_ui/global/InfiniteScrolling";

export default function PlaylistSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const [apiHelper, setApiHelper] = useState<PlaylistHelper | null>(null);
  const [total, setTotal] = useState<number>(0);
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
  const [offset, setOffset] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
  const LIMIT = 9;

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
      const playlistsRes:
        | { playlists: UserPlaylist[]; total: number }
        | undefined = await apiHelper?.getPlaylist(LIMIT, offset);
      setTotal(playlistsRes?.total ?? 0);
      const playlists = playlistsRes?.playlists;
      if (playlists === undefined) {
        updateNotificationRendererKey();
        updateNotificationTitle("Error!");
        updateNotificationMessage(
          "Failed to fetch playlists. Please try again."
        );
        router.back();
        return;
      }

      setUserPlaylists([...userPlaylists, ...playlists]);
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
    userPlaylists,
  ]);

  const fetchMoreData = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (userPlaylists?.length === total) {
        resolve(false);
        return;
      }

      setOffset(offset + LIMIT);
      resolve(false); // Resolve false if no more data
    });
  };

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
        <InfiniteScrolling
          className="grid grid-cols-3 gap-6"
          onScroll={fetchMoreData}
          style={{ minWidth: "860px", maxHeight: "800px", overflowY: "scroll" }}
        >
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
        </InfiniteScrolling>
        <FloatingIsland islandText={selectedPlaylistLength} />
      </FloatingCard>
    </div>
  );
}
