import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import SpotifyApiHelper from "@/app/_utils/spotify-api-wrapper/SpotifyApiHelper";

type CredentialsStore = {
  musicKitInstance: any;
  updateMusicKitInstance: (newMusicKitInstance: any) => void;
  updateIsMusicKitAuthorized: (isMusicKitAuthorized: any) => void;
  isMusicKitInstanceAuthorized: boolean;
  spotifyApiHelper: SpotifyApiHelper;
};

type CredentialsPersistentStore = {
  spotifyCodeVerifier: string | null;
  spotifyAuthorizationCode: string | null;
  spotifyAccessToken: string | null;
  spotifyRefreshToken: string | null;
  updateSpotifyCodeVerifier: (spotifyCodeVerifier: string | null) => void;
  updateSpotifyAccessToken: (spotifyAuthorizationCode: string | null) => void;
  updateSpotifyRefreshToken: (spotifyCode: string | null) => void;
};

export const useCredentialsStore = create<CredentialsStore>((set) => ({
  musicKitInstance: null,
  isMusicKitInstanceAuthorized: false,
  updateMusicKitInstance: (newMusicKitInstance: any) =>
    set({ musicKitInstance: newMusicKitInstance }),

  updateIsMusicKitAuthorized: (isMusicKitAuthorized: boolean) =>
    set({ isMusicKitInstanceAuthorized: isMusicKitAuthorized }),

  spotifyApiHelper: new SpotifyApiHelper(),
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
    }),
    {
      name: "credentials-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
