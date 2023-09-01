import { forwardRef, type PropsWithChildren } from "react";

import { Paper, type PaperProps } from "@mui/material";

export type PaperLayoutProps = PropsWithChildren<{
  sx?: PaperProps["sx"];
}>;

export const PaperLayout = forwardRef<HTMLDivElement, PaperLayoutProps>(
  function PaperLayout({ sx, children }, ref) {
    return (
      <Paper elevation={3} sx={{ p: 2, ...sx }} ref={ref} tabIndex={-1}>
        {children}
      </Paper>
    );
  }
);

export default PaperLayout;
