import { forwardRef } from "react";

import {
  Paper as MuiPaper,
  styled,
  type PaperProps as MuiPaperProps,
} from "@mui/material";

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
