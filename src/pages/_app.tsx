import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { Close } from "@mui/icons-material";
import type { SlideProps } from "@mui/material";
import { CssBaseline, IconButton, Slide } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { theme } from "../styles/theme";
import { createEmotionCache } from "../utils/createEmotionCache";

import "@fontsource/mallanna/400.css";
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";

import "@fontsource/mallanna/400.css";
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps<{ session: Session | null }> {
  emotionCache?: EmotionCache;
}

axios.interceptors.request.use(async (config) => {
  const session = await getSession();

  config.baseURL = env.NEXT_PUBLIC_API_URL;
  if (session) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

const queryClient = new QueryClient();

const PagoApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: MyAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider
              autoHideDuration={5000}
              TransitionComponent={(props: Omit<SlideProps, "direction">) => (
                <Slide direction="right" {...props} />
              )}
              action={(key) => (
                <IconButton onClick={() => closeSnackbar(key)} color="inherit">
                  <Close />
                </IconButton>
              )}
            >
              <CssBaseline />
              <Component {...pageProps} />
            </SnackbarProvider>
          </ThemeProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default PagoApp;

// Client-side cache, shared for the whole session of the user in the browser.
