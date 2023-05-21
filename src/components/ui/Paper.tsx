import { styled } from "@mui/material";
import type { PaperProps as MuiPaperProps } from "@mui/material/Paper";
import MuiPaper from "@mui/material/Paper";
import { forwardRef } from "react";

export type PaperProps = MuiPaperProps;

const StyledPaper = styled(MuiPaper)({
  borderRadius: 8,
});

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  { elevation = 3, ...rest },
  ref
) {
  return <StyledPaper elevation={elevation} ref={ref} {...rest} />;
});
