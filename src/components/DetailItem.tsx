import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import type { TypographyProps } from "./ui/Typography";
import { Typography } from "./ui/Typography";

type DetailItemProps = {
  multiLine?: boolean;
  label: ReactNode;
  value: ReactNode;
  valueBold?: boolean;
  labelVariant?: TypographyProps["variant"];
  valueVariant?: TypographyProps["variant"];
};

export const DetailItem = ({
  multiLine,
  label,
  value,
  valueBold,
  labelVariant = "h5",
  valueVariant = "h5",
}: DetailItemProps) => (
  <Stack
    direction={multiLine ? "column" : "row"}
    spacing={2}
    justifyContent="space-between"
    alignItems={multiLine ? "flex-start" : "center"}
  >
    {/* 標籤 */}
    <Typography variant={labelVariant} color="base.400">
      {label}
    </Typography>
    {/* 數值 */}
    <Typography
      variant={valueVariant}
      weightPreset={valueBold ? "bold" : "normal"}
    >
      {value}
    </Typography>
  </Stack>
);
