import { create } from "zustand";
import { UserPlaylist } from "@/types/playlists";

type UIStateType = {
  notificationKey: number;
  updateNotificationRendererKey: () => void;
  notificationTitle: string;
  updateNotificationTitle: (newNotificationTitle: string) => void;
  notificationMessage: string;
  updateNotificationMessage: (newNotificationMessage: string) => void;

  // Migrate Context
  canMigrate: boolean;
  updateCanMigrate: (canShow: boolean) => void;
  selectedPlaylists: UserPlaylist[];
  updateSelectedPlaylists: (newState: UserPlaylist[]) => void;
  migrationMethod: string | null;
  updateMigrationMethod: (newMethod: string | null) => void;
};

export const useUIStateStore = create<UIStateType>((set) => ({
  notificationKey: 0,
  updateNotificationRendererKey: () =>
    set((state) => {
      return { notificationKey: state.notificationKey + 1 };
    }),
  notificationTitle: "",
  updateNotificationTitle: (newNotificationTitle: string) =>
    set({ notificationTitle: newNotificationTitle }),
  notificationMessage: "",
  updateNotificationMessage: (newNotificationMessage: string) =>
    set({ notificationMessage: newNotificationMessage }),

  // Migrate Context
  canMigrate: false,
  updateCanMigrate: (canShow: boolean) =>
    set({
      canMigrate: canShow,
    }),
  selectedPlaylists: [],
  updateSelectedPlaylists: (newState: UserPlaylist[]) =>
    set({
      selectedPlaylists: newState,
    }),
  migrationMethod: null,
  updateMigrationMethod: (newMethod: string | null) =>
    set({
      migrationMethod: newMethod,
    }),
}));
