import { CloseSnackbarButton } from "@/components/CloseSnackbarButton";
import { NotistackSnackbar } from "@/components/NotistackSnackbar";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { env } from "@/env.mjs";
import type { EmotionCache } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SnackbarProvider } from "notistack";
import { theme } from "../styles/theme";
import { createEmotionCache } from "../utils/createEmotionCache";

import "@fontsource/mallanna/400.css";
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";

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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
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
