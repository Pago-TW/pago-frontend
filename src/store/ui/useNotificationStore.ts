import { create } from "zustand";

type State = {
  open: boolean;
  notificationId: string;
};

type Action = {
  setOpen: (open: boolean) => void;
  setNotificationId: (notificationId: string) => void;
  clearNotificationId: () => void;
};

const initialState: State = {
  open: false,
  notificationId: "",
};

export const useNotificationStore = create<State & Action>((set) => ({
  ...initialState,
  setOpen: (open) => set({ open }),
  setNotificationId: (notificationId) => set({ notificationId }),
  clearNotificationId: () => set({ notificationId: "" }),
}));
