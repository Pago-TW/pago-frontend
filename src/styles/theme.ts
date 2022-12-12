import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#335891",
    },
  },
  typography: {
    fontFamily: [
      "'-apple-system'",
      "'BlinkMacSystemFont'",
      "'Noto Sans TC'",
      "'Helvetica Neue'",
      "'Helvetica'",
      "'Segoe UI'",
      "'sans-serif'",
    ].join(","),
  },
});

export default theme;
