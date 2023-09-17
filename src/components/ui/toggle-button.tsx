import { ToggleButton as MuiToggleButton, styled } from "@mui/material";

export const ToggleButton = styled(MuiToggleButton)(({ theme, size }) => ({
  ...(size === "small" && {
    padding: theme.spacing("6px", "16px"),
    fontSize: theme.typography.pxToRem(14),
    lineHeight: 1.5,
  }),
}));
