import bundleAnalyzer from "@next/bundle-analyzer";
import { withPlaiceholder } from "@plaiceholder/next";
import million from "million/compiler";

import "./src/env.mjs";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = withBundleAnalyzer(
  withPlaiceholder({
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
      "@mui/material": {
        transform: "@mui/material/{{member}}",
      },
      "@mui/icons-material": {
        transform: "@mui/icons-material/{{member}}",
      },
      "@mui/lab": {
        transform: "@mui/lab/{{member}}",
      },
    },
  })
);

const millionConfig = {
  auto: true,
};

// @ts-expect-error Test
export default million.next(nextConfig, millionConfig);
