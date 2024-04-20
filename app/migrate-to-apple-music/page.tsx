"use client";
import { use, useEffect, useState } from "react";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import {
  useCredentialsStore,
  useCredentialsPersistantStore,
} from "@/stores/credentialsStore";
import MusicKitInitializer from "@/app/_utils/apple-music-api-wrapper/MusicKitInitializer";
import { generateRandomString } from "@/app/_utils/global-utils/generateRandomString";
import { sha256 } from "@/app/_utils/global-utils/generateSHA256";
import { base64encode } from "@/app/_utils/global-utils/base64encode";
import RoundedBorderCard from "@/app/_ui/card/RoundedBorderCard";
import SessionRectangleCard from "@/app/_ui/card/SessionRectangleCard";
import { useUIStateStore } from "@/stores/UIStateStore";

// import { Store } from "react-notifications-component";
export default function MigrateToAppleMusic() {
  const [key, setKey] = useState(2);
  const [showKey, setShowKey] = useState(0);
  const { musicKitInstance } = useCredentialsStore((state) => ({
    musicKitInstance: state.musicKitInstance,
  }));
  const [isAppleMusicLoggedIn, setIsAppleMusicLoggedIn] = useState(false);
  const { updateErrorMessage, updateErrorTitle, updateErrorRendererKey } =
    useUIStateStore((state) => ({
      updateErrorMessage: state.updateErrorMessage,
      updateErrorTitle: state.updateErrorTitle,
      updateErrorRendererKey: state.updateErrorRendererKey,
    }));

  useEffect(() => {
    setIsAppleMusicLoggedIn(musicKitInstance?.isAuthorized);
  }, [musicKitInstance]);

  const { updateSpotifyCodeVerifier } = useCredentialsPersistantStore(
    (state) => ({
      updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    })
  );

  const { spotifyApiHelper } = useCredentialsStore((state) => ({
    spotifyApiHelper: state.spotifyApiHelper,
  }));

  async function loginToAppleMusic() {
    console.log("LOGGING IN TO APPLE MUSIC");
    if (musicKitInstance) {
      await musicKitInstance.authorize().catch(() => {
        updateErrorRendererKey();
        updateErrorTitle("Error");
        updateErrorMessage("Error logging in to Apple Music");
      });
    } else {
      setKey((prevKey) => prevKey + 1);
      if (musicKitInstance) {
        await musicKitInstance.authorize().catch(() => {
          console.log("LOGGED IN DONE TO APPLE MUSIC");
        });
      }
    }
    setIsAppleMusicLoggedIn(musicKitInstance?.isAuthorized);
    console.log("LOGGED IN SUCCESS TO APPLE MUSIC");
    console.log(musicKitInstance.isAuthorized);
  }

  async function logoutFromAppleMusic() {
    console.log("Logging out from Apple Music");
    if (musicKitInstance) {
      await musicKitInstance.unauthorize();
      setIsAppleMusicLoggedIn(musicKitInstance?.isAuthorized);
      console.log(musicKitInstance.isAuthorized);
    }
  }

  async function retrieveToken() {
    spotifyApiHelper.getPlaylistSongs(10, 0);
  }
  async function spotifyAuthenticator() {
    const clientId = `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}`;
    const redirectUri = `${process.env.NEXT_PUBLIC_APP_CURRENT_URL}/spotify-authentication-redirection?redirect_link=/migrate-to-apple-music`;

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
  }

  async function getLibrary() {
    console.log(musicKitInstance.isAuthorized);
    if (musicKitInstance && musicKitInstance.isAuthorized) {
      const library = await musicKitInstance.api.music(
        "v1/me/library/playlists"
      );
      console.log("Library", library);
    }
  }

  return (
    <div>
      <MusicKitInitializer key={key} />
      <div className="flex flex-row w-full justify-between">
        <SessionRectangleCard
          musicStreamingServiceName="Apple Music"
          isLoggedIn={isAppleMusicLoggedIn}
          onLogout={logoutFromAppleMusic}
          onLogin={loginToAppleMusic}
        />
      </div>

      <div className="border-2 border-fuchsia-500 rounded-lg">
        <RoundedBorderCard className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center self-center mt-16">
            <RountedButton className="w-24">Migrate</RountedButton>
          </div>
        </RoundedBorderCard>
      </div>
    </div>
  );
}
