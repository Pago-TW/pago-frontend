import { createTheme } from "@mui/material/styles";

import { inter, notoSansTC } from "@/styles/fonts";

export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "html, body": {
          minHeight: "100vh",
        },
        "div#__next": {
          minHeight: "100vh",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
  },
  palette: {
    background: {
      default: "#F5F5F5",
      paper: "#FFFEFC",
    },
    text: {
      primary: "#262626",
    },
    primary: {
      main: "#335891",
    },
    base: {
      main: "#9D9D9D",
      dark: "#6D6D6D",
      light: "#B0B0B0",
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
      main: "#335891",
      dark: "#002F63",
      light: "#6584C2",
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
    pagoGreen: {
      dark: "#008623",
      main: "#28B751",
      light: "#67EA80",
      900: "#00511D",
      800: "#008430",
      700: "#0D953B",
      600: "#1EA747",
      500: "#28B751",
      400: "#51C26B",
      300: "#73CD86",
      200: "#9DDBA9",
      100: "#B6FFC9",
    },
    pagoYellow: {
      dark: "#C78F00",
      main: "#FFBF00",
      light: "#FFF14E",
      900: "#CC7000",
      800: "#FF8D00",
      700: "#FF9E00",
      600: "#FFB100",
      500: "#FFBF00",
      400: "#FFC825",
      300: "#FFD44D",
      200: "#FFDF81",
      100: "#FFE781",
    },
    pagoRed: {
      dark: "#BE000F",
      main: "#EB3737",
      light: "#FF6F62",
      900: "#BD161D",
      800: "#CC2429",
      700: "#D92C30",
      600: "#EB3737",
      500: "#F94037",
      400: "#F45252",
      300: "#E97375",
      200: "#FF7D7D",
      100: "#FF857D",
    },
    secondary: {
      main: "#DD9881",
      dark: "#A96A54",
      light: "#FFC9B1",
    },
    success: {
      main: "#28B751",
      dark: "#008623",
      light: "#67EA80",
    },
    warning: {
      main: "#FFBF00",
      dark: "#C78F00",
      light: "#FFF14E",
    },
    error: {
      main: "#EB3737",
      dark: "#BE000F",
      light: "#FF6F62",
    },
  },
  typography: {
    fontFamily: [inter.style.fontFamily, notoSansTC.style.fontFamily].join(","),
    button: {
      textTransform: "none",
    },
  },
});

export type Theme = typeof theme;

export default theme;
