"use client";
import Head from "next/head";
import { useEffect } from "react";

import { authentication } from "../_lib/apple-music-api-wrapper/authentication";

export default function SpotifyToAppleMusicPage() {
  useEffect(() => {
    // console.log("RUN");
    // async function fetchData() {
    //   const musicKitInstance = await authentication();
    //   // musicKitInstance.authorize();
    // }
    // fetchData();
  }, []);

  return (
    <div>
      {/* <script
        src="https://js-cdn.music.apple.com/musickit/v3/musickit.js"
        data-web-components
        async
      ></script> */}
      <h1>Spotify To Apple Music</h1>
    </div>
  );
}
