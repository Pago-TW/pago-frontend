import { Divider as MuiDivider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.base[400],
  borderColor: theme.palette.base[400],
}));

export const Divider = StyledDivider;
