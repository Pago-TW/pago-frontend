import { forwardRef } from "react";

import { styled } from "@mui/material";
import MuiPaper, {
  type PaperProps as MuiPaperProps,
} from "@mui/material/Paper";

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
