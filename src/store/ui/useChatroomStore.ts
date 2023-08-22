import { create } from "zustand";

interface State {
  open: boolean;
  chatWith: string;
}

interface Action {
  setOpen: (open: boolean) => void;
  setChatWith: (chatWith: string) => void;
  clearChatWith: () => void;
}

const initialState: State = {
  open: false,
  chatWith: "",
};

export const useChatroomStore = create<State & Action>()((set) => ({
  ...initialState,
  setOpen: (open) => set({ open }),
  setChatWith: (chatWith) => set({ chatWith }),
  clearChatWith: () => set({ chatWith: "" }),
}));
