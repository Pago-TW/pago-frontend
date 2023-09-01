import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack, TextField } from "@mui/material";
import { useSession } from "next-auth/react";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PhoneVerifyForm } from "@/components/forms/phone-verify-form";
import { BankBranchSelect } from "@/components/inputs/bank-branch-select";
import { BankSelect } from "@/components/inputs/bank-select";
import { CitySelect } from "@/components/inputs/city-select";
import { NumberInput } from "@/components/inputs/number-input";
import { Button } from "@/components/ui/button";
import { Paper } from "@/components/ui/paper";
import { useAddBankAccFormContext } from "@/contexts/add-bank-acc-form-context";

export const bankInfoFormSchema = z.object({
  bankCode: z.string().trim().min(1, "請選擇銀行"),
  bankCity: z.string().trim().min(1, "請選擇地區"),
  branchCode: z.string().trim().min(1, "請選擇分行"),
  accountHolderName: z.string().trim().min(1, "請輸入銀行戶名"),
  accountNumber: z.string().min(11, "無效的銀行帳號").max(14, "無效的銀行帳號"),
});

export type BankInfoFormValues = z.infer<typeof bankInfoFormSchema>;

interface BankInfoFormProps {
  onPrev: () => void;
  onNext: () => void;
}

export const BankInfoForm = ({ onPrev, onNext }: BankInfoFormProps) => {
  const { data: session } = useSession();

  const { form, setForm } = useAddBankAccFormContext();

  const {
    register,
    control,
    watch,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<BankInfoFormValues>({
    mode: "onBlur",
    defaultValues: form.data.bankInfo,
    resolver: zodResolver(bankInfoFormSchema),
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = (data: BankInfoFormValues) => {
    if (session?.user?.verified) {
      setForm((draft) => {
        draft.data.bankInfo = data;
      });
      onNext();
    } else {
      enqueueSnackbar({ variant: "error", message: "請先完成手機驗證" });
    }
  };
  const handlePrev = () => {
    setForm((draft) => {
      draft.data.bankInfo = getValues();
    });
    onPrev();
  };

  const [bankCode, bankCity] = watch(["bankCode", "bankCity"]);

  return (
    <Box
      width="100%"
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Paper sx={{ p: 2 }}>
        <Stack spacing={3}>
          <BankSelect
            placeholder="請選擇銀行"
            fullWidth
            control={control}
            name="bankCode"
          />
          <CitySelect
            placeholder="請選擇地區"
            fullWidth
            control={control}
            name="bankCity"
          />
          <BankBranchSelect
            placeholder="請選擇分行"
            fullWidth
            disabled={!bankCode || !bankCity}
            bankCode={bankCode}
            bankCity={bankCity}
            control={control}
            name="branchCode"
          />
          <TextField
            label="銀行戶名"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors.accountHolderName}
            helperText={errors.accountHolderName?.message}
            {...register("accountHolderName")}
          />
          <NumberInput
            label="銀行帳號"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={!!errors.accountNumber}
            helperText={errors.accountNumber?.message}
            control={control}
            name="accountNumber"
            valueAsString
            allowLeadingZeros
          />
          <PhoneVerifyForm />
        </Stack>
      </Paper>
      <Stack direction="row" spacing={2} mt={3}>
        <Button
          variant="outlined"
          onClick={handlePrev}
          sx={{ minWidth: 0, width: "100%" }}
        >
          上一步
        </Button>
        <Button type="submit" sx={{ minWidth: 0, width: "100%" }}>
          下一步
        </Button>
      </Stack>
    </Box>
  );
};
