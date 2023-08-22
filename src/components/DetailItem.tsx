import type { ReactNode } from "react";

import { Stack } from "@mui/material";

import { Typography, type TypographyProps } from "@/components/ui/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type DetailItemProps = {
  spacing?: number;
  multiLine?: boolean;
  label: ReactNode;
  value: ReactNode;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
};

export const DetailItem = (props: DetailItemProps) => {
  const {
    spacing = 2,
    multiLine,
    label,
    value,
    labelProps: {
      variant: labelVariant,
      color: labelColor,
      sx: labelSx,
      ...labelProps
    } = {},
    valueProps: { variant: valueVariant, sx: valueSx, ...valueProps } = {},
  } = props;

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Stack
      direction={multiLine ? "column" : "row"}
      spacing={spacing}
      justifyContent="space-between"
      alignItems={multiLine ? "flex-start" : "center"}
      flexWrap="wrap"
      width="100%"
    >
      {/* 標籤 */}
      <Typography
        variant={labelVariant ?? (mdUp ? "h4" : "h5")}
        color={labelColor ?? "base.main"}
        sx={{ flexShrink: 0, ...labelSx }}
        {...labelProps}
      >
        {label}
      </Typography>
      {/* 數值 */}
      <Typography
        maxWidth="100%"
        variant={valueVariant ?? (mdUp ? "h4" : "h5")}
        sx={{ wordWrap: "break-word", ...valueSx }}
        {...valueProps}
      >
        {value}
      </Typography>
    </Stack>
  );
};
