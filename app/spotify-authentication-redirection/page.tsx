"use client";
import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCredentialsPersistantStore,
  useCredentialsStore,
} from "@/stores/credentialsStore";
import retrieveTokenWithCode from "@/app/_utils/spotify-api-wrapper/retrieveTokenWithCode";
import { useUIStateStore } from "@/stores/UIStateStore";
import LoadingComponent from "../_ui/global/LoadingComponent";

function SpotifyAuthRedirection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { spotifyCodeVerifier } = useCredentialsPersistantStore((state) => ({
    spotifyCodeVerifier: state.spotifyCodeVerifier,
  }));

  const { updateSpotifyAccessToken, updateSpotifyRefreshToken, spotifyAPIKey } =
    useCredentialsPersistantStore((state) => ({
      updateSpotifyAccessToken: state.updateSpotifyAccessToken,
      updateSpotifyRefreshToken: state.updateSpotifyRefreshToken,
      spotifyAPIKey: state.spotifyAPIKey,
    }));

  const {
    updateNotificationMessage,
    updateNotificationTitle,
    updateNotificationRendererKey,
    updateMigrationMethod,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,
    updateMigrationMethod: state.updateMigrationMethod,
  }));

  const { spotifyApiHelper } = useCredentialsStore((state) => ({
    spotifyApiHelper: state.spotifyApiHelper,
  }));

  useEffect(() => {
    async function retrieveTokenAndRedirect() {
      const code = searchParams.get("code");
      const redirectionLink = searchParams.get("redirect_link");

      if (code && spotifyCodeVerifier && redirectionLink) {
        const response = await retrieveTokenWithCode(
          spotifyCodeVerifier,
          code,
          redirectionLink,
          spotifyAPIKey
        );

        updateSpotifyAccessToken(response.access_token);
        updateSpotifyRefreshToken(response.refresh_token);
      }
      if (redirectionLink) {
        updateNotificationRendererKey();
        updateNotificationTitle("Success!");
        updateMigrationMethod(redirectionLink);
        updateNotificationMessage("Logged in to Spotify");
        router.push(`migration-steps?destination=${redirectionLink}`);
      } else {
        router.push("/");
      }
    }

    retrieveTokenAndRedirect();
  }, [
    router,
    searchParams,
    spotifyCodeVerifier,
    spotifyApiHelper,
    updateSpotifyAccessToken,
    updateSpotifyRefreshToken,
    updateNotificationRendererKey,
    updateNotificationTitle,
    updateNotificationMessage,
    updateMigrationMethod,
    spotifyAPIKey,
  ]);

  return (
    <div className="h-full flex flex-col justify-center align-middle">
      <div className="h-min w-max flex flex-col m-auto justify-center">
        <LoadingComponent
          size="small"
          type="apple-to-spotify"
          className="m-auto"
        />
        <h1 className="mt-3">Logged in. Redirecting...</h1>
      </div>
    </div>
  );
}

export default function SpotifyAuthenticationRedirection() {
  return (
    <Suspense
      fallback={<LoadingComponent size="small" type="apple-to-spotify" />}
    >
      <SpotifyAuthRedirection />
    </Suspense>
  );
}
