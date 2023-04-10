import { useMediaQuery } from "@/hooks/useMediaQuery";
import { ChevronRight } from "@mui/icons-material";
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import type { Currency } from "./inputs/CurrencyInput";
import { Divider } from "./ui/Divider";
import { Typography } from "./ui/Typography";

type OrderStatus =
  | "REQUESTED"
  | "TO_BE_PURCHASED"
  | "TO_BE_DELIVERED"
  | "DELIVERED"
  | "FINISHED"
  | "CANCELED";

export type Order = {
  orderId: string;
  orderItemId: string;
  consumerId: string;
  orderItem: {
    name: string;
    imageUrl: string;
    description: string;
    quantity: number;
    unitPrice: number;
    purchaseCountry: string;
    purchaseCity: string;
    purchaseDistrict: string;
    purchaseRoad: string;
  };
  packaging: boolean;
  verification: boolean;
  destination: string;
  travelerFee: number;
  currency: Currency;
  platformFee: number;
  tariffFee: number;
  note: string;
  orderStatus: OrderStatus;
  latestReceiveItemDate: string;
  createDate: string;
  updateDate: string;
  totalAmount: number;
  hasNewActivity: boolean;
};

export type OrderItemProps = Order;

const orderStatusMap: Record<OrderStatus, string> = {
  REQUESTED: "待確認",
  TO_BE_PURCHASED: "待購買",
  TO_BE_DELIVERED: "待面交",
  DELIVERED: "已送達",
  FINISHED: "已完成",
  CANCELED: "不成立",
};

export const OrderItem = ({
  orderItem: { name, imageUrl, description, quantity },
  orderStatus,
  currency,
  totalAmount,
  latestReceiveItemDate,
}: OrderItemProps) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, md: 2 } }}>
      <Stack spacing={mdDown ? 1 : 2}>
        <Stack direction="row" spacing={2} flexGrow={1}>
          {/* 左方圖片 */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 74, md: 250 },
              height: { xs: 74, md: 250 },
            }}
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={`${name} image`}
                style={{ objectFit: "cover" }}
                fill
                sizes="(max-width: 600px) 74px, 250px"
              />
            ) : (
              <Skeleton variant="rectangular" width="100%" height="100%" />
            )}
          </Box>
          {/* 右方資訊 */}
          <Stack flexGrow={1} justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
              {/* 名稱 */}
              <Typography
                variant={mdDown ? "h5" : "h2"}
                weightPreset={mdDown ? "normal" : "bold"}
              >
                {name}
              </Typography>
              {/* 狀態 */}
              <Typography variant={mdDown ? "h6" : "h3"} color="base.400">
                {orderStatusMap[orderStatus]}
              </Typography>
            </Stack>
            <Stack
              direction={mdDown ? "row" : "column"}
              flexGrow={mdDown ? 0 : 1}
              justifyContent={mdDown ? "space-between" : "space-evenly"}
            >
              {/* 描述 */}
              <Typography variant={mdDown ? "h6" : "h3"} color="base.400">
                {description}
              </Typography>
              {/* 數量 */}
              <Typography variant={mdDown ? "h6" : "h3"}>{quantity}</Typography>
            </Stack>
            {/* 期限 */}
            {!mdDown ? (
              <Typography variant="h4" color="base.400">
                最晚收到商品時間: {latestReceiveItemDate}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Typography variant={mdDown ? "h6" : "h4"} color="base.400">
              訂單金額:{" "}
              <Typography
                as="span"
                variant={mdDown ? "h6" : "h4"}
                color="primary.main"
              >
                {totalAmount.toLocaleString()} {currency}
              </Typography>
            </Typography>
            <ChevronRight sx={{ color: (theme) => theme.palette.pago[500] }} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
