import { useAddBankAccFormContext } from "@/contexts/AddBankFormContext";
import { useAddBankAccount } from "@/hooks/api/useAddBankAccount";
import { TabContext } from "@mui/lab";
import { useRouter } from "next/router";
import { TabPanel } from "../ui/TabPanel";
import { AddBankAccRecap } from "./AddBankAccRecap";
import { BankInfoForm } from "./BankInfoForm";
import { UserInfoForm } from "./UserInfoForm";

const TABS = [
  { label: "使用者資訊", value: "USER_INFO" },
  { label: "銀行帳號", value: "BANK_INFO" },
  { label: "確認資訊", value: "CONFIRM_INFO" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export const AddBankAccForm = () => {
  const router = useRouter();

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
        identityNumber: form.data.userInfo.identityNumber,
        residentialAddress: form.data.userInfo.residentialAddress,
        zipCode: form.data.userInfo.zipCode,
        bankCode: form.data.bankInfo.bankCode,
        branchCode: form.data.bankInfo.branchCode,
        accountHolderName: form.data.bankInfo.accountHolderName,
        accountNumber: form.data.bankInfo.accountNumber,
      },
      { onSuccess: () => router.replace("/users/me/payments") }
    );
  };

  const tab = TABS[form.step]?.value as TabValue;

  return (
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
  );
};
