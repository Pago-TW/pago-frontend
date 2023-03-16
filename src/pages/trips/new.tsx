import { OneWayTripForm } from "@/components/forms/OneWayTripForm";
import { RoundTripForm } from "@/components/forms/RoundTripForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PaperLayout } from "@/components/layouts/PaperLayout";
import { PageTitle } from "@/components/PageTitle";
import { Tab } from "@/components/ui/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const TABS = [
  { label: "單程", value: "ONE_WAY" },
  { label: "來回", value: "ROUND_TRIP" },
] as const;

type Tab = (typeof TABS)[number];

const getTabForm = (tabValue: Tab["value"]) => {
  switch (tabValue) {
    case "ONE_WAY":
      return <OneWayTripForm />;
    case "ROUND_TRIP":
      return <RoundTripForm />;
  }
};

export const NewTripPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ONE_WAY");

  return (
    <>
      <Head>
        <title>新增旅途</title>
      </Head>
      <BaseLayout>
        <PageTitle title="填寫旅途詳情" />
        <Container>
          <PaperLayout>
            <TabContext value={currentTab}>
              <TabList
                onChange={(_e, v) => setCurrentTab(v)}
                sx={{
                  "& .MuiTabs-flexContainer": { justifyContent: "center" },
                }}
              >
                {TABS.map((tab) => (
                  <Tab key={tab.value} {...tab} />
                ))}
              </TabList>
              {TABS.map((tab) => (
                <TabPanel
                  key={tab.value}
                  value={tab.value}
                  sx={{ p: 0, mt: 5, mb: 1 }}
                >
                  {getTabForm(tab.value)}
                </TabPanel>
              ))}
            </TabContext>
          </PaperLayout>
        </Container>
      </BaseLayout>
    </>
  );
};

export default NewTripPage;
