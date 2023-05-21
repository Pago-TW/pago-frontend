import type { BankAccount } from "@/types/bank";
import { Box } from "@mui/material";
import { BankCardRoot } from "./BankCardRoot";
import { Typography } from "./ui/Typography";

type BankCardProps = Pick<
  BankAccount,
  "bankAccountId" | "bankName" | "accountNumber" | "legalName" | "isDefault"
>;

export const BankCard = ({
  bankAccountId,
  bankName,
  accountNumber,
  legalName,
  isDefault,
}: BankCardProps) => {
  return (
    <BankCardRoot elevation={3} href={`/users/me/payments/${bankAccountId}`}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          width={36}
          height={36}
          fontSize={10}
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="base.500"
          sx={{
            borderWidth: 1,
            borderRadius: 1,
            borderStyle: "solid",
            borderColor: "base.300",
          }}
        >
          銀行 logo
        </Box>
        <Typography variant="h6" as="p">
          {bankName}
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography variant="h5" as="p">
          {accountNumber}
        </Typography>
      </Box>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Typography variant="h6" as="p">
          {legalName}
        </Typography>
        {isDefault && (
          <Box
            width={32}
            height={22}
            bgcolor="pago.25"
            color="pago.dark"
            borderRadius={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography fontSize={12}>預設</Typography>
          </Box>
        )}
      </Box>
    </BankCardRoot>
  );
};
