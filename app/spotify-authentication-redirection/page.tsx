"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCredentialsPersistantStore,
  useCredentialsStore,
} from "@/stores/credentialsStore";
import retrieveTokenWithCode from "@/app/_utils/spotify-api-wrapper/retrieveTokenWithCode";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function SpotifyAuthenticationRedirection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { spotifyCodeVerifier } = useCredentialsPersistantStore((state) => ({
    spotifyCodeVerifier: state.spotifyCodeVerifier,
  }));

  const { updateSpotifyAccessToken, updateSpotifyRefreshToken } =
    useCredentialsPersistantStore((state) => ({
      updateSpotifyAccessToken: state.updateSpotifyAccessToken,
      updateSpotifyRefreshToken: state.updateSpotifyRefreshToken,
    }));

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

  useEffect(() => {
    async function retrieveTokenAndRedirect() {
      const code = searchParams.get("code");
      const redirectionLink = searchParams.get("redirect_link");

      if (code && spotifyCodeVerifier && redirectionLink) {
        const response = await retrieveTokenWithCode(
          spotifyCodeVerifier,
          code,
          redirectionLink
        );

        updateSpotifyAccessToken(response.access_token);
        updateSpotifyRefreshToken(response.refresh_token);
      }
      if (redirectionLink) {
        updateNotificationRendererKey();
        updateNotificationTitle("Success!");
        updateNotificationMessage("Logged in to Spotify");
        router.push(redirectionLink);
      } else {
        router.push("/");
      }
    }

    retrieveTokenAndRedirect();
    // }
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
  ]);

  return (
    <div>
      <h1>Logged in. Redirecting...</h1>
    </div>
  );
}
