"use client";
import { useRouter } from "next/navigation";
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
import SpotifyApiHelper from "../_utils/spotify-api-wrapper/SpotifyApiHelper";
import LoadingComponent from "../_ui/global/LoadingComponent";

export default function PlaylistSelection() {
  const router = useRouter();
  const [apiHelper, setApiHelper] = useState<SpotifyApiHelper | null>();
  const [total, setTotal] = useState<number>(0);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set()
  );
  const [isFetching, setIsFetching] = useState(false);
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
    updateSelectedPlaylists,
    migrationMethod,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,

    // Migrate Context
    updateSelectedPlaylists: state.updateSelectedPlaylists,
    migrationMethod: state.migrationMethod,
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
    router.push("/" + migrationMethod);
  }
  useEffect(() => {
    function getApiHelper() {
      if (migrationMethod === "spotify-to-apple-music") {
        return spotifyApiHelper;
      }

      return null;
    }

    function checkRoute() {
      const VALID_MODE = ["spotify-to-apple-music"];
      if (migrationMethod === null || !VALID_MODE.includes(migrationMethod))
        router.push("/");
      if (!canMigrate) router.push("/");
    }

    checkRoute();
    setApiHelper(getApiHelper());
  }, [canMigrate, migrationMethod, router, spotifyApiHelper]);

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
      setIsFetching(true);

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

      setUserPlaylists((prevState) => [...prevState, ...playlists]);
      setIsFetching(false);
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

  const fetchMoreData = async (): Promise<boolean> => {
    console.log("Fetching More Data");
    return new Promise((resolve) => {
      if (userPlaylists?.length >= total) {
        resolve(false);
        return;
      }

      setOffset(offset + LIMIT);
      const interval = setInterval(() => {
        if (!isFetching) {
          clearInterval(interval);
          resolve(true);
        }
      }, 1000);
      resolve(true); // Resolve false if no more data
    });
  };

  const migrate = () => {
    if (selectedPlaylists.size === 0) {
      updateNotificationRendererKey();
      updateNotificationTitle("No Playlist Selected");
      updateNotificationMessage("Please select at least one playlist.");
      return;
    }

    let selectedPlaylistsObject: UserPlaylist[] = [];

    for (const playlist of Array.from(selectedPlaylists)) {
      selectedPlaylistsObject.push(
        userPlaylists.find(
          (userPlaylist) => userPlaylist.id === playlist
        ) as UserPlaylist
      );
    }

    updateSelectedPlaylists(selectedPlaylistsObject);
    router.push("/" + "playlist-migration-status");
  };

  return (
    <div className="mt-6 min-h-fit min-w-fit">
      <FloatingCard
        className="p-5 pb-14 pt-8 relative"
        optionsBar={
          <NavigationButton className="mb-6" onClick={() => backToFlow()}>
            Back to Flow
          </NavigationButton>
        }
      >
        <InfiniteScrolling
          className="grid grid-cols-3 gap-6"
          onScroll={fetchMoreData}
          style={{
            minWidth: "860px",
            maxHeight: "700px",
          }}
        >
          {!userPlaylists?.length &&
            new Array(10)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="w-[250px] h-[250px] animate-pulse"
                ></div>
              ))}
          {userPlaylists?.map((playlist, index) => (
            <PlaylistCard
              onClick={() => onSetSelectedPlaylists(playlist.id)}
              isSelected={selectedPlaylists.has(playlist.id)}
              src={playlist.image}
              name={playlist.name}
              isSpotify={migrationMethod === "spotify-to-apple-music"}
              originalLink={playlist.originalLink}
              key={"playlist-image-" + index}
              id={"playlist-image-" + index}
            />
          ))}

          <h2>{userPlaylists.length} loaded</h2>
          <div className={"flex justify-end w-full"}>
            <LoadingComponent />
          </div>
        </InfiniteScrolling>
        <FloatingIsland islandText={selectedPlaylistLength} onClick={migrate} />
      </FloatingCard>
    </div>
  );
}
