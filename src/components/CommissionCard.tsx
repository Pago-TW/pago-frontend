import { Divider } from "@components/ui/Divider";
import { FlexCenter } from "@components/ui/FlexCenter";
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
    <Paper
      elevation={3}
      sx={{ height: { xs: 124, md: 376 }, p: { xs: 1, md: 3 } }}
    >
      <Stack spacing={xs ? 1 : 3} sx={{ height: "100%" }}>
        <Stack direction="row" spacing={1} flexGrow={1}>
          <Box
            sx={{
              position: "relative",
              width: { xs: 74, md: 250 },
              height: { xs: 74, md: 250 },
            }}
          >
            <Image
              src={imageUrl}
              alt={`${name}的圖片`}
              style={{ objectFit: "cover" }}
              fill
              sizes="(max-width: 600px) 74px, 250px"
            />
          </Box>
          <Stack flexGrow={1} justifyContent="space-between">
            <Stack direction="row" justifyContent="space-between">
              <Typography
                variant={xs ? "h5" : "h2"}
                weightPreset={xs ? "normal" : "bold"}
              >
                {name}
              </Typography>
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
              <Typography
                variant={xs ? "h6" : "h3"}
                sx={{ color: (theme) => theme.palette.base[400] }}
              >
                {description}
              </Typography>
              <Typography variant={xs ? "h6" : "h3"}>{amount}</Typography>
            </Stack>
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
        <FlexCenter cross>
          <Typography
            variant={xs ? "h6" : "h4"}
            sx={{ color: (theme) => theme.palette.base[400] }}
          >
            訂單金額:{" "}
            <Typography
              as="span"
              variant={xs ? "h6" : "h4"}
              sx={{ color: "primary.main" }}
            >
              {amount.toLocaleString()} {currency}
            </Typography>
          </Typography>
        </FlexCenter>
      </Stack>
    </Paper>
  );
};
