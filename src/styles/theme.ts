import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Checkbox" {
  interface CheckboxPropsSizeOverrides {
    large: true;
  }
}

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
  components: {
    MuiCheckbox: {
      variants: [
        {
          props: { size: "large" },
          style: { "& .MuiSvgIcon-root": { fontSize: 28 } },
        },
      ],
    },
  },
});

export default theme;
