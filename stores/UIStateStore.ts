import { create } from "zustand";

type UIStateType = {
  errorKey: number;
  updateErrorRendererKey: () => void;
  errorTitle: string;
  updateErrorTitle: (newErrorTitle: string) => void;
  errorMessage: string;
  updateErrorMessage: (newErrorMessage: string) => void;
};

export const useUIStateStore = create<UIStateType>((set) => ({
  errorKey: 0,
  updateErrorRendererKey: () =>
    set((state) => {
      return { errorKey: state.errorKey + 1 };
    }),
  errorTitle: "",
  updateErrorTitle: (newErrorTitle: string) =>
    set({ errorTitle: newErrorTitle }),
  errorMessage: "",
  updateErrorMessage: (newErrorMessage: string) =>
    set({ errorMessage: newErrorMessage }),
}));
