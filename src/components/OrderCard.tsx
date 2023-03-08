import { useMediaQuery } from "@hooks/useMediaQuery";
import { Box, Paper, Skeleton, Stack } from "@mui/material";
import Image from "next/image";
import { Divider } from "./ui/Divider";
import { Typography } from "./ui/Typography";

export type OrderCardProps = {
  name: string;
  imageUrl: string;
  description: string;
  orderStatus: "待確認" | "待購買" | "待面交" | "已送達" | "已完成" | "不成立";
  quantity: number;
  amount: number;
  currency: string;
};

export const OrderCard = ({
  name,
  imageUrl,
  description,
  orderStatus,
  currency,
  amount,
}: OrderCardProps) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, md: 3 } }}>
      <Stack spacing={mdDown ? 1 : 3}>
        <Stack direction="row" spacing={1} flexGrow={1}>
          {/* 左方圖片 */}
          <Box
            sx={{
              position: "relative",
              aspectRatio: "1 / 1",
              width: { xs: 74, md: 250 },
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
                {orderStatus}
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
              <Typography variant={mdDown ? "h6" : "h3"}>{amount}</Typography>
            </Stack>
            {/* 期限 */}
            {!mdDown ? (
              <Typography variant="h4" color="base.400">
                最晚收到商品時間：11/15/2022 12:00AM
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
          >
            <Typography variant={mdDown ? "h6" : "h4"} color="base.400">
              訂單金額:
              <Typography
                as="span"
                variant={mdDown ? "h6" : "h4"}
                sx={{ color: "primary.main" }}
              >
                {amount.toLocaleString()} {currency}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};
