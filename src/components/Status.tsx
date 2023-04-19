import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { StatusCode } from "@/types/order";
import React from "react";
import type { TypographyProps } from "./ui/Typography";
import { Typography } from "./ui/Typography";

export type StatusProps = {
  statusCode: StatusCode;
};

const statusMap: Record<
  StatusCode,
  { text: string; color: TypographyProps["color"] }
> = {
  REQUESTED: { text: "待確認", color: "base.main" },
  TO_BE_PURCHASED: { text: "待購買", color: "secondary.main" },
  TO_BE_DELIVERED: { text: "待面交", color: "pago.main" },
  DELIVERED: { text: "已送達", color: "pago.light" },
  FINISHED: { text: "已完成", color: "success.main" },
  CANCELED: { text: "不成立", color: "warning.main" },
  TO_BE_CANCELED: { text: "待取消", color: "error.light" },
  TO_BE_POSTPONED: { text: "待延期", color: "error.light" },
};

export const Status: React.FC<StatusProps> = ({ statusCode }) => {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const variant = isDesktop ? "h3" : "h6";

  const { text, color } = statusMap[statusCode];

  return (
    <Typography variant={variant} color={color}>
      {text}
    </Typography>
  );
};
