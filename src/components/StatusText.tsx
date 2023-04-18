import type { Perspective, StatusCode } from "@/types/types";
import { Box } from "@mui/material";

interface StatusTextProps {
  perspective: Perspective;
  statusCode: StatusCode;
}

const statusMap: Record<
  Perspective,
  Record<StatusCode, { text: string; bgColor: string }>
> = {
  consumer: {
    REQUESTED: { text: "已發布委託，等待代購者出價", bgColor: "base.400" },
    TO_BE_PURCHASED: {
      text: "媒合成功，代購方請於期限內購買商品",
      bgColor: "secondary.main",
    },
    TO_BE_DELIVERED: { text: "商品已購買，等待交付", bgColor: "primary.main" },
    DELIVERED: { text: "商品已送達", bgColor: "primary.main" },
    FINISHED: { text: "訂單已完成", bgColor: "success.main" },
    CANCELED: { text: "此訂單不成立", bgColor: "warning.main" },
  },
  shopper: {
    REQUESTED: { text: "已向委託者出價，等待委託者回應", bgColor: "base.400" },
    TO_BE_PURCHASED: {
      text: "媒合成功，代購方請於期限內購買商品",
      bgColor: "secondary.main",
    },
    TO_BE_DELIVERED: { text: "商品已購買，等待交付", bgColor: "primary.main" },
    DELIVERED: { text: "商品已送達", bgColor: "primary.main" },
    FINISHED: { text: "訂單已完成", bgColor: "success.main" },
    CANCELED: { text: "此訂單不成立", bgColor: "warning.main" },
  },
};

export const StatusText = (props: StatusTextProps) => {
  const { perspective, statusCode } = props;

  const { text, bgColor } = statusMap[perspective][statusCode];

  return (
    <Box
      width="100%"
      height={72}
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        fontSize: (theme) => ({
          xs: theme.typography.pxToRem(18),
          md: theme.typography.pxToRem(20),
        }),
        color: (theme) => theme.palette.common.white,
        backgroundColor: bgColor,
        borderRadius: 1,
      }}
    >
      {text}
    </Box>
  );
};
