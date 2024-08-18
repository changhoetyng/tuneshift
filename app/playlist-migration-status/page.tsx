"use client";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";
import FloatingCard from "../_ui/card/FloatingCard";
import { animated, useSprings } from "@react-spring/web";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";
import { useRouter } from "next/navigation";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { PlaylistSongs } from "@/types/playlists";

const DEFAULT_POSITION = -251;

function initialState(index: number, selectedIndex: number = 0) {
  if (index === selectedIndex) {
    return {
      height: "253px",
      width: "262px",
      minWidth: "262px",
      opacity: 1,
      translateX: DEFAULT_POSITION * selectedIndex,
      filter: "grayscale(0%)",
      transform: "scale(1)",
    };
  } else {
    return {
      height: "245px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: DEFAULT_POSITION * selectedIndex,
      filter: "grayscale(100%)",
      transform: "scale(0.8)",
    };
  }
}

export default function PlaylistMigrationStatusPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const {
    selectedPlaylists,
    songsToMigrate,
    songsInfomationLoaded,
    migrationMethod,
  } = useUIStateStore((state) => ({
    // Migrate Context
    selectedPlaylists: state.selectedPlaylists,
    songsToMigrate: state.songsToMigrate,
    songsInfomationLoaded: state.songsInfomationLoaded,
    migrationMethod: state.migrationMethod,
  }));

  const [springs, api] = useSprings(selectedPlaylists.length, (index) =>
    initialState(index, selectedIndex)
  );

  const { appleMusicHelper, spotifyApiHelper } = useCredentialsStore(
    (state) => ({
      spotifyApiHelper: state.spotifyApiHelper,
      appleMusicHelper: state.appleMusicHelper,
    })
  );

  function getSourceAPI() {
    if (migrationMethod === "/spotify-to-apple-music") {
      return spotifyApiHelper;
    }

    if (migrationMethod === "/apple-music-to-spotify") {
      return appleMusicHelper;
    }

    return null;
  }

  function getDestinationAPI() {
    if (migrationMethod === "/spotify-to-apple-music") {
      return appleMusicHelper;
    }

    if (migrationMethod === "/apple-music-to-spotify") {
      return spotifyApiHelper;
    }

    return null;
  }

  const sourceApiHelper = getSourceAPI();
  const destinationApiHelper = getDestinationAPI();

  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (selectedPlaylists.length === 0) {
      return router.push("/migrate");
    }
    api.start((index) => {
      return initialState(index, selectedIndex);
    });
  }, [api, router, selectedIndex, selectedPlaylists.length]);

  useEffect(() => {
    async function animate() {
      if (sourceApiHelper === null || destinationApiHelper === null) {
        router.push("/error");
        return;
      }
      try {
        const songs: PlaylistSongs[] = await sourceApiHelper.getSongs(
          selectedPlaylists[selectedIndex].id
        );

        const songsIds = await destinationApiHelper.getSongsId(songs);

        await destinationApiHelper.addSongsOntoPlaylist(
          songsIds,
          selectedPlaylists[selectedIndex]
        );

        setSelectedIndex(selectedIndex + 1);
      } catch (e) {
        router.push("/error");
      }
    }

    if (selectedIndex < selectedPlaylists.length) {
      animate();
    } else {
      router.push("/migration-done");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  const AnimatedDialog = animated(PlaylistCard);

  return (
    <div className="flex w-full justify-center">
      <FloatingCard className="pb-14 pt-8 relative">
        <div
          className="h-full"
          style={{
            width: "1000px",
            height: "500px",
            overflowX: "hidden",
          }}
        >
          <div
            className="flex items-center"
            style={{
              marginLeft: "360px",
              height: "300px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {selectedPlaylists?.map((playlist, index) => (
              <AnimatedDialog
                src={playlist.image}
                name={playlist.name}
                key={"playlist-image-migration-" + index}
                id={"playlist-image-migration-" + index}
                className="mr-4"
                style={springs[index]}
              />
            ))}
          </div>
          <div className="w-full flex flex-col items-center mt-8 word text-xl font-semibold">
            <h1>
              Transferring {selectedIndex + 1} / {selectedPlaylists.length} ...
            </h1>
            <Progress
              value={((selectedIndex + 1) / selectedPlaylists.length) * 100}
              className="w-1/2"
            />
          </div>
          <div className="w-full flex flex-col items-center mt-8 word text-xl font-semibold">
            <h1>
              Fetching {songsInfomationLoaded} / {songsToMigrate} ...
            </h1>
            <Progress
              value={(songsInfomationLoaded / songsToMigrate) * 100}
              className="w-1/2"
            />
          </div>
        </div>
      </FloatingCard>
    </div>
  );
}
