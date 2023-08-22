import type { FC } from "react";

import { Typography } from "@/components/ui/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export interface PackagingTextProps {
  isPackagingRequired: boolean;
}

export const PackagingText: FC<PackagingTextProps> = ({
  isPackagingRequired,
}) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const variant = isDesktop ? "h3" : "h6";

  return (
    <Typography
      variant={variant}
      color="pagoYellow.main"
      sx={{ flexShrink: 0 }}
    >
      {isPackagingRequired ? "需要包裝" : "不需包裝"}
    </Typography>
  );
};
