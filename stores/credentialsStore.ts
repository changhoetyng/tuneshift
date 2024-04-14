import { create } from "zustand";

type CredentialsStore = {
  musicKitInstance: any;
  updateMusicKitInstance: (newMusicKitInstance: any) => void;
};

const useStore = create<CredentialsStore>((set) => ({
  musicKitInstance: null,
  updateMusicKitInstance: (newMusicKitInstance: any) =>
    set({ musicKitInstance: newMusicKitInstance }),
}));

export default useStore;
