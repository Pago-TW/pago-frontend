import { ToggleButton as MuiToggleButton, styled } from "@mui/material";

export const ToggleButton = styled(MuiToggleButton)(
  ({ theme, size, color }) => ({
    ...(size === "small" && {
      padding: theme.spacing("6px", "16px"),
      fontSize: theme.typography.pxToRem(14),
      lineHeight: 1.5,
    }),
    ...(color === "pago" && {
      borderColor: theme.palette.pago.main,
      color: theme.palette.pago.main,
    }),
  })
);
