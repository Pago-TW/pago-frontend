import { styled } from "@mui/material";

const IsDefaultBadgeRoot = styled("span")(({ theme }) => ({
  backgroundColor: theme.palette.pago[25],
  color: theme.palette.pago.dark,
  borderRadius: 4,
  minWidth: 32,
  height: 20,
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: theme.typography.pxToRem(12),
}));

export const IsDefaultBadge = () => {
  return <IsDefaultBadgeRoot>預設</IsDefaultBadgeRoot>;
};
