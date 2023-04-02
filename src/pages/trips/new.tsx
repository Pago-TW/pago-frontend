import { OneWayTripForm } from "@/components/forms/OneWayTripForm";
import { RoundTripForm } from "@/components/forms/RoundTripForm";
import { BaseLayout } from "@/components/layouts/BaseLayout";
import { PageTitle } from "@/components/PageTitle";
import { Tab } from "@/components/ui/Tab";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Container, Stack } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import type { SyntheticEvent } from "react";
import { useCallback, useState } from "react";

const TABS = [
  { label: "單程", value: "ONE_WAY" },
  { label: "來回", value: "ROUND_TRIP" },
] as const;

type Tab = (typeof TABS)[number];

const getTabForm = (tab: Tab["value"]) => {
  switch (tab) {
    case "ONE_WAY":
      return <OneWayTripForm />;
    case "ROUND_TRIP":
      return <RoundTripForm />;
    default:
      return null;
  }
};

export const NewTripPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<Tab["value"]>("ONE_WAY");

  const handleTabChange = useCallback(
    (_event: SyntheticEvent, newValue: Tab["value"]) => {
      setCurrentTab(newValue);
    },
    []
  );

  return (
    <>
      <Head>
        <title>新增旅途</title>
      </Head>
      <BaseLayout>
        <PageTitle title="填寫旅途詳情" />
        <Container>
          <Stack spacing={2}>
            <TabContext value={currentTab}>
              <TabList
                onChange={handleTabChange}
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
                  sx={{ px: 0, py: 2, flexGrow: 1 }}
                >
                  {getTabForm(tab.value)}
                </TabPanel>
              ))}
            </TabContext>
          </Stack>
        </Container>
      </BaseLayout>
    </>
  );
};

export default NewTripPage;
