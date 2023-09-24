import Image from "next/image";

import { Check } from "@mui/icons-material";
import { Grid } from "@mui/material";

import { Typography } from "@/components/ui/typography";
import { IsDefaultBadge } from "@/components/wallet/is-default-badge";
import { robotoMono } from "@/styles/fonts";
import type { BankAccount } from "@/types/bank";
import { formatBankAccount } from "@/utils/misc";
import { useBankAccountSelect } from "@/components/wallet/bank-account-select";

export const BankAccountOption = ({
  bankAccountId,
  bankLogoUrl,
  accountNumber,
  isDefault,
}: BankAccount) => {
  const select = useBankAccountSelect();

  if (!select) throw Error("U R STUPID");

  const { value, onChange } = select;
  const selected = value === bankAccountId;

  const formattedAccountNumber = formatBankAccount(accountNumber);

  return (
    <Grid
      component="div"
      container
      onClick={() => onChange(bankAccountId)}
      sx={{
        border: (theme) => `1px solid ${theme.palette.base[500]}`,
        borderRadius: 1.5,
        p: 1,
      }}
    >
      <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
        <Image
          src={bankLogoUrl}
          alt="Bank's logo"
          width={36}
          height={36}
          style={{
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: 4,
          }}
        />
      </Grid>
      <Grid item xs sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          as="span"
          variant="h6"
          color="base.500"
          fontFamily={robotoMono.style.fontFamily}
        >
          {formattedAccountNumber}
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
        {selected ? <Check sx={{ color: "pagoGreen.800" }} /> : null}
      </Grid>
    </Grid>
  );
};
