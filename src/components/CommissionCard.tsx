import { Divider } from "@components/ui/Divider";
import { Typography } from "@components/ui/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import type { Theme } from "src/styles/theme";

export type Commission = {
  name: string;
  imageUrl: string;
  description: string;
  orderStatus: "待確認" | "待面交" | "待購買" | "已完成" | "不成立";
  quantity: number;
  amount: number;
  currency: string;
};

export const CommissionCard = ({
  name,
  imageUrl,
  description,
  orderStatus,
  currency,
  amount,
}: Commission) => {
  const xs = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "md")
  );

  return (
    <Paper elevation={3} sx={{ p: { xs: 1, md: 3 } }}>
      <Stack spacing={xs ? 1 : 3}>
        <Stack direction="row" spacing={1} flexGrow={1}>
          {/* 左方圖片 */}
          <Box
            sx={{
              position: "relative",
              width: { xs: 74, md: 250 },
              height: { xs: 74, md: 250 },
            }}
          >
            <Image
              src={imageUrl}
              alt={`${name} image`}
              style={{ objectFit: "cover" }}
              fill
              sizes="(max-width: 600px) 74px, 250px"
            />
          </Box>
          {/* 右方資訊 */}
          <Stack flexGrow={1} justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
              {/* 名稱 */}
              <Typography
                variant={xs ? "h5" : "h2"}
                weightPreset={xs ? "normal" : "bold"}
              >
                {name}
              </Typography>
              {/* 狀態 */}
              <Typography
                variant={xs ? "h6" : "h3"}
                sx={{ color: (theme) => theme.palette.base[400] }}
              >
                {orderStatus}
              </Typography>
            </Stack>
            <Stack
              direction={xs ? "row" : "column"}
              flexGrow={xs ? 0 : 1}
              justifyContent={xs ? "space-between" : "space-evenly"}
            >
              {/* 描述 */}
              <Typography
                variant={xs ? "h6" : "h3"}
                sx={{ color: (theme) => theme.palette.base[400] }}
              >
                {description}
              </Typography>
              {/* 數量 */}
              <Typography variant={xs ? "h6" : "h3"}>{amount}</Typography>
            </Stack>
            {/* 期限 */}
            {!xs ? (
              <Typography
                variant="h4"
                sx={{ color: (theme) => theme.palette.base[400] }}
              >
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
            <Typography
              variant={xs ? "h6" : "h4"}
              sx={{ color: (theme) => theme.palette.base[400] }}
            >
              訂單金額: 訂單金額:
              <Typography
                as="span"
                variant={xs ? "h6" : "h4"}
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
