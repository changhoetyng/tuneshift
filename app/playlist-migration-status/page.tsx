"use client";
import PlaylistCard from "@/app/_ui/card/PlaylistCard";
import FloatingCard from "../_ui/card/FloatingCard";
import { animated, useSprings } from "@react-spring/web";
import { Progress } from "@/components/ui/progress";
import { use, useEffect, useState } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";
import { useRouter } from "next/navigation";
import { useCredentialsStore } from "@/stores/credentialsStore";
import { PlaylistSongs } from "@/types/playlists";
import AppleMusicApiHelper from "../_utils/apple-music-api-wrapper/AppleMusicApiHelper";

const DEFAULT_ROTATION = -251;

function initialState(index: number, selectedIndex: number = 0) {
  if (index === selectedIndex) {
    return {
      height: "253px",
      width: "262px",
      minWidth: "262px",
      opacity: 1,
      translateX: DEFAULT_ROTATION * selectedIndex,
      filter: "grayscale(0%)",
    };
  } else {
    return {
      height: "235px",
      width: "235px",
      minWidth: "235px",
      opacity: 1,
      translateX: DEFAULT_ROTATION * selectedIndex,
      filter: "grayscale(100%)",
    };
  }
}

export default function PlaylistMigrationStatusPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { selectedPlaylists, songsToMigrate, songsInfomationLoaded } =
    useUIStateStore((state) => ({
      // Migrate Context
      selectedPlaylists: state.selectedPlaylists,
      songsToMigrate: state.songsToMigrate,
      songsInfomationLoaded: state.songsInfomationLoaded,
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
      try {
        const songs: PlaylistSongs[] = await spotifyApiHelper.getSongs(
          selectedPlaylists[selectedIndex].id
        );

        const songsIds = await appleMusicHelper.getSongsId(songs);

        await appleMusicHelper.addSongsOntoPlaylist(
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
    <div>
      <FloatingCard className="pl-20 pr-20 pb-14 pt-8 relative">
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
              Transferring {songsInfomationLoaded} / {songsToMigrate} ...
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
