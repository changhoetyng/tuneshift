import LongRoundedButton from "@/app/_ui/buttons/LongRoundedButton";
import {
  useCredentialsStore,
  useCredentialsPersistantStore,
} from "@/stores/credentialsStore";
import { generateRandomString } from "@/app/_utils/global-utils/generateRandomString";
import { sha256 } from "@/app/_utils/global-utils/generateSHA256";
import { base64encode } from "@/app/_utils/global-utils/base64encode";
import { useEffect } from "react";
import { useUIStateStore } from "@/stores/UIStateStore";

export default function LoginToSpotify({ disabled }: { disabled?: boolean }) {
  const {
    spotifyAccessToken,
    updateSpotifyCodeVerifier,
    updateSpotifyAccessToken,
    updateSpotifyRefreshToken,
  } = useCredentialsPersistantStore((state) => ({
    updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    updateSpotifyAccessToken: state.updateSpotifyAccessToken,
    updateSpotifyRefreshToken: state.updateSpotifyRefreshToken,
    spotifyAccessToken: state.spotifyAccessToken,
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
    async function fetchData() {
      if (spotifyAccessToken) {
        await spotifyApiHelper.getProfile().catch();
      }
    }
    fetchData();
  });

  async function spotifyAuthenticator() {
    try {
      const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_CURRENT_URL}/spotify-authentication-redirection?redirect_link=/spotify-to-apple-music`;

      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
      updateSpotifyCodeVerifier(codeVerifier);

      const scope = "user-read-private user-read-email";
      const authUrl = new URL("https://accounts.spotify.com/authorize");

      const params = {
        response_type: "code",
        client_id: clientId,
        scope,
        code_challenge_method: "S256",
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
      };

      authUrl.search = new URLSearchParams(params).toString();
      window.location.href = authUrl.toString();
    } catch (error) {
      updateNotificationRendererKey();
      updateNotificationTitle("Error!");
      updateNotificationMessage("Error logging in to Spotify");
    }
  }

  async function logoutFromSpotify() {
    console.log("Logging out from Spotify");

    updateSpotifyAccessToken(null);
    updateSpotifyRefreshToken(null);

    updateNotificationRendererKey();
    updateNotificationTitle("Success!");
    updateNotificationMessage("Logged out from Spotify");
  }

  return (
    <div>
      {spotifyAccessToken && (
        <LongRoundedButton onClick={logoutFromSpotify} disabled={disabled}>
          Logged In to Spotify
        </LongRoundedButton>
      )}
      {!spotifyAccessToken && (
        <LongRoundedButton onClick={spotifyAuthenticator} disabled={disabled}>
          Log In to Spotify
        </LongRoundedButton>
      )}
    </div>
  );
}
