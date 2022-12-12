import { ThemeProvider } from "@mui/material";
import { addDecorator } from "@storybook/react";
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
};

addDecorator((story) => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);
