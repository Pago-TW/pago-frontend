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
    button: {
      textTransform: "none",
    },
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
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.size === "small" && {
            minWidth: 128,
            height: 33,
            fontSize: 14,
          }),
          ...(ownerState.size === "medium" && {
            minWidth: 144,
            height: 39,
            fontSize: 18,
          }),
          ...(ownerState.size === "large" && {
            minWidth: 304,
            height: 46,
            fontSize: 20,
          }),
        }),
      },
    },
  },
});

export default theme;
