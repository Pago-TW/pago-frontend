import { env } from "@/env/server.mjs";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await axios.post("/auth/login", credentials);

        const { token, user } = res.data;

        if (token && user) {
          return {
            id: user.userId,
            accessToken: token.accessToken,
          };
        }
        return null;
      },
    }),
  ],
  // Include user.id on session
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const res = await axios.post("/oauth2/google-login", {
          idToken: account.id_token,
        });

        const { token, user: pagoUser } = res.data;
        user.accessToken = token.accessToken;
        user.id = pagoUser.userId;

        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
};

export default NextAuth(authOptions);
