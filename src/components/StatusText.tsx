import type { Perspective } from "@/types/misc";
import type { StatusCode } from "@/types/order";
import { Box } from "@mui/material";

interface StatusTextProps {
  perspective: Perspective;
  statusCode: StatusCode;
}

const statusTextMap: Record<
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
    TO_BE_CANCELED: {
      text: "已送出取消原因，待代購者接受",
      bgColor: "error.light",
    },
    TO_BE_POSTPONED: {
      text: "代購者申請延期",
      bgColor: "error.light",
    },
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
    TO_BE_CANCELED: {
      text: "委託者申請取消",
      bgColor: "error.light",
    },
    TO_BE_POSTPONED: {
      text: "已送出延期原因，待委託者接受",
      bgColor: "error.light",
    },
  },
};

export const StatusText = (props: StatusTextProps) => {
  const { perspective, statusCode } = props;

  const { text, bgColor } = statusTextMap[perspective][statusCode];

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
