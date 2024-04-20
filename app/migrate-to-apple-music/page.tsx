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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// import { Store } from "react-notifications-component";
export default function MigrateToAppleMusic() {
  const [key, setKey] = useState(2);
  const [showKey, setShowKey] = useState(false);
  const { musicKitInstance } = useCredentialsStore((state) => ({
    musicKitInstance: state.musicKitInstance,
  }));
  const [isAppleMusicLoggedIn, setIsAppleMusicLoggedIn] = useState(false);

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
        setShowKey(true);
        console.log("siu");
        // Store.addNotification({
        //   title: "Wonderful!",
        //   message: "teodosii@react-notifications-component",
        //   type: "danger",
        //   insert: "top",
        //   container: "top-right",
        //   animationIn: ["animate__animated", "animate__fadeIn"],
        //   animationOut: ["animate__animated", "animate__fadeOut"],
        //   dismiss: {
        //     duration: 5000,
        //     onScreen: true,
        //   },
        // });
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
      <Alert className="absolute z-30 bg-background bg-zinc-900 top-22 right-10 w-64">
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
      <div className="flex flex-row w-full justify-between">
        {/* <RountedButton className="mt-10" onClick={fetchData}>
          Log in to Apple Music
        </RountedButton>

        <RountedButton className="mt-10" onClick={spotifyAuthenticator}>
          Log in to Spotify
        </RountedButton> */}

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
