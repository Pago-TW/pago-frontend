import { useEffect } from "react";

import { Skeleton, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Typography } from "@/components/ui/typography";
import { useBalance } from "@/hooks/api/use-balance";
import { formatNumber } from "@/utils/misc";

const getRemainingBalanceText = (balance?: number, amount?: number) => {
  if (typeof balance === "undefined" || typeof amount === "undefined")
    return undefined;
  return balance - amount - 15;
};

export const RemainingBalance = () => {
  const { watch, setError, clearErrors } = useFormContext();

  const { data: balance } = useBalance();

  const amount: number = watch("withdrawalAmount") || 0;
  const remainingBalance = getRemainingBalanceText(balance, amount);
  const formattedRemainingBalance =
    remainingBalance && formatNumber(remainingBalance);

  useEffect(() => {
    if (typeof remainingBalance !== "undefined" && remainingBalance < 0) {
      setError("withdrawalAmount", { message: "提領金額不得大於錢包餘額" });
    } else {
      clearErrors("withdrawalAmount");
    }
  }, [clearErrors, remainingBalance, setError]);

  return (
    <Stack direction="row" justifyContent="space-between">
      <Typography as="span" variant="h6" flexShrink={0}>
        提領後錢包餘額
      </Typography>
      <Typography as="span" variant="h6" weightPreset="bold" ml={1} noWrap>
        {formattedRemainingBalance ?? <Skeleton width={76} />}
      </Typography>
    </Stack>
  );
};
