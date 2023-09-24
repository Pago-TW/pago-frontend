import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBack, Close } from "@mui/icons-material";
import { Box, IconButton, InputLabel, Stack } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { NumberInput } from "@/components/inputs/number-input";
import { OtpInput } from "@/components/inputs/otp-input";
import { Button } from "@/components/ui/button";
import { BankAccountOption } from "@/components/wallet/bank-account-option";
import { BankAccountSelect } from "@/components/wallet/bank-account-select";
import { BankAccountSelectTrigger } from "@/components/wallet/bank-account-select-trigger";
import { PopupRoot } from "@/components/wallet/popup-root";
import { RemainingBalance } from "@/components/wallet/remaining-balance";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";
import { useOpen } from "@/hooks/use-open";

interface WithdrawPopupProps {
  open: boolean;
  onClose: () => void;
}

export const WithdrawPopup = ({ open, onClose }: WithdrawPopupProps) => {
  const {
    open: selectOpen,
    handleOpen: handleSelectOpen,
    handleClose: handleSelectClose,
  } = useOpen();

  const methods = useForm<WithdrawFormData>({
    mode: "onBlur",
    resolver: zodResolver(widthDrawFormSchema),
    defaultValues,
  });
  const { control, reset, getValues, handleSubmit } = methods;

  const { data: bankAccounts } = useBankAccounts();

  useEffect(() => {
    const values = getValues();
    const selecteBankAccount = values.bankAccountId;
    if (!selecteBankAccount) {
      const defaultAccount = bankAccounts?.find(({ isDefault }) => isDefault);
      reset({
        ...values,
        bankAccountId: defaultAccount?.bankAccountId ?? "",
      });
    }
  }, [bankAccounts, getValues, reset]);

  const handleClose = () => {
    reset();
    onClose();
    handleSelectClose();
  };

  return (
    <PopupRoot open={open} onClose={handleClose}>
      <Stack direction="row" sx={{ p: 2, pb: 0 }}>
        {selectOpen ? (
          <IconButton onClick={handleSelectClose}>
            <ArrowBack />
          </IconButton>
        ) : null}
        <IconButton onClick={handleClose} sx={{ ml: "auto" }}>
          <Close />
        </IconButton>
      </Stack>
      <Box
        component="form"
        sx={{
          flexGrow: 1,
          p: 4,
          pt: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormProvider {...methods}>
          {!selectOpen ? (
            <Stack justifyContent="space-between" flexGrow={1}>
              <Stack spacing={2}>
                <NumberInput
                  control={control}
                  name="amount"
                  label="提領金額"
                  helperText="提領將酌收手續費15元"
                  inputProps={{ min: 1 }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <RemainingBalance />
                <BankAccountSelectTrigger onClick={handleSelectOpen} />
                <div>
                  <InputLabel shrink>驗證碼</InputLabel>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <OtpInput
                      control={control}
                      name="otpCode"
                      InputProps={{
                        gap: { xs: 0.5, sm: 1 },
                        length: 6,
                        TextFieldsProps: { size: "small" },
                        validateChar: (char) => char === "" || /\d/.test(char),
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        minWidth: "fit-content",
                        px: 2,
                        fontSize: (theme) => theme.typography.pxToRem(12),
                      }}
                    >
                      取得驗證碼
                    </Button>
                  </Stack>
                </div>
              </Stack>
              <Button
                onClick={handleSelectClose}
                fullWidth
                sx={{ minWidth: "fit-content" }}
              >
                提領
              </Button>
            </Stack>
          ) : (
            <Stack justifyContent="space-between" flexGrow={1}>
              <Controller
                control={control}
                name="bankAccountId"
                render={({ field: { value, onChange } }) => (
                  <BankAccountSelect value={value} onChange={onChange}>
                    {bankAccounts?.map((bankAccount) => (
                      <BankAccountOption
                        key={bankAccount.bankAccountId}
                        {...bankAccount}
                      />
                    ))}
                  </BankAccountSelect>
                )}
              />
              <Button
                onClick={handleSelectClose}
                fullWidth
                sx={{ minWidth: "fit-content" }}
              >
                確定
              </Button>
            </Stack>
          )}
        </FormProvider>
      </Box>
    </PopupRoot>
  );
};

const widthDrawFormSchema = z.object({
  amount: z.number().min(1),
  bankAccountId: z.string().min(1),
  otpCode: z.string().min(1),
});
type WithdrawFormData = z.infer<typeof widthDrawFormSchema>;

const defaultValues: Partial<WithdrawFormData> = {
  amount: 0,
  bankAccountId: "",
  otpCode: "",
};
