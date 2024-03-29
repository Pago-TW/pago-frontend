import { ChevronRight } from "@mui/icons-material";
import { Skeleton, Stack } from "@mui/material";

import { Link } from "@/components/ui/link";
import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";
import { useMediaQuery } from "@/hooks/use-media-query";
import { robotoMono } from "@/styles/fonts";
import { formatBankAccount } from "@/utils/misc";

export const BankAccountSection = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const { data: bankAccounts, isLoading, isError } = useBankAccounts();

  const defaultAccount = bankAccounts?.find(({ isDefault }) => isDefault);
  const formattedAccountNumber =
    defaultAccount && formatBankAccount(defaultAccount.accountNumber);

  return (
    <SectionWrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography as="span" variant={mdUp ? "h4" : "h5"}>
          收款帳號
        </Typography>
        <Typography
          as="span"
          variant={mdUp ? "h4" : "h5"}
          color="base.500"
          fontFamily={robotoMono.style.fontFamily}
        >
          {!isLoading && !isError ? (
            !defaultAccount ? (
              "無預設帳號"
            ) : (
              formattedAccountNumber
            )
          ) : (
            <Skeleton width={200} />
          )}
        </Typography>
        <Link
          href="/users/me/bank-accounts"
          display="inline-flex"
          alignItems="center"
        >
          <ChevronRight />
        </Link>
      </Stack>
    </SectionWrapper>
  );
};
