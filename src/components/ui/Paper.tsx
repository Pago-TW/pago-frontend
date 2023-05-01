import { styled } from "@mui/material";
import type { PaperProps as MuiPaperProps } from "@mui/material/Paper";
import MuiPaper from "@mui/material/Paper";
import type { FC } from "react";

export type PaperProps = MuiPaperProps;

const StyledPaper = styled(MuiPaper)({
  borderRadius: 8,
});

export const Paper: FC<PaperProps> = ({ elevation = 3, ...rest }) => {
  return <StyledPaper elevation={elevation} {...rest} />;
};
