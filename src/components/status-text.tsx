import type { FC } from "react";

import { Typography, type TypographyProps } from "@/components/ui/typography";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { OrderStatus } from "@/types/order";

const statusMap: Record<
  OrderStatus,
  { text: string; color: TypographyProps["color"] }
> = {
  REQUESTED: { text: "待確認", color: "base.main" },
  TO_BE_PURCHASED: { text: "待購買", color: "secondary.main" },
  TO_BE_DELIVERED: { text: "待面交", color: "pago.main" },
  DELIVERED: { text: "已送達", color: "pago.light" },
  FINISHED: { text: "已完成", color: "success.main" },
  CANCELLED: { text: "不成立", color: "warning.main" },
  TO_BE_CANCELLED: { text: "待取消", color: "error.light" },
  TO_BE_POSTPONED: { text: "待延期", color: "error.light" },
};

export interface StatusTextProps {
  status: OrderStatus;
}

export const StatusText: FC<StatusTextProps> = ({ status }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const variant = isDesktop ? "h3" : "h6";

  const { text, color } = statusMap[status];

  return (
    <Typography variant={variant} color={color} sx={{ flexShrink: 0 }}>
      {text}
    </Typography>
  );
};
