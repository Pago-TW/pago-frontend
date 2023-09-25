import Head from "next/head";
import { useRouter } from "next/router";

import { Button, Container, Fade, Modal, Paper, Stack } from "@mui/material";
import { ConfirmProvider, useConfirm } from "material-ui-confirm";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BankAccountInfo } from "@/components/bank-account-info";
import { BankUserInfo } from "@/components/bank-user-info";
import { OtpInput } from "@/components/inputs/otp-input";
import { BaseLayout } from "@/components/layouts/base-layout";
import { PageTitle } from "@/components/page-title";
import { SubmitButton } from "@/components/submit-button";
import { Typography } from "@/components/ui/typography";
import { defaultConfirmOptions } from "@/configs/confirm-options";
import { useBankAccount } from "@/hooks/api/use-bank-account";
import { useDeleteBankAccount } from "@/hooks/api/use-delete-bank-account";
import { useRequestOtp } from "@/hooks/api/use-request-otp";
import { useSetDefaultBankAccount } from "@/hooks/api/use-set-default-bank-account";
import { useOpen } from "@/hooks/use-open";
import type { BankAccount } from "@/types/bank";

const DeleteButton = ({
  bankAccountId,
}: Pick<BankAccount, "bankAccountId">) => {
  const router = useRouter();

  const confirm = useConfirm();

  const {
    mutate: deleteBankAccount,
    isLoading: isDeleting,
    isSuccess: isDeleteSuccess,
  } = useDeleteBankAccount();

  const handleDelete = async () => {
    await confirm({
      title: "確定要刪除這個帳號嗎?",
      description: "刪除後無法復原",
    });
    deleteBankAccount(
      { bankAccountId },
      { onSuccess: () => void router.replace("/users/me/bank-accounts") }
    );
  };

  return (
    <SubmitButton
      variant="outlined"
      color="error"
      size="small"
      onClick={handleDelete}
      loading={isDeleting}
      success={isDeleteSuccess}
    >
      刪除帳號
    </SubmitButton>
  );
};

const otpFormSchema = z.object({
  otp: z.string().length(6, "請輸入驗證碼"),
});

type OtpFormValues = z.infer<typeof otpFormSchema>;

const SetDefaultPopup = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: OtpFormValues) => void;
}) => {
  const { control, handleSubmit } = useForm<OtpFormValues>({
    defaultValues: {
      otp: "",
    },
  });

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 370,
            py: 1.5,
            px: 3,
          }}
        >
          <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">請輸入發送至您手機的驗證碼</Typography>
            <Stack direction="row" justifyContent="center">
              <OtpInput
                control={control}
                name="otp"
                InputProps={{
                  gap: { xs: 0.5, sm: 1 },
                  length: 6,
                  TextFieldsProps: { size: "small" },
                  validateChar: (char) => char === "" || /\d/.test(char),
                }}
              />
            </Stack>
            <Stack direction="row" justifyContent="end" gap={1}>
              <Button
                size="small"
                variant="text"
                sx={{ px: 1, minWidth: "fit-content" }}
                type="submit"
              >
                送出
              </Button>
              <Button
                size="small"
                variant="text"
                sx={{ px: 1, minWidth: "fit-content" }}
                onClick={onClose}
              >
                取消
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Fade>
    </Modal>
  );
};

const SetDefaultButton = ({
  bankAccountId,
  isDefault,
}: Pick<BankAccount, "bankAccountId" | "isDefault">) => {
  const router = useRouter();

  const confirm = useConfirm();

  const { open, handleOpen, handleClose } = useOpen();

  const { mutate: requestOtp } = useRequestOtp();
  const {
    mutate: setDefault,
    isLoading: isSetting,
    isSuccess: isSetSuccess,
  } = useSetDefaultBankAccount();

  const handleClick = async () => {
    await confirm({
      title: "確認要變更預設帳號嗎？",
    });
    requestOtp();
    handleOpen();
  };

  const handleSubmit = (data: OtpFormValues) => {
    setDefault(
      { otpCode: data.otp, bankAccountId },
      { onSuccess: () => void router.replace("/users/me/bank-accounts") }
    );
  };

  return (
    <>
      <SubmitButton
        loading={isSetting}
        success={isSetSuccess}
        onClick={handleClick}
        disabled={isDefault}
      >
        設為預設
      </SubmitButton>
      <SetDefaultPopup
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default function UserBankAccountDetailPage() {
  const router = useRouter();
  const bankAccId = router.query.bankAccId as string;

  const { data: account } = useBankAccount(bankAccId, { enabled: !!bankAccId });

  if (!account) return null;

  const {
    legalName,
    birthDate,
    residentialDistrict,
    bankName,
    branchAdministrativeDivision,
    accountHolderName,
    accountNumber,
    branchName,
    isDefault,
  } = account;

  return (
    <>
      <Head>
        <title>銀行帳號</title>
      </Head>
      <BaseLayout>
        <PageTitle title="銀行帳號" />
        <Container>
          <Stack spacing={2}>
            <BankUserInfo
              legalName={legalName}
              birthDate={birthDate}
              residentialDistrict={residentialDistrict}
            />
            <BankAccountInfo
              bankName={bankName}
              branchAdministrativeDivision={branchAdministrativeDivision}
              branchName={branchName}
              accountHolderName={accountHolderName}
              accountNumber={accountNumber}
            />
            <ConfirmProvider defaultOptions={defaultConfirmOptions}>
              <DeleteButton bankAccountId={bankAccId} />
              <SetDefaultButton
                bankAccountId={bankAccId}
                isDefault={isDefault}
              />
            </ConfirmProvider>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
}
