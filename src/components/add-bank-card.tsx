import { Add } from "@mui/icons-material";

import { BankCardRoot } from "@/components/bank-card-root";
import { Typography } from "@/components/ui/typography";

export const AddBankCard = () => {
  return (
    <BankCardRoot
      elevation={0}
      sx={{
        p: 0,
        color: (theme) => theme.palette.base[500],
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderStyle: "dashed",
        borderColor: "base.300",
      }}
      href="/users/me/payments/new"
    >
      <Typography
        variant="h5"
        as="span"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Add />
        新增銀行帳戶
      </Typography>
    </BankCardRoot>
  );
};
