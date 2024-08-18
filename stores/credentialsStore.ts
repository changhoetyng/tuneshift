import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import SpotifyApiHelper from "@/app/_utils/spotify-api-wrapper/SpotifyApiHelper";
import AppleMusicApiHelper from "@/app/_utils/apple-music-api-wrapper/AppleMusicApiHelper";

type CredentialsStore = {
  musicKitInstance: any;
  updateMusicKitInstance: (newMusicKitInstance: any) => void;
  updateIsMusicKitAuthorized: (isMusicKitAuthorized: any) => void;
  isMusicKitInstanceAuthorized: boolean;
  spotifyApiHelper: SpotifyApiHelper;
  appleMusicHelper: AppleMusicApiHelper;
};

type CredentialsPersistentStore = {
  spotifyCodeVerifier: string | null;
  spotifyAuthorizationCode: string | null;
  spotifyAccessToken: string | null;
  spotifyRefreshToken: string | null;
  updateSpotifyCodeVerifier: (spotifyCodeVerifier: string | null) => void;
  updateSpotifyAccessToken: (spotifyAuthorizationCode: string | null) => void;
  updateSpotifyRefreshToken: (spotifyCode: string | null) => void;

  // Spotify API Key
  spotifyAPIKey: string;
  setSpotifyAPIKey: (newKey: string) => void;
};

export const useCredentialsStore = create<CredentialsStore>((set) => ({
  musicKitInstance: null,
  isMusicKitInstanceAuthorized: false,
  updateMusicKitInstance: (newMusicKitInstance: any) =>
    set({ musicKitInstance: newMusicKitInstance }),

  updateIsMusicKitAuthorized: (isMusicKitAuthorized: boolean) =>
    set({ isMusicKitInstanceAuthorized: isMusicKitAuthorized }),

  spotifyApiHelper: new SpotifyApiHelper(),
  appleMusicHelper: new AppleMusicApiHelper(),
}));

export const useCredentialsPersistantStore = create(
  persist<CredentialsPersistentStore>(
    (set) => ({
      spotifyAuthorizationCode: null,
      updateSpotifyAuthorizationCode: (spotifyAuthorizationCode: string) =>
        set({ spotifyAuthorizationCode: spotifyAuthorizationCode }),

      spotifyCodeVerifier: null,
      updateSpotifyCodeVerifier: (spotifyCodeVerifier: string | null) =>
        set({ spotifyCodeVerifier: spotifyCodeVerifier }),

      spotifyAccessToken: null,
      updateSpotifyAccessToken: (spotifyAccessToken: string | null) =>
        set({ spotifyAccessToken: spotifyAccessToken }),

      spotifyRefreshToken: null,
      updateSpotifyRefreshToken: (spotifyRefreshToken: string | null) =>
        set({ spotifyRefreshToken: spotifyRefreshToken }),

      // Spotify API Key
      spotifyAPIKey: "",
      setSpotifyAPIKey: (newKey: string) => set({ spotifyAPIKey: newKey }),
    }),
    {
      name: "credentials-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
