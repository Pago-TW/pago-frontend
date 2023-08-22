import { useRouter } from "next/router";

import { TabContext } from "@mui/lab";
import { Step } from "@mui/material";

import { AddBankAccRecap } from "@/components/AddBankAccRecap";
import { BankInfoForm } from "@/components/BankInfoForm";
import { StepLabel } from "@/components/ui/StepLabel";
import { Stepper } from "@/components/ui/Stepper";
import { TabPanel } from "@/components/ui/TabPanel";
import { UserInfoForm } from "@/components/UserInfoForm";
import { useAddBankAccFormContext } from "@/contexts/AddBankAccFormContext";
import { useAddBankAccount } from "@/hooks/api/useAddBankAccount";

const TABS = [
  { label: "使用者資訊", value: "USER_INFO" },
  { label: "銀行帳號", value: "BANK_INFO" },
  { label: "確認資訊", value: "CONFIRM_INFO" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export const AddBankAccForm = () => {
  const router = useRouter();
  const redirectUrl =
    (router.query.redirectUrl as string | undefined) ?? "/users/me/payments";

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
        birthDate: form.data.userInfo.birthDate,
        zipCode: form.data.userInfo.zipCode,
        bankCode: form.data.bankInfo.bankCode,
        branchCode: form.data.bankInfo.branchCode,
        accountHolderName: form.data.bankInfo.accountHolderName,
        accountNumber: form.data.bankInfo.accountNumber,
      },
      { onSuccess: () => router.replace(redirectUrl) }
    );
  };

  const tab = TABS[form.step]?.value!;

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
