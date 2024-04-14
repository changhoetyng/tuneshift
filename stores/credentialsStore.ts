import { create } from "zustand";

type CredentialsStore = {
  musicKitInstance: any;
  spotifyUserToken: string | null;
  updateMusicKitInstance: (newMusicKitInstance: any) => void;
  updateSpotifyUserToken: (spotifyUserToken: string) => void;
};

const useStore = create<CredentialsStore>((set) => ({
  musicKitInstance: null,
  updateMusicKitInstance: (newMusicKitInstance: any) =>
    set({ musicKitInstance: newMusicKitInstance }),

  spotifyUserToken: null,
  updateSpotifyUserToken: (spotifyUserToken: string) =>
    set({ spotifyUserToken: spotifyUserToken }),
}));

export default useStore;
