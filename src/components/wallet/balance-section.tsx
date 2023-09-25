import { Skeleton, Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { WithdrawPopup } from "@/components/wallet/withdraw-popup";
import { useBalance } from "@/hooks/api/use-balance";
import { useOpen } from "@/hooks/use-open";
import { formatNumber } from "@/utils/misc";

export const BalanceSection = () => {
  const { data: balance, isLoading, isError } = useBalance();

  const { open, handleOpen, handleClose } = useOpen();

  return (
    <>
      <SectionWrapper>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography as="span" variant="h5">
            餘額
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography as="span" variant="h3" weightPreset="bold">
              {!isLoading && !isError ? (
                formatNumber(balance)
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <Button size="small" sx={{ minWidth: 0 }} onClick={handleOpen}>
              提領
            </Button>
          </Stack>
        </Stack>
      </SectionWrapper>
      <WithdrawPopup open={open} onClose={handleClose} />
    </>
  );
};
