"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import credentialsStore from "@/stores/credentialsStore";

export default function SpotifyAuthenticationRedirection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { updateMusicKitInstance } = credentialsStore((state) => ({
    updateMusicKitInstance: state.updateMusicKitInstance,
  }));

  useEffect(() => {
    const code = searchParams.get("code");
    const redirectionLink = searchParams.get("redirect_link");

    if (code) {
      updateMusicKitInstance(code);
    }

    if (redirectionLink) {
      router.push(redirectionLink);
    } else {
      router.push("/");
    }

    // }
  }, [router, searchParams, updateMusicKitInstance]);

  return (
    <div>
      <h1>Logged in. Redirecting...</h1>
    </div>
  );
}
