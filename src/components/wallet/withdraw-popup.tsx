import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBack, Close } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { NumberInput } from "@/components/inputs/number-input";
import { Button } from "@/components/ui/button";
import { BankAccountOption } from "@/components/wallet/bank-account-option";
import { BankAccountSelect } from "@/components/wallet/bank-account-select";
import { BankAccountSelectTrigger } from "@/components/wallet/bank-account-select-trigger";
import { PopupRoot } from "@/components/wallet/popup-root";
import { RemainingBalance } from "@/components/wallet/remaining-balance";
import { WithdrawOtp } from "@/components/wallet/withdraw-otp";
import { useBankAccounts } from "@/hooks/api/use-bank-accounts";
import { useWithdraw } from "@/hooks/api/use-withdraw";
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

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<WithdrawFormData>({
    mode: "onSubmit",
    resolver: zodResolver(widthDrawFormSchema),
    defaultValues,
  });
  const {
    control,
    reset,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = methods;

  const { data: bankAccounts } = useBankAccounts();

  const { mutate: withdraw, isLoading: isWithdrawLoading } = useWithdraw();

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

  const handleFormSubmit = handleSubmit((data) => {
    withdraw(
      { data },
      {
        onSuccess: () => enqueueSnackbar("提領成功", { variant: "success" }),
        onError: () => enqueueSnackbar("提領失敗", { variant: "error" }),
        onSettled: handleClose,
      }
    );
  });

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
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleFormSubmit}
          sx={{
            flexGrow: 1,
            p: 4,
            pt: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!selectOpen ? (
            <Stack spacing={2} justifyContent="space-between" flexGrow={1}>
              <Stack spacing={2}>
                <NumberInput
                  control={control}
                  name="withdrawalAmount"
                  label="提領金額"
                  helperText={
                    errors.withdrawalAmount?.message ?? "提領將酌收手續費15元"
                  }
                  error={!!errors.withdrawalAmount}
                  inputProps={{ min: 1 }}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
                <RemainingBalance />
                <BankAccountSelectTrigger onClick={handleSelectOpen} />
                <WithdrawOtp />
              </Stack>
              <Button
                type="submit"
                loading={isWithdrawLoading}
                disabled={!isValid || isSubmitted}
                sx={{ minWidth: "fit-content" }}
                fullWidth
              >
                提領
              </Button>
            </Stack>
          ) : (
            <Stack spacing={2} justifyContent="space-between" flexGrow={1}>
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
        </Box>
      </FormProvider>
    </PopupRoot>
  );
};

const widthDrawFormSchema = z.object({
  withdrawalAmount: z.coerce.number().min(1),
  bankAccountId: z.string().min(1),
  otpCode: z.string().length(6),
});
type WithdrawFormData = z.infer<typeof widthDrawFormSchema>;

const defaultValues: Partial<WithdrawFormData> = {
  withdrawalAmount: 0,
  bankAccountId: "",
  otpCode: "",
};
