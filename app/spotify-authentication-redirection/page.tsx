"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCredentialsPersistantStore,
  useCredentialsStore,
} from "@/stores/credentialsStore";
import retrieveTokenWithCode from "@/app/_utils/spotify-api-wrapper/retrieveTokenWithCode";

export default function SpotifyAuthenticationRedirection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { spotifyCodeVerifier } = useCredentialsPersistantStore((state) => ({
    spotifyCodeVerifier: state.spotifyCodeVerifier,
  }));

  const { updateSpotifyCodeVerifier } = useCredentialsPersistantStore(
    (state) => ({
      updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    })
  );

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

        console.log(response);
        updateSpotifyCodeVerifier(null);
      }
      if (redirectionLink) {
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
    updateSpotifyCodeVerifier,
  ]);

  return (
    <div>
      <h1>Logged in. Redirecting...</h1>
    </div>
  );
}
