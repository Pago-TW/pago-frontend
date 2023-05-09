import type { Perspective } from "@/types/misc";
import type { OrderStatus } from "@/types/order";
import { Box } from "@mui/material";
import type { FC } from "react";

const getConsumerStatusText = ({
  status,
  isApplicant,
}: {
  status: OrderStatus;
  isApplicant: boolean;
}) => {
  switch (status) {
    case "REQUESTED":
      return "已發布委託，等待代購者出價";
    case "TO_BE_PURCHASED":
      return "委託已接單，等待代購者購買";
    case "TO_BE_DELIVERED":
      return "代購者已購買到商品，等待面交";
    case "DELIVERED":
      return "商品已送達";
    case "FINISHED":
      return "訂單已完成";
    case "CANCELLED":
      return "此訂單不成立";
    case "TO_BE_POSTPONED":
      if (isApplicant) {
        return "已送出延期原因，請等待代購者接受";
      }
      return "代購者申請延期，請確認是否接受";
    case "TO_BE_CANCELLED":
      if (isApplicant) {
        return "已送出取消原因，請等待代購者接受";
      }
      return "代購者申請取消，請確認是否接受";
  }
};

const getShopperStatusText = ({
  status,
  isApplicant,
}: {
  status: OrderStatus;
  isApplicant: boolean;
}) => {
  switch (status) {
    case "REQUESTED":
      return "已向委託者出價，等待委託者回應";
    case "TO_BE_PURCHASED":
      return "委託媒合成功，請於指定地點購買商品";
    case "TO_BE_DELIVERED":
      return "已購買到商品，請於期限內進行面交";
    case "DELIVERED":
      return "商品已送達";
    case "FINISHED":
      return "訂單已完成";
    case "CANCELLED":
      return "此訂單不成立";
    case "TO_BE_POSTPONED":
      if (isApplicant) {
        return "已送出延期原因，請等待委託者接受";
      }
      return "委託者申請延期，請確認是否接受";
    case "TO_BE_CANCELLED":
      if (isApplicant) {
        return "已送出取消原因，請等待委託者接受";
      }
      return "委託者申請取消，請確認是否接受";
  }
};

const getColor = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case "REQUESTED":
      return "base.400";
    case "TO_BE_PURCHASED":
      return "secondary.main";
    case "TO_BE_DELIVERED":
      return "pago.main";
    case "DELIVERED":
      return "pago.main";
    case "FINISHED":
      return "pagoGreen.main";
    case "CANCELLED":
      return "pagoYellow.main";
    case "TO_BE_CANCELLED":
      return "pagoRed.300";
    case "TO_BE_POSTPONED":
      return "pagoRed.300";
  }
};

interface StatusBoxProps {
  perspective: Perspective;
  status: OrderStatus;
  isApplicant: boolean;
}

export const StatusBox: FC<StatusBoxProps> = ({
  perspective,
  status,
  isApplicant,
}) => {
  const text =
    perspective === "consumer"
      ? getConsumerStatusText({ status, isApplicant })
      : getShopperStatusText({ status, isApplicant });
  const bgColor = getColor({ status });

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
