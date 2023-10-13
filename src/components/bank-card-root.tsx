import { Paper, type PaperProps } from "@mui/material";

import { Link } from "@/components/ui/link";

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
        display: "block",
        width: 336,
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
