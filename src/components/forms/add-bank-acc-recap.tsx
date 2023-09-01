import { Box, Stack } from "@mui/material";

import { BankAccountInfo } from "@/components/bank-account-info";
import { BankUserInfo } from "@/components/bank-user-info";
import { Button } from "@/components/ui/button";
import { useAddBankAccFormContext } from "@/contexts/add-bank-acc-form-context";
import { useBankBranches } from "@/hooks/api/use-bank-branches";
import { useBanks } from "@/hooks/api/use-banks";
import { useDistricts } from "@/hooks/api/use-districts";

interface AddBankRecapProps {
  onPrev: () => void;
  onSubmit: () => void;
}

export const AddBankAccRecap = ({ onPrev, onSubmit }: AddBankRecapProps) => {
  const { form } = useAddBankAccFormContext();

  const { legalName, birthDate, city, zipCode } = form.data.userInfo;
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

  const districts = districtOptions[0]?.districtList ?? [];
  const district =
    districts.find((d) => d.zipCode === zipCode)?.districtChineseName ?? "";
  const residentialDistrict = `${city}${district}`;

  const bankName = banks.find((b) => b.bankCode === bankCode)?.name ?? "";
  const branchName =
    branches.find((b) => b.branchCode === branchCode)?.branchName ?? "";

  return (
    <Box width="100%">
      <Stack spacing={2}>
        <BankUserInfo
          legalName={legalName}
          birthDate={birthDate}
          residentialDistrict={residentialDistrict}
        />
        <BankAccountInfo
          bankName={bankName}
          branchAdministrativeDivision={bankCity}
          branchName={branchName}
          accountHolderName={accountHolderName}
          accountNumber={accountNumber}
        />
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
