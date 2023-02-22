import MuiDivider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.base[400],
  borderColor: theme.palette.base[400],
}));

export const Divider = StyledDivider;
