import { create } from "zustand";

type State = {
  searchBarExpand: boolean;
  searchQuery: string;
};

type Actions = {
  setSearchBarExpand: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
};

const INITIAL_STATE: State = {
  searchBarExpand: false,
  searchQuery: "",
};

export const useAppbarStore = create<State & Actions>()((set) => ({
  ...INITIAL_STATE,
  setSearchBarExpand: (show) => set({ searchBarExpand: show }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));
