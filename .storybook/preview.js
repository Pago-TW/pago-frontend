import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import * as NextImage from "next/image";
import { theme } from "../src/styles/theme";

import "@fontsource/mallanna/400.css";
import "@fontsource/noto-sans-tc/300.css";
import "@fontsource/noto-sans-tc/400.css";
import "@fontsource/noto-sans-tc/700.css";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: {
      PC: {
        name: "PC",
        styles: {
          width: "1920px",
          height: "1080px",
        },
      },
      iPhone13Pro: {
        name: "iPhone 13 Pro",
        styles: {
          width: "390px",
          height: "844px",
        },
      },
      ...INITIAL_VIEWPORTS,
    },
  },
};

export const decorators = [
  (Story, ctx) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story {...ctx} />
    </ThemeProvider>
  ),
];
