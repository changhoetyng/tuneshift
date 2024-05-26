import { create } from "zustand";

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

  canMigrate: false,
  updateCanMigrate: (canShow: boolean) =>
    set({
      canMigrate: canShow,
    }),
}));
