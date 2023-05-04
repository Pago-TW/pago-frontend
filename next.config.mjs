import { withPlaiceholder } from "@plaiceholder/next";

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = withPlaiceholder({
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["zh-TW"],
    defaultLocale: "zh-TW",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pago-file-storage.s3.ap-northeast-1.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  transpilePackages: ["@mui/system", "@mui/material", "@mui/icons-material"],
  modularizeImports: {
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/lab": {
      transform: "@mui/lab/{{member}}",
    },
  },
});

export default config;
