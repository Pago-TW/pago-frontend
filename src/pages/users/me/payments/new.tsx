import { PageTitle } from "@/components/PageTitle";
import { BankInfoForm } from "@/components/forms/BankInfoForm";
import { UserInfoForm } from "@/components/forms/UserInfoForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { TabPanel } from "@/components/ui/TabPanel";
import { TabContext } from "@mui/lab";
import { Container } from "@mui/material";
import Head from "next/head";
import { useState } from "react";

const TABS = [
  { label: "使用者資訊", value: "USER_INFO" },
  { label: "銀行帳號", value: "BANK_INFO" },
  { label: "確認資訊", value: "CONFIRM_INFO" },
] as const;

type TabValue = (typeof TABS)[number]["value"];

export default function UserAddBankAccountPage() {
  const [tabIndex, setTabIndex] = useState(0);

  const handlePrev = () => {
    setTabIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setTabIndex((prev) => (prev < TABS.length - 1 ? prev + 1 : prev));
  };

  const tab = TABS[tabIndex]?.value as TabValue;

  return (
    <>
      <Head>
        <title>新增付款方式</title>
      </Head>
      <BaseLayout>
        <PageTitle title="使用者資訊" />
        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <TabContext value={tab}>
            <TabPanel value="USER_INFO" sx={{ width: "100%" }}>
              <UserInfoForm onNext={console.log} />
            </TabPanel>
            <TabPanel value="BANK_INFO" sx={{ width: "100%" }}>
              <BankInfoForm onPrev={console.log} onNext={console.log} />
            </TabPanel>
            <TabPanel value="CONFIRM_INFO" sx={{ width: "100%" }}>
              Recap!
            </TabPanel>
          </TabContext>
        </Container>
      </BaseLayout>
    </>
  );
}
