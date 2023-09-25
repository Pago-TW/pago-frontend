import { ChevronRight } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";

import { Typography } from "@/components/ui/typography";
import { IsDefaultBadge } from "@/components/wallet/is-default-badge";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";
import { robotoMono } from "@/styles/fonts";
import { formatBankAccount } from "@/utils/misc";

export interface BankAccountSelectTriggerProps {
  onClick: () => void;
}

export const BankAccountSelectTrigger = ({
  onClick,
}: BankAccountSelectTriggerProps) => {
  const { watch } = useFormContext();

  const { data: bankAccounts } = useBankAccounts();

  const selectedBankAccount = bankAccounts?.find(
    ({ bankAccountId }) => bankAccountId === watch("bankAccountId")
  );
  const formattedSelectedAccountNumber =
    selectedBankAccount && formatBankAccount(selectedBankAccount.accountNumber);
  const isDefault = selectedBankAccount?.isDefault;

  return (
    <Grid
      component="div"
      container
      onClick={onClick}
      sx={{
        border: (theme) => `1px solid ${theme.palette.base[500]}`,
        borderRadius: 1.5,
        p: 1,
        cursor: "pointer",
      }}
    >
      <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
        <Typography as="span" variant="h6" color="base.500">
          收款帳號
        </Typography>
      </Grid>
      <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          as="span"
          variant="h6"
          color="base.500"
          fontFamily={robotoMono.style.fontFamily}
        >
          {formattedSelectedAccountNumber}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {isDefault ? <IsDefaultBadge /> : null}
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}
      >
        <ChevronRight />
      </Grid>
    </Grid>
  );
};
