import type { PaperProps } from "@mui/material";
import { Paper } from "@mui/material";

export type PaperLayoutProps = {
  sx?: PaperProps["sx"];
  children: React.ReactNode;
};

export const PaperLayout = ({ sx, children }: PaperLayoutProps) => {
  return (
    <Paper elevation={3} sx={{ p: 2, ...sx }}>
      {children}
    </Paper>
  );
};

export default PaperLayout;
