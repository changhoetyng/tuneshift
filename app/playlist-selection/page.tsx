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
import AppleMusicApiHelper from "../_utils/apple-music-api-wrapper/AppleMusicApiHelper";

export default function PlaylistSelection() {
  const router = useRouter();
  const [apiHelper, setApiHelper] = useState<
    SpotifyApiHelper | AppleMusicApiHelper | null
  >();
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

  const { spotifyApiHelper, appleMusicHelper } = useCredentialsStore(
    (state) => ({
      spotifyApiHelper: state.spotifyApiHelper,
      appleMusicHelper: state.appleMusicHelper,
    })
  );

  // Playlists Data
  const [offset, setOffset] = useState(0);
  const [userPlaylists, setUserPlaylists] = useState<UserPlaylist[]>([]);
  const LIMIT = 9;

  const { canMigrate } = useUIStateStore((state) => ({
    canMigrate: state.canMigrate,
    updateCanMigrate: state.updateCanMigrate,
  }));

  function backToFlow() {
    router.push(`/migration-steps?destination=${migrationMethod}`);
  }
  useEffect(() => {
    function getApiHelper() {
      if (migrationMethod === "/spotify-to-apple-music") {
        return spotifyApiHelper;
      }

      if (migrationMethod === "/apple-music-to-spotify") {
        return appleMusicHelper;
      }

      return null;
    }

    function checkRoute() {
      const VALID_MODE = ["/spotify-to-apple-music", "/apple-music-to-spotify"];
      if (migrationMethod === null || !VALID_MODE.includes(migrationMethod))
        router.push("/");
      if (!canMigrate) router.push("/");
    }

    checkRoute();
    setApiHelper(getApiHelper());
  }, [canMigrate, migrationMethod, router, spotifyApiHelper, appleMusicHelper]);

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
      // setUserPlaylists([]);
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
    console.log(userPlaylists.length);
    console.log(total);
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
    <div className=" m-[7vh] ml-auto mr-auto w-full max-h-fit max-w-fit">
      <FloatingCard
        className="w-full relative"
        optionsBar={
          <NavigationButton className="mb-6" onClick={() => backToFlow()}>
            Back to Flow
          </NavigationButton>
        }
      >
        <InfiniteScrolling
          className="p-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3 grid-cols-2 md:gap-6 max-h-[850px] md:min-w-fit lg:min-w-[860px] lg:w-[800px]"
          onScroll={fetchMoreData}
          // style={{
          //   minWidth: "860px",
          //   maxHeight: "700px",
          // }}
        >
          {!userPlaylists.length &&
            new Array(9)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="bg-neutral-700 w-[250px] h-[250px] animate-pulse rounded-lg"
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
          <div className="flex flex-col align-center justify-center">
            <h2>{userPlaylists.length} loaded</h2>
            <div className={"flex w-fit mt-5"}>
              {userPlaylists?.length < total ? (
                <LoadingComponent
                  type={
                    migrationMethod == "spotify-to-apple-music"
                      ? "spotify-to-apple"
                      : "apple-to-spotify"
                  }
                />
              ) : (
                <h3 className="font-bold">That&rsquo;s all folks!</h3>
              )}
            </div>
          </div>
        </InfiniteScrolling>
      </FloatingCard>
      <FloatingIsland islandText={selectedPlaylistLength} onClick={migrate} />
    </div>
  );
}
