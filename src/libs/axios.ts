import { env } from "@/env.mjs";
import Axios from "axios";
import { getSession } from "next-auth/react";

export const axios = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});
