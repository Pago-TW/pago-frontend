import Image from "next/image";

import { Box } from "@mui/material";

import { BankCardRoot } from "@/components/bank-card-root";
import { Typography } from "@/components/ui/typography";
import type { BankAccount } from "@/types/bank";

type BankCardProps = Pick<
  BankAccount,
  | "bankAccountId"
  | "bankName"
  | "bankLogoUrl"
  | "accountNumber"
  | "legalName"
  | "isDefault"
>;

export const BankCard = ({
  bankAccountId,
  bankName,
  bankLogoUrl,
  accountNumber,
  legalName,
  isDefault,
}: BankCardProps) => {
  return (
    <BankCardRoot elevation={3} href={`/users/me/payments/${bankAccountId}`}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box
          fontSize={10}
          textAlign="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          color="base.500"
          position="relative"
          sx={{
            borderWidth: 1,
            borderRadius: 1,
            borderStyle: "solid",
            borderColor: "base.300",
          }}
        >
          <Image
            src={bankLogoUrl}
            alt="Bank's logo"
            width={36}
            height={36}
            sizes="36px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
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
