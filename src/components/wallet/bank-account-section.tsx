import { ChevronRight } from "@mui/icons-material";
import { Skeleton, Stack } from "@mui/material";

import { Typography } from "@/components/ui/typography";
import { SectionWrapper } from "@/components/wallet/section-wrapper";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";
import { formatBankAccount } from "@/utils/misc";

export const BankAccountSection = () => {
  const { data: bankAccounts, isLoading, isError } = useBankAccounts();

  const defaultAccount = bankAccounts?.find(({ isDefault }) => isDefault);
  const formattedAccountNumber =
    defaultAccount && formatBankAccount(defaultAccount.accountNumber);

  return (
    <SectionWrapper>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography as="span" variant="h5">
          收款帳號
        </Typography>
        <Typography as="span" variant="h5" color="base.500">
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
        <ChevronRight />
      </Stack>
    </SectionWrapper>
  );
};
