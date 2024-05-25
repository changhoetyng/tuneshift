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

export default function MigrateToAppleMusic() {
  const { isMusicKitInstanceAuthorized } = useCredentialsStore((state) => ({
    isMusicKitInstanceAuthorized: state.isMusicKitInstanceAuthorized,
  }));

  const { spotifyAccessToken, updateSpotifyCodeVerifier } =
    useCredentialsPersistantStore((state) => ({
      updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
      spotifyAccessToken: state.spotifyAccessToken,
    }));

  return (
    <div>
      <FloatingCard
        className="pl-14 pr-14 pb-14 pt-8"
        optionsBar={<NavigationButton>Back to Options</NavigationButton>}
      >
        <h1 className="text-2xl text-center">Migrate To Apple Music</h1>
        <VerticalSteps
          className="mt-6"
          height={80}
          steps={[
            {
              step: "1",
              isDone: isMusicKitInstanceAuthorized,
              element: <LoginToAppleMusic />,
            },
            {
              step: "2",
              isDone: spotifyAccessToken != null,
              element: <LoginToSpotify />,
            },
          ]}
        ></VerticalSteps>
      </FloatingCard>
    </div>
  );
}
