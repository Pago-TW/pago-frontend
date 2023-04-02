import { create } from "zustand";

type appbarState = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export const useAppbarStore = create<appbarState>()((set) => ({
  drawerOpen: false,
  setDrawerOpen: (open) => set({ drawerOpen: open }),
}));
