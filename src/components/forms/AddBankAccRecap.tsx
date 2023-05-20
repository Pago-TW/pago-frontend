import { useAddBankAccFormContext } from "@/contexts/AddBankFormContext";
import { useBankBranches } from "@/hooks/api/useBankBranches";
import { useBanks } from "@/hooks/api/useBanks";
import { useDistricts } from "@/hooks/api/useDistricts";
import { useLocale } from "@/hooks/useLocale";
import { formatDate } from "@/utils/formatDateTime";
import { Box, Stack } from "@mui/material";
import { DetailItem } from "../DetailItem";
import { Button } from "../ui/Button";
import { Paper } from "../ui/Paper";
import { Typography } from "../ui/Typography";

type AddBankRecapProps = {
  onPrev: () => void;
  onSubmit: () => void;
};

export const AddBankAccRecap = ({ onPrev, onSubmit }: AddBankRecapProps) => {
  const locale = useLocale();

  const { form } = useAddBankAccFormContext();

  const {
    legalName,
    identityNumber,
    birthDate,
    city,
    zipCode,
    residentialAddress,
  } = form.data.userInfo;
  const { bankCode, bankCity, branchCode, accountHolderName, accountNumber } =
    form.data.bankInfo;

  const { data: districtOptions = [] } = useDistricts({
    administrativeDivision: city,
  });
  const { data: banks = [] } = useBanks();
  const { data: branches = [] } = useBankBranches({
    administrativeDivision: bankCity,
    bankCode,
  });

  const districts = districtOptions[0]?.districtList || [];
  const district =
    districts.find((d) => d.zipCode === zipCode)?.districtChineseName || "";
  const fullAddress = `${city}${district}${residentialAddress}`;

  const bankName = banks.find((b) => b.bankCode === bankCode)?.name || "";
  const branchName =
    branches.find((b) => b.branchCode === branchCode)?.branchName || "";

  return (
    <Box width="100%">
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Typography variant="h4" as="p">
              使用者資訊
            </Typography>
            <DetailItem
              label="真實姓名"
              value={legalName}
              spacing={1}
              multiLine
            />
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
        <Paper sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Typography variant="h4" as="p">
              銀行帳戶資訊
            </Typography>
            <DetailItem
              label="銀行帳戶"
              value={bankName}
              spacing={1}
              multiLine
            />
            <DetailItem label="地區" value={bankCity} spacing={1} multiLine />
            <DetailItem
              label="分行名稱"
              value={branchName}
              spacing={1}
              multiLine
            />
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
      </Stack>
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="outlined"
          onClick={onPrev}
          sx={{ minWidth: 0, width: "100%" }}
        >
          上一步
        </Button>
        <Button onClick={onSubmit} sx={{ minWidth: 0, width: "100%" }}>
          提交
        </Button>
      </Stack>
    </Box>
  );
};
