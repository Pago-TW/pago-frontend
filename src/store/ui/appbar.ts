import { create } from "zustand";

type appbarState = {
  searchBarExpand: boolean;
  setSearchBarExpand: (show: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
};

export const useAppbarStore = create<appbarState>()((set) => ({
  searchBarExpand: false,
  setSearchBarExpand: (show) => set({ searchBarExpand: show }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));
