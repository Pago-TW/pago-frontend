import axios from "axios";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { SignInFormValues } from "./../pages/auth/signin";

type Token = {
  accessToken: string;
  tokenType: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type State = {
  authenticated: boolean;
  accessToken?: string;
  user?: User;
};

type Actions = {
  setAccessToken: (token: string) => void;
  setUser: (user: User) => void;
  signIn: (
    data: SignInFormValues
  ) => Promise<{ error?: string; status?: number; ok: boolean }>;
  signOut: () => void;
};

const initialState: State = {
  authenticated: false,
  accessToken: undefined,
  user: undefined,
};

export const useAuthStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        setAccessToken: (accessToken) => set({ accessToken }),
        setUser: (user) => set({ user }),
        signIn: async (data) => {
          try {
            const res = await axios.post<{
              token: Token;
              user: User;
            }>("http://localhost:8080/api/v1/auth/login", data);
            const { token, user } = res.data;

            set({
              authenticated: true,
              accessToken: [token.tokenType, token.accessToken].join(" "),
              user,
            });

            return {
              error: undefined,
              status: res.status,
              ok: true,
            };
          } catch (e) {
            console.log(e);
            if (axios.isAxiosError(e)) {
              return {
                error: e.message,
                status: e.response?.status,
                ok: false,
              };
            }
            if (e instanceof Error) {
              return {
                error: e.message,
                ok: false,
              };
            }
            return {
              error: "Unknown Error",
              ok: false,
            };
          }
        },
        signOut: () => set(initialState),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);
