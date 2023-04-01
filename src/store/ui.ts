import { create } from "zustand";

interface UiState {
  appbarOpen: boolean;
  setAppbarOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>()((set) => ({
  appbarOpen: false,
  setAppbarOpen: (open) => set({ appbarOpen: open }),
}));
