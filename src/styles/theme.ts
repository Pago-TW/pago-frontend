import type { Color } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import type { ColorPartial } from "@mui/material/styles/createPalette";

declare module "@mui/material" {
  interface Color {
    25: string;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    base: Color;
    pago: Color;
  }
  interface PaletteOptions {
    base?: ColorPartial;
    pago?: ColorPartial;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#335891",
    },
    text: {
      primary: "#262626",
    },
    base: {
      900: "#000000",
      800: "#262626",
      700: "#434343",
      600: "#555555",
      500: "#7B7B7B",
      400: "#9D9D9D",
      300: "#C4C4C4",
      200: "#D9D9D9",
      100: "#E9E9E9",
      50: "#F5F5F5",
    },
    pago: {
      900: "#1E3457",
      800: "#233D65",
      700: "#284674",
      600: "#2D4F82",
      500: "#335891",
      400: "#47689C",
      300: "#5B79A7",
      200: "#708AB2",
      100: "#849ABD",
      50: "#99ABC8",
      25: "#C1CCDE",
    },
  },
  typography: {
    fontFamily: [
      '"-apple-system"',
      '"BlinkMacSystemFont"',
      '"Noto Sans TC"',
      '"Helvetica Neue"',
      '"Helvetica"',
      '"Segoe UI"',
      '"sans-serif"',
    ].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
