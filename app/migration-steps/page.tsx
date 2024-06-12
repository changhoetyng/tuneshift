"use client";
import FloatingCard from "@/app/_ui/card/FloatingCard";
import NavigationButton from "@/app/_ui/buttons/NavigationButton";
import VerticalSteps from "@/app/_ui/widgets/VerticalSteps";
import {
  useCredentialsStore,
  useCredentialsPersistantStore,
} from "@/stores/credentialsStore";
import LoginToAppleMusic from "@/app/_ui/migration-steps/LogInToAppleMusic";
import LoginToSpotify from "@/app/_ui/migration-steps/LoginToSpotify";
import ShowPlaylist from "@/app/_ui/migration-steps/ShowPlaylist";
import { useRouter } from "next/navigation";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function MigrateToAppleMusic() {
  const router = useRouter();

  const { updateCanMigrate, migrationMethod } = useUIStateStore((state) => ({
    updateCanMigrate: state.updateCanMigrate,
    migrationMethod: state.migrationMethod,
  }));

  const { isMusicKitInstanceAuthorized } = useCredentialsStore((state) => ({
    isMusicKitInstanceAuthorized: state.isMusicKitInstanceAuthorized,
  }));

  const { spotifyAccessToken } = useCredentialsPersistantStore((state) => ({
    updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    spotifyAccessToken: state.spotifyAccessToken,
  }));

  function onSelectPlaylist() {
    updateCanMigrate(true);
    router.push("/playlist-selection");
  }

  async function backToOptions() {
    router.push("/" + "migrate");
  }

  return (
    <div className="pl-5 pr-5 sm:p-0 flex animate-fadeInUpFast w-full h-full justify-center align-center flex-col">
      <FloatingCard
        className="flex flex-col w-full p-5 pt-8 pb-8 sm:p-14 sm:pt-8 mb-40"
        optionsBar={
          <NavigationButton onClick={backToOptions}>
            Back to Options
          </NavigationButton>
        }
      >
        <h1 className="text-2xl text-center mb-8 sm:mb-0">
          {migrationMethod == "spotify-to-apple-music"
            ? "Migrate To Apple Music"
            : "Migrate To Spotify"}
        </h1>
        <VerticalSteps
          className="mt-6 w-full"
          height={80}
          steps={[
            {
              step: "1",
              isDone: isMusicKitInstanceAuthorized,
              element: ({ disabled }) => (
                <LoginToAppleMusic disabled={disabled} />
              ),
            },
            {
              step: "2",
              isDone: spotifyAccessToken != null,
              element: ({ disabled }) => <LoginToSpotify disabled={disabled} />,
            },
            {
              step: "3",
              isDone: true,
              element: ({ disabled }) => (
                <ShowPlaylist
                  disabled={disabled}
                  onSelectPlaylist={onSelectPlaylist}
                />
              ),
            },
          ]}
        ></VerticalSteps>
      </FloatingCard>
    </div>
  );
}
