import { Divider as MuiDivider, styled } from "@mui/material";

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.base[400],
  borderColor: theme.palette.base[400],
}));

export const Divider = StyledDivider;
