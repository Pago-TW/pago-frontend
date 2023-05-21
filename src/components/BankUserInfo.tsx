import { useLocale } from "@/hooks/useLocale";
import type { BankAccount } from "@/types/bank";
import { formatDate } from "@/utils/formatDateTime";
import { Stack } from "@mui/material";
import { DetailItem } from "./DetailItem";
import { Paper } from "./ui/Paper";
import { Typography } from "./ui/Typography";

export type BankUserInfoProps = Pick<
  BankAccount,
  "legalName" | "identityNumber"
> & {
  birthDate: BankAccount["birthDate"] | Date;
  fullAddress: string;
};

export const BankUserInfo = ({
  legalName,
  identityNumber,
  birthDate,
  fullAddress,
}: BankUserInfoProps) => {
  const locale = useLocale();

  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={3}>
        <Typography variant="h4" as="p">
          使用者資訊
        </Typography>
        <DetailItem label="真實姓名" value={legalName} spacing={1} multiLine />
        <DetailItem
          label="身分證字號/統一證號/公司統編"
          value={identityNumber}
          spacing={1}
          multiLine
        />
        <DetailItem
          label="生日/公司核准設立日期"
          value={formatDate({ date: birthDate, locale })}
          spacing={1}
          multiLine
        />
        <DetailItem
          label="戶籍地址/公司地址"
          value={fullAddress}
          spacing={1}
          multiLine
        />
      </Stack>
    </Paper>
  );
};
