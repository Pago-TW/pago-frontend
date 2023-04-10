import { Divider as MuiDivider } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  color: theme.palette.base.main,
  borderColor: theme.palette.base.main,
}));

export const Divider = StyledDivider;
