import type { AppProps } from "next/app";
import Head from "next/head";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import { CloseSnackbarButton } from "@/components/close-snackbar-button";
import { NotistackSnackbar } from "@/components/notistack-snackbar";
import { WebSocketProvider } from "@/contexts/web-socket-context";
import { env } from "@/env.mjs";
import { theme } from "@/styles/theme";
import { createEmotionCache } from "@/utils/mui";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface PagoAppProps extends AppProps<{ session: Session | null }> {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

const PagoApp = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps: { session, ...pageProps },
}: PagoAppProps) => {
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <WebSocketProvider websocketUrl={`${env.NEXT_PUBLIC_API_URL}/ws`}>
            <ThemeProvider theme={theme}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="zh-tw"
              >
                <SnackbarProvider
                  Components={{
                    default: NotistackSnackbar,
                    success: NotistackSnackbar,
                    error: NotistackSnackbar,
                    warning: NotistackSnackbar,
                    info: NotistackSnackbar,
                  }}
                  anchorOrigin={{ horizontal: "center", vertical: "top" }}
                  action={(key) => <CloseSnackbarButton snackbarKey={key} />}
                >
                  <CssBaseline />
                  <Component {...pageProps} />
                </SnackbarProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </WebSocketProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default PagoApp;
