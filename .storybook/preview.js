import { ThemeProvider } from "@mui/material";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import * as NextImage from "next/image";
import { theme } from "../src/styles/theme";

import "@fontsource/noto-sans-tc";
import "../src/styles/globals.css";

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
  (story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>,
];
