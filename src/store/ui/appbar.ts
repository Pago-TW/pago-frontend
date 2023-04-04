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

const initialState: State = {
  searchBarExpand: false,
  searchQuery: "",
};

export const useAppbarStore = create<State & Actions>()((set) => ({
  ...initialState,
  setSearchBarExpand: (show) => set({ searchBarExpand: show }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));
