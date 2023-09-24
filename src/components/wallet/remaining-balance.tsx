import { Skeleton, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Typography } from "@/components/ui/typography";
import { useBalance } from "@/hooks/api/use-balance";
import { formatNumber } from "@/utils/misc";

const getRemainingBalanceText = (balance?: number, amount?: number) => {
  if (typeof balance === "undefined" || typeof amount === "undefined")
    return undefined;
  return formatNumber(balance - amount - 15);
};

export const RemainingBalance = () => {
  const { watch } = useFormContext();

  const { data: balance } = useBalance();

  const amount: number = watch("amount") || 0;
  const formattedRemainingBalance = getRemainingBalanceText(balance, amount);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography as="span" variant="h6">
        提領後錢包餘額
      </Typography>
      <Typography as="span" variant="h6" weightPreset="bold">
        {formattedRemainingBalance ?? <Skeleton width={76} />}
      </Typography>
    </Stack>
  );
};
