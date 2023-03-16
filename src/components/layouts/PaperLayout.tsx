import type { PaperProps } from "@mui/material";
import { Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

export type PaperLayoutProps = PropsWithChildren<{
  sx?: PaperProps["sx"];
}>;

export const PaperLayout = ({ sx, children }: PaperLayoutProps) => {
  return (
    <Paper elevation={3} sx={{ p: 2, ...sx }}>
      {children}
    </Paper>
  );
};

export default PaperLayout;
