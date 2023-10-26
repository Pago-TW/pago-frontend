import { useRouter } from "next/router";

import { TabContext } from "@mui/lab";
import { Step } from "@mui/material";
import { sanitize } from "dompurify";

import { AddBankAccRecap } from "@/components/forms/add-bank-acc-recap";
import { BankInfoForm } from "@/components/forms/bank-info-form";
import { UserInfoForm } from "@/components/forms/user-info-form";
import { StepLabel } from "@/components/ui/step-label";
import { Stepper } from "@/components/ui/stepper";
import { TabPanel } from "@/components/ui/tab-panel";
import { useAddBankAccFormContext } from "@/contexts/add-bank-acc-form-context";
import { useAddBankAccount } from "@/hooks/api/use-add-bank-account";

const TABS = [
  { label: "使用者資訊", value: "USER_INFO" },
  { label: "銀行帳號", value: "BANK_INFO" },
  { label: "確認資訊", value: "CONFIRM_INFO" },
] as const;

export const AddBankAccForm = () => {
  const router = useRouter();

  const redirectUrl = sanitize(
    (router.query.redirectUrl as string | undefined) ??
      "/users/me/bank-accounts"
  );

  const { form, setForm } = useAddBankAccFormContext();

  const { mutate: addBankAccount } = useAddBankAccount();

  const handlePrev = () => {
    setForm((draft) => {
      if (draft.step > 0) draft.step -= 1;
    });
  };
  const handleNext = () => {
    setForm((draft) => {
      if (draft.step < TABS.length - 1) {
        draft.step += 1;
      }
    });
  };
  const handleSubmit = () => {
    addBankAccount(
      {
        legalName: form.data.userInfo.legalName,
        birthDate: form.data.userInfo.birthDate.toDate(),
        zipCode: form.data.userInfo.zipCode,
        bankCode: form.data.bankInfo.bankCode,
        branchCode: form.data.bankInfo.branchCode,
        accountHolderName: form.data.bankInfo.accountHolderName,
        accountNumber: form.data.bankInfo.accountNumber,
      },
      { onSuccess: () => void router.replace(redirectUrl) }
    );
  };

  const tab = TABS[form.step]?.value ?? "USER_INFO";

  return (
    <div style={{ width: "100%" }}>
      <Stepper activeStep={form.step} sx={{ mb: 1 }}>
        {TABS.map(({ label, value }) => (
          <Step key={value}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <TabContext value={tab}>
        <TabPanel value="USER_INFO" sx={{ width: "100%" }}>
          <UserInfoForm onNext={handleNext} />
        </TabPanel>
        <TabPanel value="BANK_INFO" sx={{ width: "100%" }}>
          <BankInfoForm onPrev={handlePrev} onNext={handleNext} />
        </TabPanel>
        <TabPanel value="CONFIRM_INFO" sx={{ width: "100%" }}>
          <AddBankAccRecap onPrev={handlePrev} onSubmit={handleSubmit} />
        </TabPanel>
      </TabContext>
    </div>
  );
};
