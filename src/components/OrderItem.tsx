import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Order } from "@/types/types";
import { ChevronRight } from "@mui/icons-material";
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import { Status } from "./Status";
import { Divider } from "./ui/Divider";
import { Typography } from "./ui/Typography";

export type OrderItemProps = Order;

export const OrderItem = ({
  orderItem: { name, description, quantity, fileUrls },
  orderStatus,
  currency,
  totalAmount,
  latestReceiveItemDate,
}: OrderItemProps) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const firstImageUrl = fileUrls?.[0];

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, md: 2 } }}>
      <Stack spacing={mdDown ? 1 : 2}>
        <Stack direction="row" spacing={2} flexGrow={1}>
          {/* 左方圖片 */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 74, md: 200 },
              height: { xs: 74, md: 200 },
            }}
          >
            {firstImageUrl ? (
              <Image
                src={firstImageUrl}
                alt={`Image of ${name}`}
                fill
                placeholder="blur"
                blurDataURL={`/_next/image?url=${firstImageUrl}&w=16&q=1`}
                sizes="(max-width: 600px) 74px, 200px"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
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
              <Status statusCode={orderStatus} />
            </Stack>
            <Stack
              direction={mdDown ? "row" : "column"}
              flexGrow={mdDown ? 0 : 1}
              justifyContent={mdDown ? "space-between" : "space-evenly"}
            >
              {/* 描述 */}
              <Typography variant={mdDown ? "h6" : "h3"} color="base.main">
                {description}
              </Typography>
              {/* 數量 */}
              <Typography variant={mdDown ? "h6" : "h3"}>{quantity}</Typography>
            </Stack>
            {/* 期限 */}
            {!mdDown ? (
              <Typography variant="h4" color="base.main">
                最晚收到商品時間: {latestReceiveItemDate}
              </Typography>
            ) : null}
          </Stack>
        </Stack>
        <Divider sx={{ borderColor: (theme) => theme.palette.pago[100] }} />
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
            <Typography variant={mdDown ? "h6" : "h4"} color="base.main">
              訂單金額:{" "}
              <Typography
                as="span"
                variant={mdDown ? "h6" : "h4"}
                color="primary.main"
              >
                {totalAmount.toLocaleString()} {currency}
              </Typography>
            </Typography>
            <ChevronRight sx={{ color: (theme) => theme.palette.pago.main }} />
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
