import { Stack } from "@mui/material";

import { DetailItem } from "@/components/detail-item";
import { Paper } from "@/components/ui/paper";
import { Typography } from "@/components/ui/typography";
import type { ConfigType } from "@/libs/dayjs";
import type { BankAccount } from "@/types/bank";
import { formatDate } from "@/utils/date";

export type BankUserInfoProps = Pick<
  BankAccount,
  "legalName" | "residentialDistrict"
> & {
  birthDate: BankAccount["birthDate"] | ConfigType;
};

export const BankUserInfo = ({
  legalName,
  birthDate,
  residentialDistrict,
}: BankUserInfoProps) => {
  return (
    <Paper sx={{ p: 2, flex: 1 }}>
      <Stack spacing={3}>
        <Typography variant="h4" as="p">
          使用者資訊
        </Typography>
        <DetailItem label="真實姓名" value={legalName} spacing={1} multiLine />
        <DetailItem
          label="生日"
          value={formatDate(birthDate)}
          spacing={1}
          multiLine
        />
        <DetailItem
          label="居住地區"
          value={residentialDistrict}
          spacing={1}
          multiLine
        />
      </Stack>
    </Paper>
  );
};
