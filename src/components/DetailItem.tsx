import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Stack } from "@mui/material";
import type { ReactNode } from "react";
import type { TypographyProps } from "./ui/Typography";
import { Typography } from "./ui/Typography";

type DetailItemProps = {
  multiLine?: boolean;
  label: ReactNode;
  value: ReactNode;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
};

export const DetailItem = (props: DetailItemProps) => {
  const {
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
      spacing={2}
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
