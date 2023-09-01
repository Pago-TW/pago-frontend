import { forwardRef } from "react";

import { ArrowDownward } from "@mui/icons-material";

import { Button, type ButtonProps } from "@/components/ui/button";
import type { WithRequired } from "@/types/util";

export type ShowMoreButtonProps = WithRequired<
  Omit<ButtonProps, "children">,
  "onClick"
> & {
  hasMore?: boolean;
};

export const ShowMoreButton = forwardRef<
  HTMLButtonElement,
  ShowMoreButtonProps
>(function ShowMoreButton(
  {
    variant = "outlined",
    size = "small",
    loading,
    disabled,
    startIcon,
    hasMore,
    ...rest
  },
  ref
) {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      loading={loading}
      disabled={disabled ?? !hasMore}
      startIcon={startIcon ?? <ArrowDownward />}
      {...rest}
    >
      {loading ? "正在載入" : hasMore ? "查看更多" : "沒有更多了"}
    </Button>
  );
});
