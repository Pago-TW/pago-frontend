import { env } from "@/env.mjs";
import { axios } from "@/libs/axios";
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
            name: user.fullName,
            email: user.email,
            image: user.avatarUrl,
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
        user.name = pagoUser.fullName;
        user.image = pagoUser.avatarUrl;
        user.email = pagoUser.email;

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
        token.name = user.name;
        token.picture = user.image;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.email = token.email;
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
