import { Stack } from "@mui/material";

import { DetailItem } from "@/components/detail-item";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import type { BankAccount } from "@/types/bank";

export type BankAccountInfoProps = Pick<
  BankAccount,
  | "bankName"
  | "branchAdministrativeDivision"
  | "branchName"
  | "accountHolderName"
  | "accountNumber"
>;

export const BankAccountInfo = ({
  bankName,
  branchAdministrativeDivision,
  branchName,
  accountHolderName,
  accountNumber,
}: BankAccountInfoProps) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h4" as="p">
          銀行帳戶資訊
        </Typography>
        <DetailItem label="銀行帳戶" value={bankName} spacing={1} multiLine />
        <DetailItem
          label="地區"
          value={branchAdministrativeDivision}
          spacing={1}
          multiLine
        />
        <DetailItem label="分行名稱" value={branchName} spacing={1} multiLine />
        <DetailItem
          label="銀行戶名"
          value={accountHolderName}
          spacing={1}
          multiLine
        />
        <DetailItem
          label="銀行帳號"
          value={accountNumber}
          spacing={1}
          multiLine
        />
      </Stack>
    </Paper>
  );
};
