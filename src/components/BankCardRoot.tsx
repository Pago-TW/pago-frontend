import { Link } from "@/components/ui/Link";
import type { PaperProps } from "@mui/material";
import { Paper } from "@mui/material";

export const BankCardRoot = ({
  elevation = 3,
  sx,
  ...rest
}: PaperProps<typeof Link>) => {
  return (
    <Paper
      component={Link}
      elevation={elevation}
      sx={{
        width: "100%",
        height: 170,
        borderRadius: 1,
        overflow: "hidden",
        userSelect: "none",
        cursor: "pointer",
        padding: (theme) => theme.spacing(2, 3),
        ...sx,
      }}
      {...rest}
    />
  );
};