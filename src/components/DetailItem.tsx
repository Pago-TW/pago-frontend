import { useMediaQuery } from "@hooks/useMediaQuery";
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
  labelVariant,
  valueVariant,
}: DetailItemProps) => {
  const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Stack
      direction={multiLine ? "column" : "row"}
      spacing={2}
      justifyContent="space-between"
      alignItems={multiLine ? "flex-start" : "center"}
    >
      {/* 標籤 */}
      <Typography
        variant={labelVariant ?? (mdDown ? "h5" : "h4")}
        color="base.400"
        sx={{ flexShrink: 0 }}
      >
        {label}
      </Typography>
      {/* 數值 */}
      <Typography
        variant={valueVariant ?? (mdDown ? "h5" : "h4")}
        weightPreset={valueBold ? "bold" : "normal"}
      >
        {value}
      </Typography>
    </Stack>
  );
};
