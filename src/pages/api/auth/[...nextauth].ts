import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { env } from "@/env.mjs";
import { axios } from "@/libs/axios";

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
            accessToken: token.accessToken,
            id: user.userId,
            name: user.fullName,
            image: user.avatarUrl,
            email: user.email,
            phone: user.phone,
            verified: user.isPhoneVerified,
            provider: user.provider,
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
        user.phone = pagoUser.phone;
        user.verified = pagoUser.isPhoneVerified;
        user.provider = pagoUser.provider;

        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    jwt: async ({ token, user, trigger }) => {
      if (trigger === "update") {
        const res = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });
        const data = res.data;

        token.name = data.fullName;
        token.phone = data.phone;
        token.picture = data.avatarUrl;
        token.verified = data.isPhoneVerified;
        token.provider = data.provider;
      }

      if (user) {
        token.accessToken = user.accessToken;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.picture = user.image;
        token.verified = user.verified;
        token.provider = user.provider;
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
        session.user.phone = token.phone;
        session.user.verified = token.verified;
        session.user.provider = token.provider;
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
