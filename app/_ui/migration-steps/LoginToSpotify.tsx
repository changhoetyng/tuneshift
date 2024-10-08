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
    spotifyAPIKey,
  } = useCredentialsPersistantStore((state) => ({
    updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    updateSpotifyAccessToken: state.updateSpotifyAccessToken,
    updateSpotifyRefreshToken: state.updateSpotifyRefreshToken,
    spotifyAccessToken: state.spotifyAccessToken,
    spotifyAPIKey: state.spotifyAPIKey,
  }));

  const {
    updateNotificationMessage,
    updateNotificationTitle,
    updateNotificationRendererKey,
    migrationMethod,
  } = useUIStateStore((state) => ({
    updateNotificationMessage: state.updateNotificationMessage,
    updateNotificationTitle: state.updateNotificationTitle,
    updateNotificationRendererKey: state.updateNotificationRendererKey,
    migrationMethod: state.migrationMethod,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function spotifyAuthenticator() {
    try {
      const clientId = `${spotifyAPIKey}`;
      const redirectUri = `${process.env.NEXT_PUBLIC_APP_CURRENT_URL}/spotify-authentication-redirection?redirect_link=${migrationMethod}`;

      const codeVerifier = generateRandomString(64);
      const hashed = await sha256(codeVerifier);
      const codeChallenge = base64encode(hashed);
      updateSpotifyCodeVerifier(codeVerifier);

      const scope =
        "user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public";
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
    updateSpotifyAccessToken(null);
    updateSpotifyRefreshToken(null);

    updateNotificationRendererKey();
    updateNotificationTitle("Success!");
    updateNotificationMessage("Logged out from Spotify");
  }

  return (
    <div className="w-full">
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
