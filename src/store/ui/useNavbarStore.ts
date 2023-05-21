import { create } from "zustand";

type State = {
  searchExpand: boolean;
  searchQuery: string;
};

type Action = {
  setSearchExpand: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
};

const initialState: State = {
  searchExpand: false,
  searchQuery: "",
};

export const useNavbarStore = create<State & Action>()((set) => ({
  ...initialState,
  setSearchExpand: (show) => set({ searchExpand: show }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearchQuery: () => set({ searchQuery: "" }),
}));
