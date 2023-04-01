import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import axios from "axios";
import type { AppProps } from "next/app";
import Head from "next/head";
import { env } from "src/env/client.mjs";
import { theme } from "../styles/theme";
import { createEmotionCache } from "../utils/createEmotionCache";

import "@fontsource/mallanna/400.css";
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

axios.defaults.baseURL = env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["x-api-key"] =
  "PMAK-63f4e547712d8c7e0362b651-f1c18c70bdeb86ec0fdc061b5c8f8bc754";

const queryClient = new QueryClient();

const MyApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </CacheProvider>
  );
};

export default MyApp;
