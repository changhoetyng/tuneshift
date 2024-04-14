"use client";
import { useState } from "react";
import RountedButton from "@/app/_ui/buttons/RoundedButton";
import {
  useCredentialsStore,
  useCredentialsPersistantStore,
} from "@/stores/credentialsStore";
import MusicKitInitializer from "@/app/_utils/apple-music-api-wrapper/MusicKitInitializer";
import { generateRandomString } from "@/app/_utils/global-utils/generateRandomString";
import { sha256 } from "@/app/_utils/global-utils/generateSHA256";
import { base64encode } from "@/app/_utils/global-utils/base64encode";
import axios from "axios";

export default function MigrateToAppleMusic() {
  const [key, setKey] = useState(2);
  const { musicKitInstance } = useCredentialsStore((state) => ({
    musicKitInstance: state.musicKitInstance,
  }));

  const { updateSpotifyCodeVerifier } = useCredentialsPersistantStore(
    (state) => ({
      updateSpotifyCodeVerifier: state.updateSpotifyCodeVerifier,
    })
  );

  const { spotifyApiHelper } = useCredentialsStore((state) => ({
    spotifyApiHelper: state.spotifyApiHelper,
  }));

  async function fetchData() {
    if (musicKitInstance) {
      musicKitInstance.authorize();
    } else {
      setKey((prevKey) => prevKey + 1);
      if (musicKitInstance) {
        musicKitInstance.authorize();
      }
    }

    console.log(musicKitInstance.isAuthorized);
  }

  async function retrieveToken() {
    spotifyApiHelper.retrieveToken();
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
      <RountedButton className="mt-10" onClick={fetchData}>
        Log in to Apple Music
      </RountedButton>
      <RountedButton className="mt-10" onClick={getLibrary}>
        Test Apple Music API
      </RountedButton>
      <RountedButton className="mt-10" onClick={spotifyAuthenticator}>
        Test Spotify Authenticator
      </RountedButton>
      <RountedButton className="mt-10" onClick={retrieveToken}>
        Test Spotify Authenticator
      </RountedButton>
    </div>
  );
}
