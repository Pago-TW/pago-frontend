import { Skeleton, Stack } from "@mui/material";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { WithdrawPopup } from "@/components/wallet/withdraw-popup";
import { useBalance } from "@/hooks/api/use-balance";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useOpen } from "@/hooks/use-open";
import { formatNumber } from "@/utils/misc";

export const BalanceSection = () => {
  const { open, handleOpen, handleClose } = useOpen();

  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: balance, isLoading, isError } = useBalance();

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
          <Stack direction="row" spacing={{ xs: 2, md: 4 }} alignItems="center">
            <Typography as="span" variant="h3" weightPreset="bold">
              {!isLoading && !isError ? (
                formatNumber(balance)
              ) : (
                <Skeleton width={100} />
              )}
            </Typography>
            <Button
              size={mdUp ? "medium" : "small"}
              onClick={handleOpen}
              sx={[
                (theme) => ({
                  [theme.breakpoints.down("md")]: { minWidth: 0 },
                }),
              ]}
            >
              提領
            </Button>
          </Stack>
        </Stack>
      </SectionWrapper>
      <WithdrawPopup open={open} onClose={handleClose} />
    </>
  );
};
