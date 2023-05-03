import { create } from "zustand";

type State = {
  open: boolean;
  chatWith: string;
};

type Action = {
  setOpen: (open: boolean) => void;
  setChatWith: (chatWith: string) => void;
  clearChatWith: () => void;
};

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
