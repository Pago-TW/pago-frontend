import { create } from "zustand";

interface State {
  searchExpand: boolean;
  searchQuery: string;
}

interface Action {
  setSearchExpand: (show: boolean) => void;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
}

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
