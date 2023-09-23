import type { DefaultSession } from "next-auth";

import "next-auth/jwt";

type Provider = "LOCAL" | "GOOGLE";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      phone?: string | null;
      verified: boolean;
      provider: Provider;
    } & DefaultSession["user"];
    accessToken: string;
  }
  interface User {
    id: string;
    phone?: string | null;
    verified: boolean;
    provider: Provider;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone?: string | null;
    verified: boolean;
    provider: Provider;
    accessToken: string;
  }
}
